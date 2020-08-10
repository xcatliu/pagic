// @deno-types="https://deno.land/x/pagic@v0.8.3/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

import { PagicPlugin } from '../Pagic.ts';
import Ga from './ga_component.tsx';
import { compilePagicFile } from '../utils/mod.ts';

const ga: PagicPlugin = {
  name: 'ga',
  insert: 'before:script',
  fn: async (pagic) => {
    for (const pagePath of pagic.pagePaths) {
      const pageProps = pagic.pagePropsMap[pagePath];

      pagic.pagePropsMap[pagePath] = {
        ga: <Ga {...pagic.config.ga} />,
        ...pageProps
      };
    }

    if (pagic.rebuilding) {
      pagic.writeFiles['_ga.js'] = await compilePagicFile('src/plugins/ga_component.tsx');
    }
  }
};

export default ga;
