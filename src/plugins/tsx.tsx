import { path } from '../deps.ts';
// @deno-types="https://deno.land/x/pagic@v0.8.3/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

import { PagicPlugin } from '../Pagic.ts';
import { import_ } from '../utils/mod.ts';

const tsx: PagicPlugin = {
  name: 'tsx',
  fn: async (pagic) => {
    for (const pagePath of pagic.pagePaths.filter((pagePath) => pagePath.endsWith('.tsx'))) {
      const pageProps = pagic.pagePropsMap[pagePath];
      const fullPagePath = path.resolve(pagic.config.srcDir, pagePath);
      const { default: ContentComponent, frontMatter } = await import_(fullPagePath, {
        reload: true
      });

      pagic.pagePropsMap[pagePath] = {
        ...pageProps,
        ...frontMatter,
        content: <ContentComponent />
      };
    }
  }
};

export default tsx;
