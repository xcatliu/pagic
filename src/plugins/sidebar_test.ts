import { asserts } from '../../deps.ts';

import Pagic from '../Pagic.ts';
import sidebar from './sidebar.tsx';

Deno.test('[sidebar]', async () => {
  const pagic = new Pagic();
  await sidebar.fn(pagic);
  // pagic.config.sidebar is undefined, nothing happened
  asserts.assertEquals(pagic.pagePropsMap, {});

  pagic.config.sidebar = {
    '/docs/': ['docs/introduction.md', 'docs/usage.md'],
    '/api/': ['api/foo.md', 'api/bar.tsx'],
  };
  pagic.pagePaths = ['README.md', 'docs/introduction.md', 'docs/usage.md', 'api/foo.md', 'api/bar.tsx'];
  const commonProps = { config: pagic.config, layoutPath: '_layout.tsx', content: null, head: null, script: null };
  pagic.pagePropsMap = {
    'README.md': {
      ...commonProps,
      pagePath: 'README.md',
      outputPath: 'index.html',
      title: '',
    },
    'docs/introduction.md': {
      ...commonProps,
      pagePath: 'docs/introduction.md',
      outputPath: 'docs/introduction.html',
      title: 'Introduction',
    },
    'docs/usage.md': {
      ...commonProps,
      pagePath: 'docs/usage.md',
      outputPath: 'docs/usage.html',
      title: 'Usage',
    },
    'api/foo.md': {
      ...commonProps,
      pagePath: 'api/foo.md',
      outputPath: 'api/foo.html',
      title: 'Foo',
    },
    'api/bar.tsx': {
      ...commonProps,
      pagePath: 'api/bar.tsx',
      outputPath: 'api/bar.html',
      title: '',
    },
  };

  await sidebar.fn(pagic);
  asserts.assertEquals(pagic.pagePropsMap['README.md'].sidebar, undefined);
  const docsSidebar = [
    { link: 'docs/introduction.html', text: 'Introduction', pagePath: 'docs/introduction.md' },
    { link: 'docs/usage.html', text: 'Usage', pagePath: 'docs/usage.md' },
  ];
  const apiSidebar = [
    { link: 'api/foo.html', text: 'Foo', pagePath: 'api/foo.md' },
    { link: 'api/bar.html', text: '', pagePath: 'api/bar.tsx' },
  ];
  asserts.assertEquals(pagic.pagePropsMap['docs/introduction.md'].sidebar, docsSidebar);
  asserts.assertEquals(pagic.pagePropsMap['docs/usage.md'].sidebar, docsSidebar);
  asserts.assertEquals(pagic.pagePropsMap['api/foo.md'].sidebar, apiSidebar);
  asserts.assertEquals(pagic.pagePropsMap['api/bar.tsx'].sidebar, apiSidebar);
});

Deno.test('[sidebar] object config', async () => {
  const pagic = new Pagic();
  pagic.config.sidebar = {
    '/docs/': [
      {
        text: 'Intro',
        link: 'docs/introduction.md',
      },
      {
        link: 'docs/usage.md',
        children: ['docs/usage/foo.md'],
      },
      {
        text: 'No link',
        children: ['docs/bar.md'],
      },
    ],
  };
  pagic.pagePaths = ['docs/introduction.md', 'docs/usage.md', 'docs/usage/foo.md', 'docs/bar.md'];
  const commonProps = { config: pagic.config, layoutPath: '_layout.tsx', content: null, head: null, script: null };
  pagic.pagePropsMap = {
    'docs/introduction.md': {
      ...commonProps,
      config: pagic.config,
      pagePath: 'docs/introduction.md',
      outputPath: 'docs/introduction.html',
      title: 'Introduction',
    },
    'docs/usage.md': {
      ...commonProps,
      config: pagic.config,
      pagePath: 'docs/usage.md',
      outputPath: 'docs/usage.html',
      title: 'Usage',
    },
    'docs/usage/foo.md': {
      ...commonProps,
      pagePath: 'docs/usage/foo.md',
      outputPath: 'docs/usage/foo.html',
      title: 'Foo',
    },
    'docs/bar.md': {
      ...commonProps,
      pagePath: 'docs/bar.md',
      outputPath: 'docs/bar.html',
      title: 'Bar',
    },
  };

  await sidebar.fn(pagic);
  const docsSidebar = [
    { link: 'docs/introduction.html', text: 'Intro', pagePath: 'docs/introduction.md' },
    {
      link: 'docs/usage.html',
      text: 'Usage',
      pagePath: 'docs/usage.md',
      children: [{ link: 'docs/usage/foo.html', text: 'Foo', pagePath: 'docs/usage/foo.md' }],
    },
    {
      text: 'No link',
      children: [{ text: 'Bar', link: 'docs/bar.html', pagePath: 'docs/bar.md' }],
    },
  ];
  asserts.assertEquals(pagic.pagePropsMap['docs/introduction.md'].sidebar, docsSidebar);
  asserts.assertEquals(pagic.pagePropsMap['docs/usage.md'].sidebar, docsSidebar);
  asserts.assertEquals(pagic.pagePropsMap['docs/usage/foo.md'].sidebar, docsSidebar);
});

