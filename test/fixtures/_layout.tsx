import { React } from '../../deps.ts';

import type { PagicLayout } from '../../mod.ts';

const Layout: PagicLayout = ({ title, content }) => (
  <html>
    <head>
      <title>{title}</title>
    </head>
    <body>{content}</body>
  </html>
);

export default Layout;
