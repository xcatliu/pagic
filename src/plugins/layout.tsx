import { fs, path, React } from '../../deps.ts';

import { PagicPlugin } from '../Pagic.ts';
import { importDefault, importTheme } from '../utils/mod.ts';

const layout: PagicPlugin = {
  name: 'layout',
  fn: async (pagic) => {
    for (const pagePath of pagic.pagePaths) {
      const pageProps = pagic.pagePropsMap[pagePath];
      let Layout = null;
      const fullLayoutPath = path.resolve(pagic.config.srcDir, pageProps.layoutPath);
      if (await fs.exists(fullLayoutPath)) {
        Layout = await importDefault(fullLayoutPath, {
          reload: pagic.rebuilding
        });
      } else {
        Layout = await importTheme(pagic.config.theme, pageProps.layoutPath);
      }
      pagic.pagePropsMap[pagePath] = {
        ...pageProps,
        content: <Layout {...pageProps} />
      };
    }
  }
};

export default layout;
