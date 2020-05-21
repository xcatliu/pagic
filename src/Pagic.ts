import * as path from 'https://deno.land/std@0.51.0/path/mod.ts';
import * as fs from 'https://deno.land/std@0.51.0/fs/mod.ts';
import { green, underline, yellow, red } from 'https://deno.land/std@0.51.0/fmt/colors.ts';

// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server.js';

import { Application, send } from 'https://deno.land/x/oak/mod.ts';

// /_foo.tsx
const REGEXP_TEMPLATE = /\/_[^\/]+\.tsx$/;
// /_layout.tsx
const REGEXP_LAYOUT = /\/_layout\.tsx$/;
// foo.md
const REGEXP_PAGE = /\.(md|tsx)$/;
// /_foo.css
const REGEXP_DASH = /\/_[^\/]+$/;

type AnyFunction = (...args: any[]) => any;

// #region types
export interface PagicConfig {
  srcDir: string;
  publicDir: string;
  plugins: ('md' | 'tsx' | 'layout' | PagicPlugin)[];
  watch: boolean;
  port: number;
  serve: boolean;
}

export type PagicLayout = React.FC<PagicPluginCtx>;

export interface PagicPluginCtx {
  config: PagicConfig;
  pagePath: string;
  layoutPath: string;
  outputPath: string;
  title: string;
  content: React.ReactElement | null;
  [key: string]: any;
}

export type PagicPlugin = (ctx: PagicPluginCtx) => Promise<PagicPluginCtx>;
// #endregion

export default class Pagic {
  // #region properties
  private static defaultConfig: PagicConfig = {
    srcDir: 'src',
    publicDir: 'public',
    plugins: ['md', 'tsx', 'layout'],
    watch: false,
    port: 8000,
    serve: false
  };
  private projectConfig: Partial<PagicConfig> = {};
  private runtimeConfig: Partial<PagicConfig> = {};
  private get config(): PagicConfig {
    return {
      ...Pagic.defaultConfig,
      ...this.projectConfig,
      ...this.runtimeConfig
    };
  }

  private pagePaths: string[] = [];
  private layoutPaths: string[] = [];
  private staticPaths: string[] = [];

  private fullChangedPaths: string[] = [];
  private timeoutHandler: number | undefined = undefined;
  private randomVersion = Math.random();
  // #endregion

  public constructor(config: Partial<PagicConfig> = {}) {
    this.runtimeConfig = {
      ...this.runtimeConfig,
      ...config
    };
  }

  public async build() {
    await this.initProjectConfig();
    await this.rebuild();

    if (this.config.serve) {
      this.serve();
    }
    if (this.config.watch) {
      this.watch();
    }
  }

  public async serve() {
    const app = new Application();

    app.use(async (ctx) => {
      await send(ctx, ctx.request.url.pathname, {
        root: this.config.publicDir,
        index: 'index.html'
      });
    });

    app.listen({ port: this.config.port });
    console.log(green('Serve'), underline(this.config.publicDir), `on http://127.0.0.1:${this.config.port}/`);
  }

  private async rebuild() {
    await this.clean();
    await this.initPaths();
    for (const pagePath of this.pagePaths) {
      await this.buildPage(pagePath);
    }
    for (const staticPath of this.staticPaths) {
      await this.copyStatic(staticPath);
    }
  }

  private async watch() {
    console.log(green('Watch'), underline(this.config.srcDir));
    const watcher = Deno.watchFs(this.config.srcDir);
    for await (const event of watcher) {
      this.handleFileChange(event.paths);
    }
  }

  private async handleFileChange(fullFilePaths: string[]) {
    this.fullChangedPaths = Array.from(new Set([...this.fullChangedPaths, ...fullFilePaths]));
    clearTimeout(this.timeoutHandler);
    this.timeoutHandler = setTimeout(async () => {
      let needRebuild = false;
      let filteredFullChangedPaths = [];
      for (const fullChangedPath of this.fullChangedPaths) {
        const changedPath = this.relativeToSrc(fullChangedPath);
        if (!fs.existsSync(fullChangedPath)) {
          console.log(yellow(`${changedPath} removed, start rebuild`));
          needRebuild = true;
          break;
        } else if (Deno.statSync(fullChangedPath).isDirectory) {
          console.log(yellow(`Directory ${underline(changedPath)} changed, start rebuild`));
          needRebuild = true;
          break;
        } else if (REGEXP_TEMPLATE.test(fullChangedPath)) {
          console.log(yellow(`Template ${changedPath} changed, start rebuild`));
          needRebuild = true;
          break;
        } else {
          filteredFullChangedPaths.push(fullChangedPath);
        }
      }
      this.randomVersion = Math.random();
      if (needRebuild) {
        this.rebuild();
      } else {
        for (const fullChangedPath of filteredFullChangedPaths) {
          const changedPath = this.relativeToSrc(fullChangedPath);
          if (REGEXP_PAGE.test(fullChangedPath)) {
            this.buildPage(changedPath);
          } else if (REGEXP_DASH.test(fullChangedPath) === false) {
            this.copyStatic(changedPath);
          }
        }
      }
      this.fullChangedPaths = [];
    }, 100);
  }

