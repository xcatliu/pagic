import projectConfig from '/pagic.config.js';
export default {
    'prev': {
        "text": "_layout.tsx",
        "link": "docs/layout.html"
    },
    'next': {
        "text": "内容",
        "link": "docs/content.html"
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
            "text": "_layout.tsx",
            "link": "docs/layout.html",
            "pagePath": "docs/layout.md"
        },
        {
            "text": "配置",
            "link": "docs/configuration.html",
            "pagePath": "docs/configuration.md"
        },
        {
            "text": "内容",
            "link": "docs/content.html",
            "pagePath": "docs/content.md"
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
        }
    ],
    config: { "root": "/", ...projectConfig },
    'pagePath': "docs/configuration.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/configuration.html",
    'title': "配置",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>配置</h1>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': null
};
