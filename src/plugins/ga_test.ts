import { asserts } from '../../deps.ts';

import Pagic from '../Pagic.ts';
import ga from './ga.tsx';

Deno.test('[ga]', async () => {
  const pagic = new Pagic();
  await ga.fn(pagic);
  // pagic.config.ga is undefined, nothing happened
  asserts.assertEquals(pagic.pagePropsMap, {});

  pagic.config.ga = { id: 'G-JPPPP5EF38' };
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

  await ga.fn(pagic);
  asserts.assertEquals(pagic.pagePropsMap['README.md'].head?.props.children[0]?.props, pagic.config.ga);
  asserts.assert(pagic.writeFiles['_ga.js'].startsWith('const Ga = ({ id }) => {'));
});