Deno.test('[sidebar] glob config', async () => {
  const pagic = new Pagic();
  await sidebar.fn(pagic);
  // pagic.config.sidebar is undefined, nothing happened
  asserts.assertEquals(pagic.pagePropsMap, {});

  pagic.config.sidebar = {
    '/docs/': ['docs/*.md'],
    '/api/': ['api/foo.md', 'api/bar.tsx'],
    '/deep/': ['deep/**/*.md', 'deep/**/[b]*.tsx'],
  };
  pagic.pagePaths = ['README.md', 'docs/introduction.md', 'docs/usage.md', 'api/foo.md', 'api/bar.tsx', 'deep/path/foo.md', 'deep/path/bar.tsx'];
  const commonProps = { config: pagic.config, layoutPath: '_layout.tsx', content: null, head: null, script: null };
  pagic.pagePropsMap = {
    'README.md': {
      ...commonProps,
      pagePath: 'README.md',
      outputPath: 'index.html',
      title: '',
    },
    'docs/introduction.md': {
      ...commonProps,
      pagePath: 'docs/introduction.md',
      outputPath: 'docs/introduction.html',
      title: 'Introduction',
    },
    'docs/usage.md': {
      ...commonProps,
      pagePath: 'docs/usage.md',
      outputPath: 'docs/usage.html',
      title: 'Usage',
    },
    'api/foo.md': {
      ...commonProps,
      pagePath: 'api/foo.md',
      outputPath: 'api/foo.html',
      title: 'Foo',
    },
    'api/bar.tsx': {
      ...commonProps,
      pagePath: 'api/bar.tsx',
      outputPath: 'api/bar.html',
      title: '',
    },
    'deep/path/foo.md': {
      ...commonProps,
      pagePath: 'deep/path/foo.md',
      outputPath: 'deep/path/foo.html',
      title: 'Foo',
    },
    'deep/path/bar.tsx': {
      ...commonProps,
      pagePath: 'deep/path/bar.tsx',
      outputPath: 'deep/path/bar.html',
      title: '',
    },
  };

  await sidebar.fn(pagic);
  asserts.assertEquals(pagic.pagePropsMap['README.md'].sidebar, undefined);
  const docsSidebar = [
    { link: 'docs/introduction.html', text: 'Introduction', pagePath: 'docs/introduction.md' },
    { link: 'docs/usage.html', text: 'Usage', pagePath: 'docs/usage.md' },
  ];
  const apiSidebar = [
    { link: 'api/foo.html', text: 'Foo', pagePath: 'api/foo.md' },
    { link: 'api/bar.html', text: '', pagePath: 'api/bar.tsx' },
  ];
  const deepSidebar = [
    { link: 'deep/path/foo.html', text: 'Foo', pagePath: 'deep/path/foo.md' },
    { link: 'deep/path/bar.html', text: '', pagePath: 'deep/path/bar.tsx' },
  ];
  asserts.assertEquals(pagic.pagePropsMap['docs/introduction.md'].sidebar, docsSidebar);
  asserts.assertEquals(pagic.pagePropsMap['docs/usage.md'].sidebar, docsSidebar);
  asserts.assertEquals(pagic.pagePropsMap['api/foo.md'].sidebar, apiSidebar);
  asserts.assertEquals(pagic.pagePropsMap['api/bar.tsx'].sidebar, apiSidebar);
  asserts.assertEquals(pagic.pagePropsMap['deep/path/foo.md'].sidebar, deepSidebar);
  asserts.assertEquals(pagic.pagePropsMap['deep/path/bar.tsx'].sidebar, deepSidebar);
});
