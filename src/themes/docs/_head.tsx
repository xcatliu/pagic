import { React } from '../../../deps.ts';
import { Helmet } from 'https://cdn.pagic.org/react-helmet@6.1.0/esnext/react-helmet.js';

import type { PagicLayout } from '../../Pagic.ts';

const Head: PagicLayout<{
  isDark: boolean;
}> = ({ config, title, head, outputPath, contentHasKatex, isDark }) => {
  const [katexCssLoadOnce, setKatexCssLoadOnce] = React.useState(contentHasKatex);
  if (contentHasKatex && !katexCssLoadOnce) setKatexCssLoadOnce(true);
  const scriptSetIsDark = `
    const shouldSetIsDark = document.cookie.includes('is_dark=1') ? true : document.cookie.includes('is_dark=0') ? false : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (shouldSetIsDark) {
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
        {katexCssLoadOnce && (
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
            integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
            crossOrigin="anonymous"
          />
        )}

        <script>{scriptSetIsDark}</script>
      </Helmet>
      {head}
    </head>
  );
};

export default Head;
