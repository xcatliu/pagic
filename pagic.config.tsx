// import { React } from './deps.ts';

export default {
  srcDir: 'pagic.org',
  theme: 'docs',
  plugins: ['sidebar', 'prev_next', 'i18n', 'blog', 'ga'],
  title: 'Pagic',
  description: 'A static site generator powered by Deno + React',
  github: 'https://github.com/xcatliu/pagic',
  // head: (
  //   <>
  //     <script src="https://cdn.pagic.org/vconsole@3.3.4/dist/vconsole.min.js" />
  //     <script dangerouslySetInnerHTML={{ __html: 'var vConsole = new VConsole();' }} />
  //   </>
  // ),
  nav: [
    {
      text: 'Docs',
      link: '/docs/introduction.html'
    },
    {
      text: 'Themes',
      link: '/themes/'
    },
    {
      text: 'Plugins',
      link: '/plugins/'
    },
    {
      text: 'Blog',
      link: '/blog/'
    },
    {
      text: 'About',
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
  },
  ga: {
    id: 'G-JPPPP5EF38'
  },
  blog: {
    root: '/blog/'
  },
  i18n: {
    languages: [
      { code: 'en', name: 'English', root: '/' },
      { code: 'zh-CN', name: '简体中文', root: '/zh-CN/' }
    ],
    overrides: {
      'zh-CN': {
        nav: [
          {
            text: '文档',
            link: '/zh-CN/docs/introduction.html'
          },
          {
            text: '主题',
            link: '/zh-CN/themes/'
          },
          {
            text: '插件',
            link: '/zh-CN/plugins/'
          },
          {
            text: '博客',
            link: '/zh-CN/blog/'
          },
          {
            text: '关于',
            link: '/zh-CN/about/'
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
            'zh-CN/docs/deployment.md',
            'zh-CN/docs/demos.md',
            'zh-CN/docs/limitations.md'
          ]
        },
        blog: {
          root: '/zh-CN/blog/'
        }
      }
    },
    resources: {
      'zh-CN': {
        translation: {
          'A static site generator powered by Deno + React': 'Deno + React 驱动的静态网站生成器',
          'Get Started': '开始使用',
          Demos: '示例网站',
          'Easy to configure': '配置简单',
          'Convention over configuration': '约定优于配置',
          'Single config file': '一个配置文件',
          'Intuitive design': '符合直觉的设计',
          'Support md and tsx': '支持 md 和 tsx',
          'Render <1>md/tsx</1> to static HTML page': '支持将 <1>md/tsx</1> 文件渲染成静态页面',
          'Support React Hooks': '支持 React Hooks',
          'Pre-render to static HTML, run as an SPA once loaded': '预渲染生成静态 HTML，加载后作为 SPA 运行',
          'Themes and plugins': '主题和插件',
          'Official themes default/docs/blog with dark mode': '内置 default, docs, blog 等主题，支持黑暗模式',
          'Combine plugins to build process': '构建过程由插件组成，可随意组合',
          'Import third-party themes or plugins through URL': '通过 URL 引入第三方主题或插件',
          'Get up and running in seconds': '只需几行命令，快来体验吧',
          'Install pagic': '安装 pagic',
          'Create pagic.config.ts and README.md': '创建 pagic.config.ts 和 README.md',
          'Run pagic': '运行 pagic'
        }
      }
    }
  }
};
