import { asserts, fs, ReactDOMServer } from '../../deps.ts';

import Pagic from '../Pagic.ts';
import i18n from './i18n.tsx';

// Empty test/fixtures/test_i18n_dir before output files to it
fs.emptyDirSync('test/fixtures/test_i18n_dir');

Deno.test('[i18n]', async () => {
  const pagic = new Pagic();
  await i18n.fn(pagic);
  // pagic.config.i18n is undefined, nothing happened
  asserts.assertEquals(pagic.pagePropsMap, {});

  pagic.config.outDir = 'test/fixtures/test_i18n_dir';
  pagic.config.root = '/';
  pagic.config.blog = { root: '/blog/' };
  pagic.config.i18n = {
    languages: [
      { code: 'en', name: 'English', root: '/' },
      { code: 'zh-CN', name: '简体中文', root: '/zh-CN/' }
    ],
    overrides: {
      'zh-CN': {
        blog: {
          root: '/zh-CN/blog/'
        }
      }
    },
    resources: {
      'zh-CN': {
        translation: {
          'A static site generator powered by Deno + React': 'Deno + React 驱动的静态网站生成器'
        }
      }
    }
  };
  pagic.pagePaths = ['README.md', 'zh-CN/README.md'];
  pagic.pagePropsMap = {
    'README.md': {
      config: pagic.config,
      pagePath: 'README.md',
      layoutPath: '_layout.tsx',
      outputPath: 'index.html',
      title: '',
      content: null,
      head: null,
      script: null
    },
    'zh-CN/README.md': {
      config: pagic.config,
      pagePath: 'zh-CN/README.md',
      layoutPath: '_layout.tsx',
      outputPath: 'zh-CN/index.html',
      title: '',
      content: null,
      head: null,
      script: null
    }
  };

  await i18n.fn(pagic);
  asserts.assertEquals(pagic.pagePropsMap['README.md'].language, { code: 'en', name: 'English', root: '/' });
  asserts.assertEquals(pagic.pagePropsMap['README.md'].config.blog, { root: '/blog/' });
  asserts.assertEquals(
    ReactDOMServer.renderToString(pagic.pagePropsMap['README.md'].head!),
    '<script type="module" src="/i18n.js" data-reactroot=""></script>'
  );
  asserts.assertEquals(pagic.pagePropsMap['zh-CN/README.md'].language, {
    code: 'zh-CN',
    name: '简体中文',
    root: '/zh-CN/'
  });
  asserts.assertEquals(pagic.pagePropsMap['zh-CN/README.md'].config.blog, { root: '/zh-CN/blog/' });
  asserts.assertEquals(
    ReactDOMServer.renderToString(pagic.pagePropsMap['zh-CN/README.md'].head!),
    '<script type="module" src="/i18n.js" data-reactroot=""></script>'
  );

  asserts.assert(await fs.exists('test/fixtures/test_i18n_dir/i18n.js'));
});
