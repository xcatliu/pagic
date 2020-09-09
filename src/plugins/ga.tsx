import { React } from '../../deps.ts';

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
        head: (
          <>
            <Ga {...pagic.config.ga} />
            {pageProps.head}
          </>
        ),
        ...pageProps
      };
    }

    if (pagic.rebuilding) {
      pagic.writeFiles['_ga.js'] = await compilePagicFile('src/plugins/ga_component.tsx');
    }
  }
};

export default ga;
