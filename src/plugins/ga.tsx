import { React } from '../../deps.ts';

import type { PagicPlugin } from '../Pagic.ts';
import Ga from './ga_component.tsx';
import { compilePagicFile } from '../utils/mod.ts';

const ga: PagicPlugin = {
  name: 'ga',
  insert: 'before:script',
  fn: async (pagic) => {
    if (!pagic.config.ga) {
      return;
    }
    for (const pagePath of pagic.pagePaths) {
      const pageProps = pagic.pagePropsMap[pagePath];

      pagic.pagePropsMap[pagePath] = {
        ...pageProps,
        head: (
          <>
            <Ga {...pagic.config.ga} />
            {pageProps.head}
          </>
        ),
      };
    }

    if (pagic.rebuilding) {
      pagic.writeFiles['_ga.js'] = await compilePagicFile('src/plugins/ga_component.tsx');
    }
  },
};

export default ga;
