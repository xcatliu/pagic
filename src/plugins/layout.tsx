import * as path from 'https://deno.land/std@0.56.0/path/mod.ts';

// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { PagicPlugin } from '../Pagic.ts';

const layout: PagicPlugin = async (pagic) => {
  for (const pagePath of pagic.pagePaths) {
    const pageProps = pagic.pagePropsMap[pagePath];
    const fullLayoutPath = path.resolve(pagic.config.srcDir, pageProps.layoutPath);
    const Layout = (await import(`file://${fullLayoutPath}?version=${pagic.randomVersion}.tsx`)).default;
    pagic.pagePropsMap[pagePath] = {
      ...pageProps,
      content: <Layout {...pageProps} />
    };
  }
};

export default layout;
