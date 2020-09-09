import { asserts } from '../../deps.ts';

import Pagic from '../Pagic.ts';
import init from './init.tsx';

Deno.test('[init]', async () => {
  const pagic = new Pagic();
  // @ts-ignore
  pagic.config = { head: null };
  pagic.pagePaths = ['README.md', 'foo.tsx', 'bar/baz.md'];
  pagic.layoutPaths = ['bar/_layout.tsx', '_layout.tsx'];
  await init.fn(pagic);
  asserts.assertEquals(pagic.pagePropsMap, {
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
    },
    'foo.tsx': {
      config: pagic.config,
      pagePath: 'foo.tsx',
      layoutPath: '_layout.tsx',
      outputPath: 'foo.html',
      title: '',
      content: null,
      head: null,
      script: null,
      toc: null
    },
    'bar/baz.md': {
      config: pagic.config,
      pagePath: 'bar/baz.md',
      layoutPath: 'bar/_layout.tsx',
      outputPath: 'bar/baz.html',
      title: '',
      content: null,
      head: null,
      script: null,
      toc: null
    }
  });
});
