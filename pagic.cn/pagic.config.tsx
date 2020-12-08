// import { React } from './deps.ts';

export default {
  srcDir: '.',
  exclude: ['build.ts', 'index_cn.tsx'],
  theme: 'docs',
  plugins: ['sidebar', 'prev_next', 'blog'],
  title: 'Pagic',
  description: 'Deno + Pagic 驱动的静态网站生成器',
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
      link: '/docs/introduction.html'
    },
    {
      text: '主题',
      link: '/themes/'
    },
    {
      text: '插件',
      link: '/plugins/'
    },
    {
      text: '博客',
      link: '/blog/'
    },
    {
      text: '关于',
      link: '/about/'
    }
  ],
  sidebar: {
    '/zh-CN/docs/': [
      'zh-CN/docs/introduction.md',
      'zh-CN/docs/usage.md',
      'zh-CN/docs/config.md',
      'zh-CN/docs/content.md',
      'zh-CN/docs/layout.md',
      'zh-CN/docs/themes.md',
      'zh-CN/docs/plugins.md',
      'zh-CN/docs/blog.md',
      'zh-CN/docs/i18n.md',
      'zh-CN/docs/deployment.md',
      'zh-CN/docs/demos.md',
      'zh-CN/docs/limitations.md'
    ]
  },
  blog: {
    root: '/blog/'
  }
};
