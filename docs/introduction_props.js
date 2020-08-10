import projectConfig from '/pagic.config.js';
export default {
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
            "text": "布局",
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
        }
    ],
    config: { "root": "/", ...projectConfig },
    'pagePath': "docs/introduction.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/introduction.html",
    'title': "介绍",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>介绍</h1>\n<p>Pagic 是一个由 Deno + React 驱动的静态网站生成器。</p>\n<h2 id="%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E6%98%AF...%EF%BC%9F">为什么不是...？<a class="anchor" href="#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E6%98%AF...%EF%BC%9F">§</a></h2>\n<h3 id="hexo">Hexo<a class="anchor" href="#hexo">§</a></h3>\n<h3 id="vuepress">VuePress<a class="anchor" href="#vuepress">§</a></h3>\n<h3 id="jekyll">Jekyll<a class="anchor" href="#jekyll">§</a></h3>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E6%98%AF...%EF%BC%9F">为什么不是...？</a><ol><li><a href="#hexo">Hexo</a></li><li><a href="#vuepress">VuePress</a></li><li><a href="#jekyll">Jekyll</a></li></ol></li></ol></nav>'
        } })
};
