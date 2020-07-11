import { fs, path, colors } from './deps.ts';
// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { Application, send } from 'https://deno.land/x/oak@v5.1.0/mod.ts';

import {
  unique,
  sortByInsert,
  ensureDirAndCopy,
  copyPagicFile,
  importDefault,
  importPagicModDefault,
  ensureDirAndWriteFileStr,
  compileFile,
  logger,
  globToRegExp
} from './utils/mod.ts';
import { PagePropsSidebar, PagicConfigSidebar } from './plugins/sidebar.tsx';

// #region types
export interface PagicConfig {
  srcDir: string;
  publicDir: string;
  ignore: string[];
  base: string;
  theme: string;
  plugins: string[];
  watch: boolean;
  serve: boolean;
  port: number;
  sidebar?: PagicConfigSidebar;
  [key: string]: any;
}

export interface PagicPlugin {
  name: string;
  insert?: string;
  fn: (ctx: Pagic) => Promise<void>;
}

export interface PageProps {
  config: PagicConfig;
  pagePath: string;
  layoutPath: string;
  outputPath: string;
  title: string;
  content: React.ReactElement | null;
  script: React.ReactElement | null;
  loading?: boolean;
  sidebar?: PagePropsSidebar;
  previous?: PagePropsSidebar[0] | null;
  next?: PagePropsSidebar[0] | null;
  [key: string]: any;
}

export type PagicLayout<
  T = {
    [key: string]: any;
  }
> = React.FC<PageProps & T>;

export interface PagicThemeConfig {
  files: [];
}
// #endregion

export default class Pagic {
  // #region properties
  public static defaultConfig: PagicConfig = {
    srcDir: 'src',
    publicDir: 'public',
    ignore: [
      // Dot files
      '.*',
      // Node common files
      'package.json',
      'package-lock.json',
      'node_modules',
      // pagic.config.ts and pagic.config.tsx
      'pagic.config.{ts,tsx}',
      // https://docs.npmjs.com/using-npm/developers.html#keeping-files-out-of-your-package
      '.*.swp',
      '._*',
      '.DS_Store',
      '.git',
      '.hg',
      '.npmrc',
      '.lock-wscript',
      '.svn',
      '.wafpickle-*',
      'config.gypi',
      'CVS',
      'npm-debug.log'

      // ${config.publicDir} will be added later
    ],
    base: '/',
    theme: 'default',
    plugins: ['init', 'md', 'tsx', 'script', 'layout', 'write'],
    watch: false,
    serve: false,
    port: 8000
  };
  // foo.md
  public static REGEXP_PAGE = /\/[^_][^\/]+\.(md|tsx)$/;
  // /_layout.tsx /_sidebar.tsx
  public static REGEXP_LAYOUT = /\/_[^\/]+\.tsx$/;

  // @ts-ignore
  public config: PagicConfig;

  /** Pages that need to be build */
  public pagePaths: string[] = [];
  public layoutPaths: string[] = [];
  public staticPaths: string[] = [];
  /** A map stored all { pagePath: pageProps } */
  public pagePropsMap: {
    [pagePath: string]: PageProps;
  } = {};
  public needRebuild = false;

  public projectConfig: Partial<PagicConfig> = {};
  private runtimeConfig: Partial<PagicConfig> = {};
  private projectConfigCompileResult = 'export default {}';

  private fullChangedPaths: string[] = [];
  private timeoutHandler: number | undefined = undefined;
  // #endregion

  public constructor(config: Partial<PagicConfig> = {}) {
    this.runtimeConfig = config;
  }

  public async build() {
    await this.initProjectConfig();
    await this.initConfig();

    await this.rebuild();

    if (this.config.serve) {
      this.serve();
    }
    if (this.config.watch) {
      this.watch();
    }
  }

  /** Read pagic.config.ts and set to this.projectConfig */
  private async initProjectConfig() {
    let pagicConfigPath = path.resolve(Deno.cwd(), 'pagic.config.ts');
    if (await fs.exists(pagicConfigPath)) {
      this.projectConfig = await importDefault(pagicConfigPath);
      this.projectConfigCompileResult = await compileFile(pagicConfigPath);
      return;
    }
    pagicConfigPath = pagicConfigPath.replace(/\.ts$/, '.tsx');
    if (await fs.exists(pagicConfigPath)) {
      this.projectConfig = await importDefault(pagicConfigPath);
      this.projectConfigCompileResult = await compileFile(pagicConfigPath);
      return;
    }
    logger.warn('pagic.config.ts not exist, use default config');
  }
  /** Deep merge defaultConfig, projectConfig and runtimeConfig, then sort plugins */
  private async initConfig() {
    let config = {
      ...Pagic.defaultConfig,
      ...this.projectConfig,
      ...this.runtimeConfig
    };
    config.ignore = unique([
      ...Pagic.defaultConfig.ignore,
      ...(this.projectConfig.ignore ?? []),
      ...(this.runtimeConfig.ignore ?? []),
      config.publicDir
    ]);
    config.plugins = unique([
      ...Pagic.defaultConfig.plugins,
      ...(this.projectConfig.plugins ?? []),
      ...(this.runtimeConfig.plugins ?? [])
    ]);
    this.config = config;
  }
  private async importPlugin(pluginName: string) {
    const plugin = await importPagicModDefault<PagicPlugin>(`src/plugins/${pluginName}.tsx`);
    return plugin;
  }

  private async rebuild() {
    this.pagePropsMap = {};
    await this.clean();
    const pagicConfigDest = path.resolve(this.config.publicDir, 'pagic.config.js');
    await ensureDirAndWriteFileStr(pagicConfigDest, this.projectConfigCompileResult);
    await this.initPaths();
    await this.runPlugins();
    await this.copy();
  }

