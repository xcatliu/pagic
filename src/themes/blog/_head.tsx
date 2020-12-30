import { React } from '../../../deps.ts';
// @deno-types="../../types/any.d.ts"
import Helmet from 'https://cdn.pagic.org/react-helmet@6.1.0/esnext/react-helmet.js';

import type { PagicLayout } from '../../Pagic.ts';

const Head: PagicLayout<{
  isDark: boolean;
}> = ({ config, title, head, outputPath, isDark }) => {
  const scriptSetIsDark = `
    const _shouldSetIsDark = document.cookie.includes('is_dark=1') ? true : document.cookie.includes('is_dark=0') ? false : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (_shouldSetIsDark) {
      document.documentElement.classList.add('is_dark');
      document.getElementById('prismTheme').href = "${config.root}assets/prism_tomorrow.css";
    }
  `;
  return (
    <head>
      <Helmet>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title ? (outputPath !== 'index.html' ? `${title} · ${config.title}` : title) : config.title}</title>
        {config.description && <meta name="description" content={config.description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="stylesheet" href={`${config.root}assets/index.css`} />
        <link
          id="prismTheme"
          rel="stylesheet"
          href={isDark ? `${config.root}assets/prism_tomorrow.css` : `${config.root}assets/prism.css`}
        />

        <script>{scriptSetIsDark}</script>
      </Helmet>
      {head}
    </head>
  );
};

export default Head;
