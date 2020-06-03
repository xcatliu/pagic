// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { PagicLayout } from '../mod.ts';

const Layout: PagicLayout = ({ title, content, sidebar, script }) => (
  <html>
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="./assets/index.css" />
    </head>
    <body>
      <pre>{JSON.stringify(sidebar, null, 4)}</pre>
      {content}
      {script}
    </body>
  </html>
);

export default Layout;
