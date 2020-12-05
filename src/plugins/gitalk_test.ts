import { asserts } from '../../deps.ts';

import Pagic from '../Pagic.ts';
import gitalk from './gitalk.tsx';

Deno.test('[gitalk]', async () => {
  const pagic = new Pagic();
  await gitalk.fn(pagic);
  // pagic.config.gitalk is undefined, nothing happened
  asserts.assertEquals(pagic.pagePropsMap, {});

  pagic.config.gitalk = {
    clientID: '29aa4941759fc887ed4f',
    clientSecret: '33e355efdf3a1959624506a5d88311145208471b',
    repo: 'typescript-tutorial',
    owner: 'xcatliu',
    admin: ['xcatliu'],
    pagerDirection: 'first',
  };
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

  await gitalk.fn(pagic);
  asserts.assertEquals(pagic.pagePropsMap['README.md'].gitalk?.props, {
    ...pagic.config.gitalk,
    id: 'index.html',
    title: '',
  });
  asserts.assert(pagic.writeFiles['_gitalk.js'].startsWith('const Gitalk = (props) => {'));
});
