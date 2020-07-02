import { fs, path } from '../deps.ts';
// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

import { PagicPlugin } from '../Pagic.ts';
import { importDefault } from '../utils.ts';

const layout: PagicPlugin = async (pagic) => {
  for (const pagePath of pagic.pagePaths) {
    const pageProps = pagic.pagePropsMap[pagePath];
    let Layout = null;
    const fullLayoutPath = path.resolve(pagic.config.srcDir, pageProps.layoutPath);
    if (await fs.exists(fullLayoutPath)) {
      Layout = await importDefault(fullLayoutPath, {
        reload: pagic.needRebuild
      });
    } else {
      Layout = await importDefault(`../themes/${pagic.config.theme}/${pageProps.layoutPath}`, {
        base: path.dirname(import.meta.url)
      });
    }
    pagic.pagePropsMap[pagePath] = {
      ...pageProps,
      content: <Layout {...pageProps} />
    };
  }
};

export default layout;
