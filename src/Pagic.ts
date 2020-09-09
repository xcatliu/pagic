import { fs, path, colors, React } from '../deps.ts';
import { Application, send } from 'https://deno.land/x/oak@v6.1.0/mod.ts';

import {
  pick,
  unique,
  sortByInsert,
  importDefault,
  logger,
  walk,
  getPagicConfigPath,
  importPlugin,
  importTheme
} from './utils/mod.ts';
import { PagePropsSidebar, PagicConfigSidebar } from './plugins/sidebar.tsx';

// #region types
export interface PagicConfig {
  srcDir: string;
  outDir: string;
  include?: string[];
  exclude?: string[];
  root: string;
  theme: string;
  plugins: string[];
  watch: boolean;
  serve: boolean;
  port: number;
  sidebar?: PagicConfigSidebar;
  i18n?: {
    languages: { code: string; name: string }[];
    overrides?: { [code: string]: any };
    resources?: { [code: string]: { translation: { [key: string]: string } } };
  };
  [key: string]: any;
}

export interface PagicThemeConfig {
  files: [];
}

export interface PagicPlugin {
  name: string;
  insert?: string;
  fn: (ctx: Pagic) => Promise<void>;
}

export type PagicLayout<
  T = {
    [key: string]: any;
  }
> = React.FC<PageProps & T>;

export interface PageProps {
  config: PagicConfig;
  pagePath: string;
  layoutPath: string;
  outputPath: string;
  title: string;
  content: React.ReactElement | null;
  head: React.ReactElement | null;
  script: React.ReactElement | null;
  toc: React.ReactElement | null;
  loading?: boolean;
  sidebar?: PagePropsSidebar;
  prev?: PagePropsSidebar[0] | null;
  next?: PagePropsSidebar[0] | null;
  language?: string;
  gitalk?: React.ReactElement | null;
  [key: string]: any;
}
// #endregion

export default class Pagic {
  // #region properties
  public static defaultConfig: PagicConfig = {
    srcDir: '.',
    outDir: 'dist',
    include: undefined,
    exclude: [
      // Dot files
      '**/.*',
      // Node common files
      '**/package.json',
      '**/package-lock.json',
      '**/node_modules',
      'pagic.config.ts',
      'pagic.config.tsx',
      // https://docs.npmjs.com/using-npm/developers.html#keeping-files-out-of-your-package
      '**/config.gypi',
      '**/CVS',
      '**/npm-debug.log'

      // ${config.outDir} will be added later
    ],
    root: '/',
    theme: 'default',
    plugins: ['clean', 'init', 'md', 'tsx', 'script', 'layout', 'out'],
    watch: false,
    serve: false,
    port: 8000
  };
  // foo.md
  public static REGEXP_PAGE = /[\/\\][^_][^\/\\]*\.(md|tsx)$/;
  // /_layout.tsx /_sidebar.tsx
  public static REGEXP_LAYOUT = /[\/\\]_[^\/\\]+\.tsx$/;

  // @ts-ignore
  public pagicConfigPath: string;
  // @ts-ignore
  public config: PagicConfig;

  /** Pages that need to be build */
  public pagePaths: string[] = [];
  public layoutPaths: string[] = [];
  public staticPaths: string[] = [];
  /** Files that need to be write */
  public writeFiles: {
    [filePath: string]: string;
  } = {};
  /** A map stored all pageProps */
  public pagePropsMap: {
    [pagePath: string]: PageProps;
  } = {};
  public rebuilding = true;

  public projectConfig: Partial<PagicConfig> = {};
  private runtimeConfig: Partial<PagicConfig> = {};

  private changedPaths: string[] = [];
  private timeoutHandler: number | undefined = undefined;
  // #endregion

  public constructor(config: Partial<PagicConfig> = {}) {
    this.runtimeConfig = config;
  }

  public async build() {
    await this.rebuild();
    if (this.config.serve) {
      this.serve();
    }
    if (this.config.watch) {
      this.watch();
    }
  }

  private async rebuild() {
    this.rebuilding = true;
    this.pagePropsMap = {};
    this.writeFiles = {};

    await this.initConfig();
    await this.initPaths();
    await this.runPlugins();
  }

  /** Deep merge defaultConfig, projectConfig and runtimeConfig, then sort plugins */
  private async initConfig() {
    this.pagicConfigPath = await getPagicConfigPath();
    this.projectConfig = await importDefault(this.pagicConfigPath, {
      reload: true
    });
    let config = {
      ...Pagic.defaultConfig,
      ...this.projectConfig,
      ...this.runtimeConfig
    };
    config.exclude = unique([
      ...(Pagic.defaultConfig.exclude ?? []),
      ...(this.projectConfig.exclude ?? []),
      ...(this.runtimeConfig.exclude ?? []),
      config.outDir
    ]);
    config.plugins = unique([
      ...Pagic.defaultConfig.plugins,
      ...(this.projectConfig.plugins ?? []),
      ...(this.runtimeConfig.plugins ?? [])
    ]);
    this.config = config;
  }

