import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
var _a, _b;
export default {
    'prev': {
        "text": "Deployment",
        "link": "docs/deployment.html"
    },
    'next': {
        "text": "Limitations",
        "link": "docs/limitations.html"
    },
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['en'], branch: 'master' },
    'pagePath': "docs/demos.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/demos.html",
    'title': "Demos",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Demos</h1>\n<ul>\n<li>Templates: <a href="https://github.com/xcatliu/pagic_template_docs">docs</a></li>\n<li><a href="https://ts.xcatliu.com/">TypeScript 入门教程</a> (<a href="https://github.com/xcatliu/typescript-tutorial/">GitHub</a>)</li>\n<li><a href="https://blog.xcatliu.com/">Xcatliu\'s Blog</a> (<a href="https://github.com/xcatliu/blog">GitHub</a>)</li>\n<li><a href="https://yoshixmk.github.io/deno-x-ranking/">Deno X ranking</a> (<a href="https://github.com/yoshixmk/deno-x-ranking">GitHub</a>)</li>\n<li><a href="https://deno-tutorial.js.org/">Deno 钻研之术</a> (<a href="https://github.com/hylerrix/deno-tutorial">GitHub</a>)</li>\n<li><a href="https://manual.deno.js.cn/">Deno 中文手册</a> (<a href="https://github.com/denocn/deno_manual">GitHub</a>)</li>\n<li><a href="https://cn.history.js.org/">JavaScript 20 年</a> (<a href="https://github.com/doodlewind/jshistory-cn">GitHub</a>)</li>\n<li><a href="https://es-interview.js.org/">ECMAScript+ 面试宝典</a> (<a href="https://github.com/hylerrix/es-interview">GitHub</a>)</li>\n<li><a href="https://blitzjs-tutorial.js.org/">Blitz.js + React 全栈开发手册</a> (<a href="https://github.com/hylerrix/blitzjs-tutorial">GitHub</a>)</li>\n<li><a href="https://blog.shenfq.com/">自然醒的博客</a>（<a href="https://github.com/Shenfq/blog">GitHub</a>）</li>\n<li><a href="https://docs.itdongdong.com/">Viktor\'s Docs</a>（<a href="https://github.com/ViktorWong/my-docs">GitHub</a>）</li>\n<li><a href="https://blog.0xzhang.com/">0xzhang 的博客</a>（<a href="https://github.com/0xzhang">GitHub</a>）</li>\n<li><a href="https://github.com/xcatliu/pagic/issues/new?assignees=xcatliu&amp;labels=demo&amp;template=add-a-demo.md&amp;title=Add+my+site+as+a+demo+https%3A%2F%2Fexample.com">Add my site as a demo</a> 😝</li>\n</ul>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "UA-45256157-16" }),
        React.createElement(React.Fragment, { key: ".1" },
            React.createElement(React.Fragment, { key: ".0" },
                React.createElement("script", { src: "/i18n.js", type: "module" })),
            React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" }))),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@18.2.0/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@18.2.0/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'language': {
        "code": "en",
        "name": "English",
        "root": "/"
    },
    'contentTitle': React.createElement("h1", { key: "0" }, "Demos"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<ul>\n<li>Templates: <a href="https://github.com/xcatliu/pagic_template_docs">docs</a></li>\n<li><a href="https://ts.xcatliu.com/">TypeScript 入门教程</a> (<a href="https://github.com/xcatliu/typescript-tutorial/">GitHub</a>)</li>\n<li><a href="https://blog.xcatliu.com/">Xcatliu\'s Blog</a> (<a href="https://github.com/xcatliu/blog">GitHub</a>)</li>\n<li><a href="https://yoshixmk.github.io/deno-x-ranking/">Deno X ranking</a> (<a href="https://github.com/yoshixmk/deno-x-ranking">GitHub</a>)</li>\n<li><a href="https://deno-tutorial.js.org/">Deno 钻研之术</a> (<a href="https://github.com/hylerrix/deno-tutorial">GitHub</a>)</li>\n<li><a href="https://manual.deno.js.cn/">Deno 中文手册</a> (<a href="https://github.com/denocn/deno_manual">GitHub</a>)</li>\n<li><a href="https://cn.history.js.org/">JavaScript 20 年</a> (<a href="https://github.com/doodlewind/jshistory-cn">GitHub</a>)</li>\n<li><a href="https://es-interview.js.org/">ECMAScript+ 面试宝典</a> (<a href="https://github.com/hylerrix/es-interview">GitHub</a>)</li>\n<li><a href="https://blitzjs-tutorial.js.org/">Blitz.js + React 全栈开发手册</a> (<a href="https://github.com/hylerrix/blitzjs-tutorial">GitHub</a>)</li>\n<li><a href="https://blog.shenfq.com/">自然醒的博客</a>（<a href="https://github.com/Shenfq/blog">GitHub</a>）</li>\n<li><a href="https://docs.itdongdong.com/">Viktor\'s Docs</a>（<a href="https://github.com/ViktorWong/my-docs">GitHub</a>）</li>\n<li><a href="https://blog.0xzhang.com/">0xzhang 的博客</a>（<a href="https://github.com/0xzhang">GitHub</a>）</li>\n<li><a href="https://github.com/xcatliu/pagic/issues/new?assignees=xcatliu&amp;labels=demo&amp;template=add-a-demo.md&amp;title=Add+my+site+as+a+demo+https%3A%2F%2Fexample.com">Add my site as a demo</a> 😝</li>\n</ul>'
        } }),
    'toc': null,
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'date': "2020-07-19T14:12:09.000Z",
    'updated': "2021-10-14T03:42:57.000Z",
    'excerpt': " - Templates: docs - TypeScript 入门教程 (GitHub) - Xcatliu's Blog (GitHub) - Deno X ranking (GitHub) - Deno 钻研之术 (GitHub) - Deno 中文手册 (GitHub) - JavaScript 20 年 (GitHub) - ECMAScript+ 面试宝典 (GitHub...",
    'cover': undefined,
    'blog': {
        "isPost": false,
        "posts": [
            {
                "pagePath": "blog/design_pagic_config_ts.md",
                "title": "Design pagic.config.ts",
                "link": "blog/design_pagic_config_ts.html",
                "date": "2020-07-12T00:00:00.000Z",
                "updated": "2020-12-05T13:42:50.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "excerpt": "As a senior blogger, I am passionate about to develop blog systems and have written many blog themes. Finally, I couldn't be satisfied with writing themes, and I started writing a blog system. Or in a more gene..."
            }
        ],
        "categories": [],
        "tags": []
    },
    'sidebar': [
        {
            "text": "Introduction",
            "link": "docs/introduction.html",
            "pagePath": "docs/introduction.md"
        },
        {
            "text": "Usage",
            "link": "docs/usage.html",
            "pagePath": "docs/usage.md"
        },
        {
            "text": "Config",
            "link": "docs/config.html",
            "pagePath": "docs/config.md"
        },
        {
            "text": "Content",
            "link": "docs/content.html",
            "pagePath": "docs/content.md"
        },
        {
            "text": "_layout.tsx",
            "link": "docs/layout.html",
            "pagePath": "docs/layout.md"
        },
        {
            "text": "Themes",
            "link": "docs/themes.html",
            "pagePath": "docs/themes.md"
        },
        {
            "text": "Plugins",
            "link": "docs/plugins.html",
            "pagePath": "docs/plugins.md"
        },
        {
            "text": "Blog",
            "link": "docs/blog.html",
            "pagePath": "docs/blog.md"
        },
        {
            "text": "Internationalization",
            "link": "docs/i18n.html",
            "pagePath": "docs/i18n.md"
        },
        {
            "text": "Deployment",
            "link": "docs/deployment.html",
            "pagePath": "docs/deployment.md"
        },
        {
            "text": "Demos",
            "link": "docs/demos.html",
            "pagePath": "docs/demos.md"
        },
        {
            "text": "Limitations",
            "link": "docs/limitations.html",
            "pagePath": "docs/limitations.md"
        }
    ]
};
