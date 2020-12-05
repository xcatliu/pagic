// import { React } from './deps.ts';

export default {
  srcDir: '.',
  exclude: ['build.ts', 'index_cn.tsx'],
  theme: 'docs',
  plugins: ['sidebar', 'prev_next', 'blog'],
  title: 'Pagic',
  description: 'A static site generator powered by Deno + React',
  github: 'https://gitee.com/xcatliu/pagic',
  // head: (
  //   <>
  //     <script src="https://cdn.pagic.org/vconsole@3.3.4/dist/vconsole.min.js" />
  //     <script dangerouslySetInnerHTML={{ __html: 'var vConsole = new VConsole();' }} />
  //   </>
  // ),
  nav: [
    {
      text: '文档',
      link: '/docs/introduction.html',
    },
    {
      text: '主题',
      link: '/themes/',
    },
    {
      text: '插件',
      link: '/plugins/',
    },
    {
      text: '博客',
      link: '/blog/',
    },
    {
      text: '关于',
      link: '/about/',
    },
  ],
  sidebar: {
    '/docs/': [
      'docs/introduction.md',
      'docs/usage.md',
      'docs/config.md',
      'docs/content.md',
      'docs/layout.md',
      'docs/themes.md',
      'docs/plugins.md',
      'docs/deployment.md',
      'docs/demos.md',
      'docs/limitations.md',
    ],
  },
  blog: {
    root: '/blog/',
  },
};
