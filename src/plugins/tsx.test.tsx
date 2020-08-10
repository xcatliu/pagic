// @deno-types="https://deno.land/x/pagic@v0.8.3/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
// @deno-types="https://deno.land/x/pagic@v0.8.3/src/types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server.js';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import Pagic from '../Pagic.ts';
import tsx from './tsx.tsx';

Deno.test('[tsx]', async () => {
  const pagic = new Pagic();
  pagic.config = { srcDir: 'test/fixtures' } as any;
  pagic.pagePaths = ['hello.tsx', 'README.md'];
  pagic.pagePropsMap = {
    'hello.tsx': {
      config: pagic.config,
      pagePath: 'hello.tsx',
      layoutPath: '_layout.tsx',
      outputPath: 'hello.html',
      title: '',
      content: null,
      script: null,
      toc: null
    },
    'README.md': {
      config: pagic.config,
      pagePath: 'README.md',
      layoutPath: '_layout.tsx',
      outputPath: 'index.html',
      title: '',
      content: null,
      script: null,
      toc: null
    }
  };
  await tsx.fn(pagic);

  const pageProps_hello = pagic.pagePropsMap['hello.tsx'];
  assertEquals(ReactDOMServer.renderToString(pageProps_hello.content!), '<h1 data-reactroot="">Hello World</h1>');
  assertEquals(pageProps_hello.title, 'Hello World');
  assertEquals(pageProps_hello.author, 'xcatliu');
  assertEquals(pageProps_hello.published, '2020-05-20');
});
