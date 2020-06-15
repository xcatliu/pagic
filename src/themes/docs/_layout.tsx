// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { PagicLayout } from '../../Pagic.ts';

import Sidebar from './_sidebar.tsx';

const Layout: PagicLayout = ({ config, title, content, ga, gitalk, script, sidebar, outputPath }) => {
  const [isDark, setIsDark] = React.useState(
    // @ts-ignore
    window.Deno ? false : document.documentElement.classList.contains('is_dark')
  );
  return (
    <html className={isDark ? 'is_dark' : ''}>
      <head>
        {ga}
        <title>{outputPath !== 'index.html' ? `${title} · ${config.title}` : title}</title>
        <meta charSet="utf-8" />

        <link
          id="prismTheme"
          rel="stylesheet"
          href={isDark ? `${config.base}assets/prism_tomorrow.css` : `${config.base}assets/prism.css`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
let shouldSetIsDark = document.cookie.includes('is_dark=1') ? true : document.cookie.includes('is_dark=0') ? false : window.matchMedia('(prefers-color-scheme: dark)').matches
if (shouldSetIsDark) {
  document.documentElement.classList.add('is_dark');
  document.getElementById('prismTheme').href = "${config.base}assets/prism_tomorrow.css";
}
`
          }}
        />

        <link rel="stylesheet" href={`${config.base}assets/index.css`} />
      </head>
      <body>
        <header>
          <h1>
            <a href={config.base}>{config.title}</a>
          </h1>
          <nav>
            <ul>
              {config.nav.map(({ text, link }: any) => (
                <li key={link}>
                  <a href={link}>{text}</a>
                </li>
              ))}
              <li
                onClick={() => {
                  setIsDark(!isDark);
                  // @ts-ignore
                  document.cookie = `is_dark=${!isDark ? '1' : '0'}; expires=Tue, 19 Jun 2038 03:14:07 UTC; path=/`;
                }}
                className="toggle_dark"
              >
                <span className="sun" style={{ backgroundImage: `url("${config.base}assets/sun.svg")` }} />
                <span className="sun-l" style={{ backgroundImage: `url("${config.base}assets/sun-l.svg")` }} />
                <span className="moon" style={{ backgroundImage: `url("${config.base}assets/moon.svg")` }} />
                <span className="moon-l" style={{ backgroundImage: `url("${config.base}assets/moon-l.svg")` }} />
              </li>
            </ul>
          </nav>
        </header>
        <Sidebar sidebar={sidebar} outputPath={outputPath} config={config} />
        <section className="main">
          {content}
          {gitalk}
        </section>
        {script}
      </body>
    </html>
  );
};

export default Layout;
