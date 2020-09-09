// ISO Language Code Table
// http://www.lingoes.net/en/translator/langcode.htm

import i18next from 'https://deno.land/x/i18next@v19.6.3/index.js';
import { Trans as TransComponent } from '../vendors/react-i18next/Trans.js';

import { path, React } from '../../deps.ts';
import { PagicPlugin, PagicConfig } from '../Pagic.ts';
import { copyPagicFile } from '../utils/mod.ts';

let pagicConfig: PagicConfig;

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
        pagic.config.i18n.languages.find(({ code }: any) => pagePath.startsWith(`${code}/`))?.code ??
        pagic.config.i18n.languages[0].code;

      pagic.pagePropsMap[pagePath] = {
        ...pageProps,
        language,
        head: (
          <>
            {pageProps.head}
            <script type="module" src={`${pagic.config.root}i18n.js`} />
          </>
        ),
        config: {
          ...pagic.config,
          ...pagic.config.i18n.overrides?.[language]
        }
      };
    }

    if (pagic.rebuilding) {
      pagicConfig = pagic.config;

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
  i18next.changeLanguage((window as any).pageProps.language, () => {});
  return i18next.t(input);
};

export const Trans = (props: any) => {
  i18next.changeLanguage((window as any).pageProps.language, () => {});
  return <TransComponent i18n={i18next} {...props} />;
};

export default i18n;
