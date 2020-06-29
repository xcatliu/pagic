// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

import { Application, send } from 'https://deno.land/x/oak@v5.1.0/mod.ts';

import {
  fs,
  path,
  colors,
  unique,
  sortByInsert,
  ensureDirAndCopy,
  copyPagicFile,
  importDefault,
  ensureDirAndWriteFileStr,
  compileFile
} from './utils/mod.ts';

// #region types
export interface PagicConfig {
  srcDir: string;
  publicDir: string;
  ignore: RegExp[];
  base: string;
  theme: string;
  plugins: (string | PagicPlugin)[];
  watch: boolean;
  serve: boolean;
  port: number;
  [key: string]: any;
}

interface InitedPagicConfig extends PagicConfig {
  plugins: PagicPlugin[];
}

export interface PagicPlugin {
  insert?: string;
  (ctx: Pagic): Promise<void>;
}

export interface PageProps {
  config: any;
  pagePath: string;
  layoutPath: string;
  outputPath: string;
  title: string;
  content: React.ReactElement | null;
  script: React.ReactElement | null;
  [key: string]: any;
}

export type PagicLayout = React.FC<PageProps>;
// #endregion

export default class Pagic {
  // #region properties
  public static defaultConfig: PagicConfig = {
    srcDir: 'src',
    publicDir: 'public',
    // https://docs.npmjs.com/using-npm/developers.html#keeping-files-out-of-your-package
    ignore: [
      /\/\..+\.swp$/,
      /\/\._/,
      /\/\.DS_Store$/,
      /\/\.git\//,
      /\/\.hg\//,
      /\/\.npmrc$/,
      /\/\.lock-wscript$/,
      /\/\.svn\//,
      /\/\.wafpickle-.+/,
      /\/config\.gypi$/,
      /\/CVS\//,
      /\/npm-debug\.log$/,
      /\/node_modules\//
    ],
    base: '/',
    theme: 'default',
    plugins: ['init', 'md', 'tsx', 'layout', 'write'],
    watch: false,
    serve: false,
    port: 8000
  };
  // foo.md
  public static REGEXP_PAGE = /\/[^_][^\/]+\.(md|tsx)$/;
  // /_layout.tsx /_sidebar.tsx
  public static REGEXP_LAYOUT = /\/_[^\/]+\.tsx$/;

  // @ts-ignore
  public config: InitedPagicConfig;

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
  private projectConfigCompileResult = '';

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
    console.log(colors.yellow('pagic.config.ts not exist, use default config'));
    this.projectConfigCompileResult = 'export default {}';
  }
  /** Deep merge defaultConfig, projectConfig and runtimeConfig, then sort plugins */
  private async initConfig() {
    const ignore = unique([
      ...Pagic.defaultConfig.ignore,
      ...(this.projectConfig.ignore ?? []),
      ...(this.runtimeConfig.ignore ?? [])
    ]);
    const pluginNames = unique([
      ...Pagic.defaultConfig.plugins,
      ...(this.projectConfig.plugins ?? []),
      ...(this.runtimeConfig.plugins ?? [])
    ]);
    let plugins: PagicPlugin[] = [];
    for (let plugin of pluginNames) {
      if (typeof plugin === 'string') {
        plugin = await importDefault(`./plugins/${plugin}.tsx`, {
          base: path.dirname(import.meta.url)
        });
      }
      plugins.push(plugin as PagicPlugin);
    }
    this.config = {
      ...Pagic.defaultConfig,
      ...this.projectConfig,
      ...this.runtimeConfig,
      ignore,
      plugins: sortByInsert(plugins)
    };
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
    console.log(
      colors.green('Serve'),
      colors.underline(this.config.publicDir),
      `on http://127.0.0.1:${this.config.port}${this.config.base}`
    );
  }

  private async watch() {
    console.log(colors.green('Watch'), colors.underline(this.config.srcDir));
    const watcher = Deno.watchFs(this.config.srcDir);
    for await (const event of watcher) {
      let eventPaths = event.paths;
      this.config.ignore.forEach((ignoreRegExp) => {
        eventPaths = eventPaths.filter((eventPath) => !ignoreRegExp.test(eventPath));
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
          console.log(colors.yellow(`${changedPath} removed, start rebuild`));
          this.needRebuild = true;
          break;
        } else if (Deno.statSync(fullChangedPath).isDirectory) {
          console.log(colors.yellow(`Directory ${colors.underline(changedPath)} changed, start rebuild`));
          this.needRebuild = true;
          break;
        } else if (Pagic.REGEXP_LAYOUT.test(fullChangedPath)) {
          console.log(colors.yellow(`Layout ${changedPath} changed, start rebuild`));
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
    console.log(colors.green('Clean'), this.config.publicDir);
    await fs.emptyDir(this.config.publicDir);
  }

  private async initPaths() {
    this.pagePaths = await this.walk(this.config.srcDir, {
      includeDirs: false,
      match: [Pagic.REGEXP_PAGE],
      skip: this.config.ignore
    });
    const theme_file_list: string[] = await importDefault(`./themes/${this.config.theme}/.theme_file_list.ts`, {
      base: path.dirname(import.meta.url)
    });
    this.layoutPaths = unique([
      ...(await this.walk(this.config.srcDir, {
        includeDirs: false,
        match: [Pagic.REGEXP_LAYOUT],
        skip: this.config.ignore
      })),
      ...theme_file_list.filter((filename) => Pagic.REGEXP_LAYOUT.test(`/${filename}`))
    ]);
    this.staticPaths = unique([
      ...(await this.walk(this.config.srcDir, {
        includeDirs: false,
        skip: [Pagic.REGEXP_PAGE, Pagic.REGEXP_LAYOUT, ...this.config.ignore]
      })),
      ...theme_file_list.filter(
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

    for (let plugin of this.config.plugins) {
      console.log(colors.green('Plugin'), plugin.name, 'start');
      await plugin(this);
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
