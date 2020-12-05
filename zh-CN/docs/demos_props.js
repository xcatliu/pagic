import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
var _a, _b;
export default {
    'prev': {
        "text": "部署",
        "link": "zh-CN/docs/deployment.html"
    },
    'next': {
        "text": "局限性",
        "link": "zh-CN/docs/limitations.html"
    },
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['zh-CN'] },
    'pagePath': "zh-CN/docs/demos.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "zh-CN/docs/demos.html",
    'title': "示例网站",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>示例网站</h1>\n<ul>\n<li><a href="https://ts.xcatliu.com/">TypeScript 入门教程</a> (<a href="https://github.com/xcatliu/typescript-tutorial/">GitHub</a>)</li>\n<li><a href="https://blog.xcatliu.com/">流浪小猫的博客</a> (<a href="https://github.com/xcatliu/blog">GitHub</a>)</li>\n<li><a href="https://yoshixmk.github.io/deno-x-ranking/">Deno X ranking</a> (<a href="https://github.com/yoshixmk/deno-x-ranking">GitHub</a>)</li>\n<li><a href="https://deno-tutorial.js.org/">Deno 钻研之术</a> (<a href="https://github.com/hylerrix/deno-tutorial">GitHub</a>)</li>\n<li><a href="https://manual.deno.js.cn/">Deno 中文手册</a> (<a href="https://github.com/denocn/deno_manual">GitHub</a>)</li>\n<li><a href="https://cn.history.js.org/">JavaScript 20 年</a> (<a href="https://github.com/doodlewind/jshistory-cn">GitHub</a>)</li>\n<li><a href="https://es-interview.js.org/">ECMAScript+ 面试宝典</a> (<a href="https://github.com/hylerrix/es-interview">GitHub</a>)</li>\n<li><a href="https://github.com/xcatliu/pagic/issues/new?assignees=xcatliu&amp;labels=demo&amp;template=add-a-demo.md&amp;title=Add+my+site+as+a+demo+https%3A%2F%2Fexample.com">Add my site as a demo</a> 😝</li>\n</ul>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "UA-45256157-16" }),
        React.createElement(React.Fragment, { key: ".1" },
            React.createElement(React.Fragment, { key: ".0" },
                React.createElement("script", { src: "/i18n.js", type: "module" })),
            React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" }))),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'language': {
        "code": "zh-CN",
        "name": "简体中文",
        "root": "/zh-CN/"
    },
    'contentTitle': React.createElement("h1", { key: "0" }, "\u793A\u4F8B\u7F51\u7AD9"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<ul>\n<li><a href="https://ts.xcatliu.com/">TypeScript 入门教程</a> (<a href="https://github.com/xcatliu/typescript-tutorial/">GitHub</a>)</li>\n<li><a href="https://blog.xcatliu.com/">流浪小猫的博客</a> (<a href="https://github.com/xcatliu/blog">GitHub</a>)</li>\n<li><a href="https://yoshixmk.github.io/deno-x-ranking/">Deno X ranking</a> (<a href="https://github.com/yoshixmk/deno-x-ranking">GitHub</a>)</li>\n<li><a href="https://deno-tutorial.js.org/">Deno 钻研之术</a> (<a href="https://github.com/hylerrix/deno-tutorial">GitHub</a>)</li>\n<li><a href="https://manual.deno.js.cn/">Deno 中文手册</a> (<a href="https://github.com/denocn/deno_manual">GitHub</a>)</li>\n<li><a href="https://cn.history.js.org/">JavaScript 20 年</a> (<a href="https://github.com/doodlewind/jshistory-cn">GitHub</a>)</li>\n<li><a href="https://es-interview.js.org/">ECMAScript+ 面试宝典</a> (<a href="https://github.com/hylerrix/es-interview">GitHub</a>)</li>\n<li><a href="https://github.com/xcatliu/pagic/issues/new?assignees=xcatliu&amp;labels=demo&amp;template=add-a-demo.md&amp;title=Add+my+site+as+a+demo+https%3A%2F%2Fexample.com">Add my site as a demo</a> 😝</li>\n</ul>'
        } }),
    'toc': null,
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'date': "2020-07-19T14:12:09.000Z",
    'updated': "2020-12-05T13:42:50.000Z",
    'excerpt': " - TypeScript 入门教程 (GitHub) - 流浪小猫的博客 (GitHub) - Deno X ranking (GitHub) - Deno 钻研之术 (GitHub) - Deno 中文手册 (GitHub) - JavaScript 20 年 (GitHub) - ECMAScript+ 面试宝典 (GitHub) - Add my site as...",
    'cover': undefined,
    'blog': {
        "isPost": false,
        "posts": [
            {
                "pagePath": "zh-CN/blog/design_pagic_config_ts.md",
                "title": "设计 pagic.config.ts",
                "link": "zh-CN/blog/design_pagic_config_ts.html",
                "date": "2020-07-12T00:00:00.000Z",
                "updated": "2020-12-05T13:42:50.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "excerpt": "作为一名资深博客爱好者，我热衷于折腾各种博客系统，写过多个博客主题。 终于，写主题也无法得到满足，我开始写博客系统了。 或者说是更广义的，静态网站生成器。 如今 Pagic 已经完成了一个雏形，我也邀请了一些朋友试用，经..."
            }
        ],
        "categories": [],
        "tags": []
    },
    'sidebar': [
        {
            "text": "介绍",
            "link": "zh-CN/docs/introduction.html",
            "pagePath": "zh-CN/docs/introduction.md"
        },
        {
            "text": "基本用法",
            "link": "zh-CN/docs/usage.html",
            "pagePath": "zh-CN/docs/usage.md"
        },
        {
            "text": "配置文件",
            "link": "zh-CN/docs/config.html",
            "pagePath": "zh-CN/docs/config.md"
        },
        {
            "text": "页面内容",
            "link": "zh-CN/docs/content.html",
            "pagePath": "zh-CN/docs/content.md"
        },
        {
            "text": "_layout.tsx",
            "link": "zh-CN/docs/layout.html",
            "pagePath": "zh-CN/docs/layout.md"
        },
        {
            "text": "主题",
            "link": "zh-CN/docs/themes.html",
            "pagePath": "zh-CN/docs/themes.md"
        },
        {
            "text": "插件",
            "link": "zh-CN/docs/plugins.html",
            "pagePath": "zh-CN/docs/plugins.md"
        },
        {
            "text": "博客",
            "link": "zh-CN/docs/blog.html",
            "pagePath": "zh-CN/docs/blog.md"
        },
        {
            "text": "国际化",
            "link": "zh-CN/docs/i18n.html",
            "pagePath": "zh-CN/docs/i18n.md"
        },
        {
            "text": "部署",
            "link": "zh-CN/docs/deployment.html",
            "pagePath": "zh-CN/docs/deployment.md"
        },
        {
            "text": "示例网站",
            "link": "zh-CN/docs/demos.html",
            "pagePath": "zh-CN/docs/demos.md"
        },
        {
            "text": "局限性",
            "link": "zh-CN/docs/limitations.html",
            "pagePath": "zh-CN/docs/limitations.md"
        }
    ]
};
