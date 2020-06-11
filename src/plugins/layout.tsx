import * as path from 'https://deno.land/std@0.56.0/path/mod.ts';
import * as fs from 'https://deno.land/std@0.56.0/fs/mod.ts';

// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { PagicPlugin, PagicLayout } from '../Pagic.ts';

const layoutCache: {
  [importPath: string]: PagicLayout;
} = {};

const layout: PagicPlugin = async (pagic) => {
  for (const pagePath of pagic.pagePaths) {
    const pageProps = pagic.pagePropsMap[pagePath];
    let Layout = null;
    const fullLayoutPath = path.resolve(pagic.config.srcDir, pageProps.layoutPath);
    let importPath: string;
    if (await fs.exists(fullLayoutPath)) {
      importPath = `file://${fullLayoutPath}?version=${pagic.randomVersion}.tsx`;
    } else {
      importPath = `../themes/${pagic.config.theme}/${pageProps.layoutPath}`;
    }
    if (layoutCache[importPath]) {
      Layout = layoutCache[importPath];
    } else {
      Layout = (await import(importPath)).default;
      layoutCache[importPath] = Layout;
    }
    pagic.pagePropsMap[pagePath] = {
      ...pageProps,
      content: <Layout {...pageProps} />
    };
  }
};

export default layout;
