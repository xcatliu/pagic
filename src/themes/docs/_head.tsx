// @deno-types="https://deno.land/x/pagic@v0.8.3/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import ReactHelmet from 'https://dev.jspm.io/react-helmet@6.1.0';
const { Helmet } = ReactHelmet;

import { PagicLayout } from '../../Pagic.ts';

const Head: PagicLayout<{
  isDark: boolean;
}> = ({ config, title, ga, outputPath, isDark }) => {
  const scriptSetIsDark = `
    const shouldSetIsDark = document.cookie.includes('is_dark=1') ? true : document.cookie.includes('is_dark=0') ? false : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (shouldSetIsDark) {
      document.documentElement.classList.add('is_dark');
      document.getElementById('prismTheme').href = "${config.root}assets/prism_tomorrow.css";
    }
  `;
  return (
    <head>
      {ga}
      {config.head}
      <Helmet>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title ? (outputPath !== 'index.html' ? `${title} · ${config.title}` : title) : config.title}</title>
        {config.description && <meta name="description" content={config.description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          id="prismTheme"
          rel="stylesheet"
          href={isDark ? `${config.root}assets/prism_tomorrow.css` : `${config.root}assets/prism.css`}
        />
        <link rel="stylesheet" href={`${config.root}assets/index.css`} />
        <script>{scriptSetIsDark}</script>
      </Helmet>
    </head>
  );
};

export default Head;
