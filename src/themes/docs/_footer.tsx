// @deno-types="https://deno.land/x/pagic@v0.8.6/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

import { PagicLayout } from '../../Pagic.ts';

const Footer: PagicLayout = () => (
  <footer>
    Powered by{' '}
    <a href="https://github.com/xcatliu/pagic" target="_blank">
      Pagic
    </a>
  </footer>
);

export default Footer;
