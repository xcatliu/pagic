import { React } from '../../deps.ts';

import { PagicPlugin } from '../Pagic.ts';
import Gitalk from './gitalk_component.tsx';
import { compilePagicFile } from '../utils/mod.ts';

const gitalk: PagicPlugin = {
  name: 'gitalk',
  insert: 'before:script',
  fn: async (pagic) => {
    for (const pagePath of pagic.pagePaths) {
      const pageProps = pagic.pagePropsMap[pagePath];

      pagic.pagePropsMap[pagePath] = {
        gitalk: <Gitalk {...pagic.config.gitalk} id={pageProps.outputPath} title={pageProps.title} />,
        ...pageProps
      };
    }

    if (pagic.rebuilding) {
      pagic.writeFiles['_gitalk.js'] = await compilePagicFile('src/plugins/gitalk_component.tsx');
    }
  }
};

export default gitalk;
