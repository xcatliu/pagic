import Pagic, { PagicPlugin } from '../Pagic.ts';

/**
 * Init pagic.pagePropsMap
 */
const init: PagicPlugin = async (pagic) => {
  for (const pagePath of pagic.pagePaths) {
    let layoutPath = `/${pagePath}`.replace(/\/[^\/]+$/, '/_layout.tsx');
    while (layoutPath !== '/_layout.tsx') {
      if (pagic.layoutPaths.includes(layoutPath.slice(1))) {
        break;
      }
      layoutPath = layoutPath.replace(/\/[^\/]+\/[^\/]+$/, '/_layout.tsx');
    }
    layoutPath = layoutPath.slice(1);
    const outputPath = pagePath.replace(/\.[^\.]+$/, '.html');
    pagic.pagePropsMap[pagePath] = {
      pagic,
      pagePath,
      layoutPath,
      outputPath,
      title: '',
      content: null
    };
  }
};

export default init;
