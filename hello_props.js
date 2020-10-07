import projectConfig from '/pagic.config.js';
import Hello from './hello_content.js';
var _a, _b;
export default {
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['en'] },
    'pagePath': "hello.tsx",
    'layoutPath': "_layout.tsx",
    'outputPath': "hello.html",
    'title': "",
    'content': React.createElement(Hello, { config: {
            description: 'The easiest way to generate static HTML page from markdown, built with Deno! 🦕',
            exclude: [
                '**/.*',
                '**/package.json',
                '**/package-lock.json',
                '**/node_modules',
                'pagic.config.ts',
                'pagic.config.tsx',
                '**/config.gypi',
                '**/CVS',
                '**/npm-debug.log',
                'dist'
            ],
            github: 'https://github.com/xcatliu/pagic',
            i18n: {
                languages: [
                    {
                        code: 'en',
                        name: 'English',
                        path: ''
                    },
                    {
                        code: 'zh-CN',
                        name: '简体中文',
                        path: 'zh-CN/'
                    }
                ],
                overrides: {
                    'zh-CN': {
                        nav: [
                            {
                                link: '/zh-CN/docs/introduction.html',
                                text: '文档'
                            },
                            {
                                link: '/zh-CN/themes/',
                                text: '主题'
                            },
                            {
                                link: '/zh-CN/plugins/',
                                text: '插件'
                            },
                            {
                                link: '/zh-CN/news/',
                                text: '新闻'
                            },
                            {
                                link: '/zh-CN/about/',
                                text: '关于'
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
                        }
                    }
                },
                resources: {
                    'zh-CN': {
                        translation: {
                            'A static site generator powered by Deno + React': 'Deno + React 驱动的静态网站生成器',
                            'Combine plugins to build process': '构建过程由插件组成，可随意组合',
                            'Convention over configuration': '约定优于配置',
                            'Create pagic.config.ts and README.md': '创建 pagic.config.ts 和 README.md',
                            Demos: '示例网站',
                            'Easy to configure': '配置简单',
                            'Get Started': '开始使用',
                            'Get up and running in seconds': '只需几行命令，快来体验吧',
                            'Import third-party themes or plugins through URL': '通过 URL 引入第三方主题或插件',
                            'Install pagic': '安装 pagic',
                            'Intuitive design': '符合直觉的设计',
                            'Official themes default/docs/blog with dark mode': '内置 default, docs, blog 等主题，支持黑暗模式',
                            'Pre-render to static HTML, run as an SPA once loaded': '预渲染生成静态 HTML，加载后作为 SPA 运行',
                            'Render <1>md/tsx</1> to static HTML page': '支持将 <1>md/tsx</1> 文件渲染成静态页面',
                            'Run pagic': '运行 pagic',
                            'Single config file': '一个配置文件',
                            'Support React Hooks': '支持 React Hooks',
                            'Support md and tsx': '支持 md 和 tsx',
                            'Themes and plugins': '主题和插件'
                        }
                    }
                }
            },
            include: undefined,
            nav: [
                {
                    link: '/docs/introduction.html',
                    text: 'Docs'
                },
                {
                    link: '/themes/',
                    text: 'Themes'
                },
                {
                    link: '/plugins/',
                    text: 'Plugins'
                },
                {
                    link: '/news/',
                    text: 'News'
                },
                {
                    link: '/about/',
                    text: 'About'
                }
            ],
            outDir: 'dist',
            plugins: [
                'clean',
                'init',
                'md',
                'tsx',
                'script',
                'layout',
                'out',
                'sidebar',
                'prev_next',
                'i18n'
            ],
            port: 8000,
            root: '/',
            serve: false,
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
            srcDir: 'site',
            theme: 'docs',
            title: 'Pagic',
            watch: false
        }, content: null, head: React.createElement(React.Fragment, null,
            React.createElement("script", { src: "/i18n.js", type: "module" })), language: {
            code: 'en',
            name: 'English',
            path: ''
        }, layoutPath: "_layout.tsx", outputPath: "hello.html", pagePath: "hello.tsx", script: null, title: "", toc: null }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "/i18n.js", type: "module" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': null,
    'language': {
        "code": "en",
        "name": "English",
        "path": ""
    }
};