  private async serve() {
    const app = new Application();

    app.use(async (ctx) => {
      await send(ctx, ctx.request.url.pathname.replace(new RegExp(`^${this.config.root}`), '/'), {
        root: this.config.outDir,
        index: 'index.html'
      });
    });

    app.listen({ port: this.config.port });
    logger.success(
      'Serve',
      colors.underline(this.config.outDir),
      `on http://127.0.0.1:${this.config.port}${this.config.root}`
    );
  }

  private async watch() {
    logger.success('Watch', colors.underline(this.config.srcDir));
    const watcher = Deno.watchFs([this.config.srcDir, this.pagicConfigPath]);
    for await (const event of watcher) {
      // pagic.config.ts modified, rebuild
      if (event.kind === 'modify' && event.paths.includes(this.pagicConfigPath)) {
        clearTimeout(this.timeoutHandler);
        this.timeoutHandler = setTimeout(async () => {
          this.rebuild();
        }, 100);
        continue;
      }
      let eventPaths = event.paths.map((eventPath) => path.relative(this.config.srcDir, eventPath));
      this.config.include?.forEach((glob) => {
        eventPaths = eventPaths.filter(
          (eventPath) => path.globToRegExp(glob).test(eventPath) || path.globToRegExp(`${glob}/**`).test(eventPath)
        );
      });
      this.config.exclude?.forEach((glob) => {
        eventPaths = eventPaths.filter(
          (eventPath) => !path.globToRegExp(glob).test(eventPath) && !path.globToRegExp(`${glob}/**`).test(eventPath)
        );
      });
      this.handleFileChange(eventPaths);
    }
  }

  private async handleFileChange(filePaths: string[]) {
    if (filePaths.length === 0) return;
    this.changedPaths = unique([...this.changedPaths, ...filePaths]);
    clearTimeout(this.timeoutHandler);
    this.timeoutHandler = setTimeout(async () => {
      this.rebuilding = false;
      this.pagePaths = [];
      this.staticPaths = [];
      for (const changedPath of this.changedPaths) {
        const fullChangedPath = path.resolve(this.config.srcDir, changedPath);
        if (!fs.existsSync(fullChangedPath)) {
          logger.warn(`${changedPath} removed, start rebuild`);
          this.rebuilding = true;
          break;
        } else if (Deno.statSync(fullChangedPath).isDirectory) {
          logger.warn(`Directory ${colors.underline(changedPath)} changed, start rebuild`);
          this.rebuilding = true;
          break;
        } else if (Pagic.REGEXP_LAYOUT.test(fullChangedPath)) {
          logger.warn(`Layout ${changedPath} changed, start rebuild`);
          this.rebuilding = true;
          break;
        } else if (Pagic.REGEXP_PAGE.test(fullChangedPath)) {
          this.pagePaths.push(changedPath);
        } else {
          this.staticPaths.push(changedPath);
        }
      }
      if (this.rebuilding) {
        await this.rebuild();
      } else {
        await this.runPlugins();
      }
      this.changedPaths = [];
    }, 100);
  }

  private async initPaths() {
    const { files: themeFiles } = await importTheme(this.config.theme);

    this.pagePaths = await walk(this.config.srcDir, {
      ...pick(this.config, ['include', 'exclude']),
      match: [Pagic.REGEXP_PAGE]
    });
    this.layoutPaths = unique([
      ...(await walk(this.config.srcDir, {
        ...pick(this.config, ['include', 'exclude']),
        match: [Pagic.REGEXP_LAYOUT]
      })),
      ...themeFiles.filter((filename) => Pagic.REGEXP_LAYOUT.test(`/${filename}`))
    ]);
    this.staticPaths = unique([
      ...(await walk(this.config.srcDir, {
        ...pick(this.config, ['include', 'exclude']),
        skip: [Pagic.REGEXP_PAGE, Pagic.REGEXP_LAYOUT]
      })),
      ...themeFiles.filter(
        (filename) => !Pagic.REGEXP_PAGE.test(`/${filename}`) && !Pagic.REGEXP_LAYOUT.test(`/${filename}`)
      )
    ]);
  }

  private async runPlugins() {
    if (this.pagePaths.length === 0 && this.staticPaths.length === 0) return;

    let sortedPlugins: PagicPlugin[] = [];
    for (let pluginName of this.config.plugins) {
      if (pluginName.startsWith('-')) {
        continue;
      }
      let plugin = await importPlugin(pluginName);
      sortedPlugins.push(plugin);
    }
    sortedPlugins = sortByInsert(sortedPlugins);
    const removedPlugins = this.config.plugins.filter((pluginName) => pluginName.startsWith('-'));
    sortedPlugins = sortedPlugins.filter((plugin) => !removedPlugins.includes(`-${plugin.name}`));

    for (let plugin of sortedPlugins) {
      logger.success('Plugin', plugin.name, 'start');
      await plugin.fn(this);
    }
  }
}
