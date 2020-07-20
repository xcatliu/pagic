export default {
    srcDir: 'site',
    theme: 'docs',
    plugins: [],
    title: 'Pagic',
    description: 'The easiest way to generate static html page from markdown, built with Deno! 🦕',
    github: 'https://github.com/xcatliu/pagic',
    head: (React.createElement(React.Fragment, null,
        React.createElement("script", { src: "/assets/vconsole.min.js" }),
        React.createElement("script", { dangerouslySetInnerHTML: { __html: 'var vConsole = new VConsole();' } }))),
    nav: [
        {
            text: '文档',
            link: '/docs/'
        },
        {
            text: '新闻',
            link: '/news/'
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
            text: '关于',
            link: '/about/'
        },
        {
            text: '示例',
            link: '/demos/',
            align: 'right'
        }
    ]
};
