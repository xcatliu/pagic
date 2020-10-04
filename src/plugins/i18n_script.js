import i18next from 'https://deno.land/x/i18next@v19.6.3/index.js';
import { Trans } from 'https://cdn.pagic.org/react-i18next@11.7.3/Trans.js';

import pagicConfig from './pagic.config.js';

(async () => {
  await i18next.init(
    {
      interpolation: {
        escapeValue: false // not needed for react as it escapes by default
      },
      ...pagicConfig.i18n
    },
    () => {}
  );
})();

window.t = (input) => {
  i18next.changeLanguage(window.pageProps.language.code, () => {});
  return i18next.t(input);
};

window.Trans = (props) => {
  i18next.changeLanguage(window.pageProps.language.code, () => {});
  return window.React.createElement(Trans, {
    i18n: i18next,
    ...props
  });
};
