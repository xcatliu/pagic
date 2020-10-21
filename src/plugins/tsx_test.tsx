import { asserts, ReactDOMServer } from '../../deps.ts';

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
      head: null,
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
      head: null,
      script: null,
      toc: null
    }
  };
  await tsx.fn(pagic);

  const pageProps_hello = pagic.pagePropsMap['hello.tsx'];
  asserts.assertEquals(
    ReactDOMServer.renderToString(pageProps_hello.content!),
    '<h1 data-reactroot="">Hello world</h1>'
  );
  asserts.assertEquals(pageProps_hello.outputPath, 'foo/bar.html');
});