  private async initProjectConfig() {
    const projectConfigPath = Deno.cwd() + '/pagic.config.ts';
    if (!fs.existsSync(projectConfigPath)) {
      return;
    }

    this.projectConfig = (await import(`file://${projectConfigPath}`)).default;
  }

  private async clean() {
    await fs.emptyDir(this.config.publicDir);
  }

  private async initPaths() {
    this.pagePaths = await this.walk(this.config.srcDir, {
      includeDirs: false,
      match: [REGEXP_PAGE],
      skip: [REGEXP_DASH]
    });
    this.layoutPaths = await this.walk(this.config.srcDir, {
      includeDirs: false,
      match: [REGEXP_LAYOUT]
    });
    this.staticPaths = await this.walk(this.config.srcDir, {
      includeDirs: false,
      skip: [REGEXP_DASH, REGEXP_PAGE]
    });
  }
  private async walk(root: string, walkOptions: fs.WalkOptions): Promise<string[]> {
    let walkEntries = [];
    const walkResult = fs.walk(path.resolve(root), walkOptions);
    for await (const i of walkResult) {
      walkEntries.push(this.relativeToSrc(i.path));
    }
    return walkEntries;
  }

  private async buildPage(pagePath: string) {
    console.log(green('Build'), pagePath);
    let ctx: PagicPluginCtx = {
      config: this.config,
      pagePath: this.getPagePath(pagePath),
      layoutPath: this.getLayoutPath(pagePath),
      outputPath: this.getOutputPath(pagePath),
      title: '',
      content: null
    };
    try {
      for (let plugin of this.config.plugins) {
        if (typeof plugin === 'string') {
          plugin = (await import(`./plugins/${plugin}.tsx`)).default;
        }
        ctx = await (plugin as PagicPlugin)(ctx);
      }

      if (ctx.content === null) {
        throw new Error('content is null');
      }

      await this.whiteFile(ctx.outputPath, ReactDOMServer.renderToStaticMarkup(ctx.content));
    } catch (e) {
      console.error(red('Build error'), e);
    }
  }

  private getPagePath(pagePath: string) {
    if (pagePath.endsWith('.tsx')) {
      return `${pagePath}?version=${this.randomVersion}.tsx`;
    }
    return pagePath;
  }

  private getLayoutPath(pagePath: string) {
    let layoutPath = `/${pagePath}`.replace(/\/[^\/]+$/, '/_layout.tsx');
    while (layoutPath !== '/_layout.tsx') {
      if (this.layoutPaths.includes(layoutPath.slice(1))) {
        break;
      }
      layoutPath = layoutPath.replace(/\/[^\/]+\/[^\/]+$/, '/_layout.tsx');
    }
    layoutPath = layoutPath.slice(1);

    return `${layoutPath}?version=${this.randomVersion}.tsx`;
  }

  private getOutputPath(pagePath: string) {
    return pagePath.replace(/\.[^\.]+$/, '.html');
  }

  private async whiteFile(filePath: string, content: string) {
    const fullFilePath = path.resolve(this.config.publicDir, filePath);
    await fs.ensureDir(path.dirname(fullFilePath));
    await fs.writeFileStr(fullFilePath, content);
  }

  private async copyStatic(filePath: string) {
    console.log(green('Copy '), filePath);
    const src = path.resolve(this.config.srcDir, filePath);
    const dest = path.resolve(this.config.publicDir, filePath);
    await fs.ensureDir(path.dirname(dest));
    await fs.copy(src, dest, { overwrite: true });
  }

  private relativeToSrc(fullFilePath: string) {
    return path.relative(this.config.srcDir, fullFilePath);
  }
}
