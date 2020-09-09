import i18next from 'https://deno.land/x/i18next@v19.6.3/index.js';
import { Trans } from 'https://deno.land/x/pagic@v0.9.0/src/vendors/react-i18next/Trans.js';

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
  i18next.changeLanguage(window.pageProps.language, () => {});
  return i18next.t(input);
};

window.Trans = (props) => {
  i18next.changeLanguage(window.pageProps.language, () => {});
  return window.React.createElement(Trans, {
    i18n: i18next,
    ...props
  });
};
