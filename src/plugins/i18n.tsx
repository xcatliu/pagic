// ISO Language Code Table
// http://www.lingoes.net/en/translator/langcode.htm

import i18next from 'https://cdn.pagic.org/i18next@19.8.1/esnext/i18next.js';
import { Trans as TransComponent } from 'https://cdn.pagic.org/react-i18next@11.7.3/Trans.js';

import { path, React } from '../../deps.ts';
import type { PagicPlugin } from '../Pagic.ts';
import { copyPagicFile } from '../utils/mod.ts';

const i18n: PagicPlugin = {
  name: 'i18n',
  insert: 'after:init',
  fn: async (pagic) => {
    if (!pagic.config.i18n) {
      return;
    }
    for (const pagePath of pagic.pagePaths) {
      const pageProps = pagic.pagePropsMap[pagePath];

      const language =
        pagic.config.i18n.languages.slice(1).find(({ root }) => `/${pagePath}`.startsWith(root)) ??
        pagic.config.i18n.languages[0];

      const config = {
        ...pagic.config,
        ...pagic.config.i18n.overrides?.[language.code]
      };

      pagic.pagePropsMap[pagePath] = {
        ...pageProps,
        language,
        config,
        head: (
          <>
            {config.head}
            <script type="module" src={`${pagic.config.root}i18n.js`} />
          </>
        )
      };
    }

    if (pagic.rebuilding) {
      await i18next.init(
        {
          interpolation: {
            escapeValue: false // not needed for react as it escapes by default
          },
          ...pagic.config.i18n
        },
        () => {}
      );

      const i18nScriptDest = path.resolve(pagic.config.outDir, 'i18n.js');
      await copyPagicFile('src/plugins/i18n_script.js', i18nScriptDest);
    }
  }
};

export const t = (input: string) => {
  i18next.changeLanguage((window as any).pageProps.language.code, () => {});
  return i18next.t(input);
};

export const Trans = (props: any) => {
  i18next.changeLanguage((window as any).pageProps.language.code, () => {});
  return <TransComponent i18n={i18next} {...props} />;
};

export default i18n;
