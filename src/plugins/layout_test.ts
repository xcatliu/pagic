import { asserts, ReactDOMServer } from '../../deps.ts';

import Pagic from '../Pagic.ts';
import layout from './layout.tsx';

Deno.test('[layout]', async () => {
  const pagic = new Pagic();
  pagic.config.srcDir = 'test/fixtures';
  pagic.pagePaths = ['README.md'];
  pagic.pagePropsMap = {
    'README.md': {
      config: pagic.config,
      pagePath: 'README.md',
      layoutPath: '_layout.tsx',
      outputPath: 'index.html',
      title: '',
      content: null,
      head: null,
      script: null,
    },
  };
  await layout.fn(pagic);
  asserts.assertEquals(
    ReactDOMServer.renderToString(pagic.pagePropsMap['README.md'].content!),
    '<html data-reactroot=""><head><title></title></head><body></body></html>',
  );
});