  private async serve() {
    const app = new Application();

    app.use(async (ctx) => {
      await send(ctx, ctx.request.url.pathname.replace(new RegExp(`^${this.config.base}`), '/'), {
        root: this.config.publicDir,
        index: 'index.html'
      });
    });

    app.listen({ port: this.config.port });
    logger.success(
      'Serve',
      colors.underline(this.config.publicDir),
      `on http://127.0.0.1:${this.config.port}${this.config.base}`
    );
  }

  private async watch() {
    logger.success('Watch', colors.underline(this.config.srcDir));
    const watcher = Deno.watchFs(this.config.srcDir);
    for await (const event of watcher) {
      let eventPaths = event.paths;
      this.config.ignore.forEach((glob) => {
        eventPaths = eventPaths.filter((eventPath) => !globToRegExp(glob).test(eventPath));
      });
      this.handleFileChange(eventPaths);
    }
  }

  private async handleFileChange(fullFilePaths: string[]) {
    if (fullFilePaths.length === 0) return;
    this.fullChangedPaths = unique([...this.fullChangedPaths, ...fullFilePaths]);
    clearTimeout(this.timeoutHandler);
    this.timeoutHandler = setTimeout(async () => {
      this.needRebuild = false;
      let pagePaths = [];
      let staticPaths = [];
      for (const fullChangedPath of this.fullChangedPaths) {
        const changedPath = this.relativeToSrc(fullChangedPath);
        if (!fs.existsSync(fullChangedPath)) {
          logger.warn(`${changedPath} removed, start rebuild`);
          this.needRebuild = true;
          break;
        } else if (Deno.statSync(fullChangedPath).isDirectory) {
          logger.warn(`Directory ${colors.underline(changedPath)} changed, start rebuild`);
          this.needRebuild = true;
          break;
        } else if (Pagic.REGEXP_LAYOUT.test(fullChangedPath)) {
          logger.warn(`Layout ${changedPath} changed, start rebuild`);
          this.needRebuild = true;
          break;
        } else if (Pagic.REGEXP_PAGE.test(fullChangedPath)) {
          pagePaths.push(this.relativeToSrc(fullChangedPath));
        } else {
          staticPaths.push(this.relativeToSrc(fullChangedPath));
        }
      }
      if (this.needRebuild) {
        await this.rebuild();
      } else {
        await this.runPlugins(pagePaths);
        await this.copy(staticPaths);
      }
      this.fullChangedPaths = [];
    }, 100);
  }

  private async clean() {
    logger.success('Clean', this.config.publicDir);
    await fs.emptyDir(this.config.publicDir);
  }

  private async initPaths() {
    this.pagePaths = await this.walk(this.config.srcDir, {
      includeDirs: false,
      match: [Pagic.REGEXP_PAGE],
      skip: this.config.ignore.map(globToRegExp)
    });
    const { files } = await importPagicModDefault<PagicThemeConfig>(`src/themes/${this.config.theme}/mod.ts`);
    this.layoutPaths = unique([
      ...(await this.walk(this.config.srcDir, {
        includeDirs: false,
        match: [Pagic.REGEXP_LAYOUT],
        skip: this.config.ignore.map(globToRegExp)
      })),
      ...files.filter((filename) => Pagic.REGEXP_LAYOUT.test(`/${filename}`))
    ]);
    this.staticPaths = unique([
      ...(await this.walk(this.config.srcDir, {
        includeDirs: false,
        skip: [Pagic.REGEXP_PAGE, Pagic.REGEXP_LAYOUT, ...this.config.ignore.map(globToRegExp)]
      })),
      ...files.filter(
        (filename) => !Pagic.REGEXP_PAGE.test(`/${filename}`) && !Pagic.REGEXP_LAYOUT.test(`/${filename}`)
      )
    ]);
  }

  private async runPlugins(pagePaths?: string[]) {
    if (Array.isArray(pagePaths)) {
      if (pagePaths.length === 0) return;
      this.pagePaths = pagePaths;
    }
    if (this.pagePaths.length === 0) return;

    let sortedPlugins: PagicPlugin[] = [];
    for (let pluginName of this.config.plugins) {
      const plugin = await this.importPlugin(pluginName);
      sortedPlugins.push(plugin);
    }
    sortedPlugins = sortByInsert(sortedPlugins);

    for (let plugin of sortedPlugins) {
      logger.success('Plugin', plugin.name, 'start');
      await plugin.fn(this);
    }
  }

  private async copy(staticPaths?: string[]) {
    if (typeof staticPaths === 'undefined') {
      // eslint-disable-next-line no-param-reassign
      staticPaths = this.staticPaths;
    }

    for (const staticPath of staticPaths) {
      const src = path.resolve(this.config.srcDir, staticPath);
      const dest = path.resolve(this.config.publicDir, staticPath);
      if (await fs.exists(src)) {
        await ensureDirAndCopy(src, dest, { overwrite: true });
      } else {
        await copyPagicFile(`src/themes/${this.config.theme}/${staticPath}`, dest);
      }
    }
  }

  /** A util to replace fs.walk method, return relativeToSrc path instead of fullPath */
  private async walk(root: string, walkOptions: fs.WalkOptions): Promise<string[]> {
    let walkEntries = [];
    const walkResult = fs.walk(path.resolve(root), walkOptions);
    for await (const i of walkResult) {
      walkEntries.push(this.relativeToSrc(i.path));
    }
    return walkEntries;
  }

  private relativeToSrc(fullFilePath: string) {
    return path.relative(this.config.srcDir, fullFilePath);
  }
}
