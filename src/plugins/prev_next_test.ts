import { asserts } from '../../deps.ts';

import Pagic from '../Pagic.ts';
import prev_next from './prev_next.tsx';

Deno.test('[prev_next]', async () => {
  const pagic = new Pagic();

  pagic.pagePaths = ['README.md', 'docs/introduction.md', 'docs/usage.md', 'docs/usage/foo.md', 'docs/bar.md'];
  const docsSidebar = [
    { link: 'docs/introduction.html', text: 'Intro', pagePath: 'docs/introduction.md' },
    {
      link: 'docs/usage.html',
      text: 'Usage',
      pagePath: 'docs/usage.md',
      children: [{ link: 'docs/usage/foo.html', text: 'Foo', pagePath: 'docs/usage/foo.md' }]
    },
    {
      text: 'No link',
      children: [{ text: 'Bar', link: 'docs/bar.html', pagePath: 'docs/bar.md' }]
    }
  ];
  const commonProps = { config: pagic.config, layoutPath: '_layout.tsx', content: null, head: null, script: null };
  pagic.pagePropsMap = {
    'README.md': {
      ...commonProps,
      pagePath: 'README.md',
      outputPath: 'index.html',
      title: '',
      next: 'docs/introduction.md' as any
    },
    'docs/introduction.md': {
      ...commonProps,
      pagePath: 'docs/introduction.md',
      outputPath: 'docs/introduction.html',
      title: 'Introduction',
      sidebar: docsSidebar,
      prev: 'README.md' as any
    },
    'docs/usage.md': {
      ...commonProps,
      pagePath: 'docs/usage.md',
      outputPath: 'docs/usage.html',
      title: 'Usage',
      sidebar: docsSidebar
    },
    'docs/usage/foo.md': {
      ...commonProps,
      pagePath: 'docs/usage/foo.md',
      outputPath: 'docs/usage/foo.html',
      title: 'Foo',
      sidebar: docsSidebar
    },
    'docs/bar.md': {
      ...commonProps,
      pagePath: 'docs/bar.md',
      outputPath: 'docs/bar.html',
      title: 'Bar',
      sidebar: docsSidebar
    }
  };

  await prev_next.fn(pagic);
  asserts.assertEquals(pagic.pagePropsMap['README.md'].prev, undefined);
  asserts.assertEquals(pagic.pagePropsMap['README.md'].next, { text: 'Introduction', link: 'docs/introduction.html' });
  asserts.assertEquals(pagic.pagePropsMap['docs/introduction.md'].prev, { text: '', link: 'index.html' });
  asserts.assertEquals(pagic.pagePropsMap['docs/introduction.md'].next, { text: 'Usage', link: 'docs/usage.html' });
  asserts.assertEquals(pagic.pagePropsMap['docs/usage.md'].prev, {
    text: 'Intro',
    link: 'docs/introduction.html'
  });
  asserts.assertEquals(pagic.pagePropsMap['docs/usage.md'].next, { text: 'Foo', link: 'docs/usage/foo.html' });
  asserts.assertEquals(pagic.pagePropsMap['docs/usage/foo.md'].prev, { text: 'Usage', link: 'docs/usage.html' });
  asserts.assertEquals(pagic.pagePropsMap['docs/usage/foo.md'].next, { text: 'Bar', link: 'docs/bar.html' });
  asserts.assertEquals(pagic.pagePropsMap['docs/bar.md'].prev, { text: 'Foo', link: 'docs/usage/foo.html' });
  asserts.assertEquals(pagic.pagePropsMap['docs/bar.md'].next, undefined);
});
