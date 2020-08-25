import { path, React } from '../../deps.ts';

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
        content: <ContentComponent />,
        ...frontMatter
      };
    }
  }
};

export default tsx;
