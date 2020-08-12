import projectConfig from '/pagic.config.js';
export default {
    'prev': {
        "text": "部署",
        "link": "docs/deployment.html"
    },
    'next': {
        "text": "局限性",
        "link": "docs/limitations.html"
    },
    'sidebar': [
        {
            "text": "介绍",
            "link": "docs/introduction.html",
            "pagePath": "docs/introduction.md"
        },
        {
            "text": "基本用法",
            "link": "docs/usage.html",
            "pagePath": "docs/usage.md"
        },
        {
            "text": "配置文件",
            "link": "docs/config.html",
            "pagePath": "docs/config.md"
        },
        {
            "text": "页面内容",
            "link": "docs/content.html",
            "pagePath": "docs/content.md"
        },
        {
            "text": "_layout.tsx",
            "link": "docs/layout.html",
            "pagePath": "docs/layout.md"
        },
        {
            "text": "主题",
            "link": "docs/themes.html",
            "pagePath": "docs/themes.md"
        },
        {
            "text": "插件",
            "link": "docs/plugins.html",
            "pagePath": "docs/plugins.md"
        },
        {
            "text": "部署",
            "link": "docs/deployment.html",
            "pagePath": "docs/deployment.md"
        },
        {
            "text": "示例网站",
            "link": "docs/demos.html",
            "pagePath": "docs/demos.md"
        },
        {
            "text": "局限性",
            "link": "docs/limitations.html",
            "pagePath": "docs/limitations.md"
        }
    ],
    config: { "root": "/", ...projectConfig },
    'pagePath': "docs/demos.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/demos.html",
    'title': "示例网站",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>示例网站</h1>\n<ul>\n<li><a href="https://yoshixmk.github.io/deno-x-ranking/">Deno X ranking</a> (<a href="https://github.com/yoshixmk/deno-x-ranking">GitHub</a>)</li>\n<li><a href="https://ts.xcatliu.com/">TypeScript 入门教程</a> (<a href="https://github.com/xcatliu/typescript-tutorial/">GitHub</a>)</li>\n<li><a href="https://deno-tutorial.js.org/">Deno 钻研之术</a> (<a href="https://github.com/hylerrix/deno-tutorial">GitHub</a>)</li>\n<li><a href="https://manual.deno.js.cn/">Deno 中文手册</a> (<a href="https://github.com/denocn/deno_manual">GitHub</a>)</li>\n<li><a href="https://github.com/xcatliu/pagic/issues/new?assignees=xcatliu&amp;labels=demo&amp;template=add-a-demo.md&amp;title=Add+my+site+as+a+demo+https%3A%2F%2Fexample.com">Add my site as a demo</a> 😝</li>\n</ul>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': null
};
