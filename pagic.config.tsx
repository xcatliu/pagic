export default {
  srcDir: 'site',
  theme: 'docs',
  plugins: ['sidebar', 'prev_next'],
  title: 'Pagic',
  description: 'The easiest way to generate static html page from markdown, built with Deno! 🦕',
  github: 'https://github.com/xcatliu/pagic',
  // head: (
  //   <>
  //     <script src="/assets/vconsole.min.js" />
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
      text: '新闻',
      link: '/news/'
    },
    {
      text: '关于',
      link: '/about/'
    }
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
      'docs/limitations.md'
    ]
  }
};
