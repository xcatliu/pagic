import type { PagicPlugin } from '../Pagic.ts';
import { getOutputPath, findNearestLayoutPath } from '../utils/mod.ts';

/** Init pagic.pagePropsMap */
const init: PagicPlugin = {
  name: 'init',
  fn: async (pagic) => {
    for (const pagePath of pagic.pagePaths) {
      const layoutPath = findNearestLayoutPath(pagePath, pagic.layoutPaths);
      const outputPath = getOutputPath(pagePath);
      pagic.pagePropsMap[pagePath] = {
        config: pagic.config,
        pagePath,
        layoutPath,
        outputPath,
        title: '',
        content: null,
        head: pagic.config.head ?? null,
        script: null,
        footer: pagic.config.footer ?? null,
      };
    }
  },
};

export default init;
