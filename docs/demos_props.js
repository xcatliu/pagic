import projectConfig from '/pagic.config.js';
var _a, _b;
export default {
    'prev': {
        "title": "Deployment",
        "link": "docs/deployment.html"
    },
    'next': {
        "title": "Limitations",
        "link": "docs/limitations.html"
    },
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['en'] },
    'pagePath': "docs/demos.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/demos.html",
    'title': "Demos",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Demos</h1>\n<ul>\n<li><a href="https://yoshixmk.github.io/deno-x-ranking/">Deno X ranking</a> (<a href="https://github.com/yoshixmk/deno-x-ranking">GitHub</a>)</li>\n<li><a href="https://ts.xcatliu.com/">TypeScript 入门教程</a> (<a href="https://github.com/xcatliu/typescript-tutorial/">GitHub</a>)</li>\n<li><a href="https://deno-tutorial.js.org/">Deno 钻研之术</a> (<a href="https://github.com/hylerrix/deno-tutorial">GitHub</a>)</li>\n<li><a href="https://manual.deno.js.cn/">Deno 中文手册</a> (<a href="https://github.com/denocn/deno_manual">GitHub</a>)</li>\n<li><a href="https://cn.history.js.org/">JavaScript 20 年</a> (<a href="https://github.com/doodlewind/jshistory-cn">GitHub</a>)</li>\n<li><a href="https://es-interview.js.org/">ECMAScript+ 面试宝典</a> (<a href="https://github.com/hylerrix/es-interview">GitHub</a>)</li>\n<li><a href="https://github.com/xcatliu/pagic/issues/new?assignees=xcatliu&amp;labels=demo&amp;template=add-a-demo.md&amp;title=Add+my+site+as+a+demo+https%3A%2F%2Fexample.com">Add my site as a demo</a> 😝</li>\n</ul>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "/i18n.js", type: "module" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'language': {
        "code": "en",
        "name": "English",
        "path": ""
    },
    'contentTitle': React.createElement("h1", { key: "0" }, "Demos"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<ul>\n<li><a href="https://yoshixmk.github.io/deno-x-ranking/">Deno X ranking</a> (<a href="https://github.com/yoshixmk/deno-x-ranking">GitHub</a>)</li>\n<li><a href="https://ts.xcatliu.com/">TypeScript 入门教程</a> (<a href="https://github.com/xcatliu/typescript-tutorial/">GitHub</a>)</li>\n<li><a href="https://deno-tutorial.js.org/">Deno 钻研之术</a> (<a href="https://github.com/hylerrix/deno-tutorial">GitHub</a>)</li>\n<li><a href="https://manual.deno.js.cn/">Deno 中文手册</a> (<a href="https://github.com/denocn/deno_manual">GitHub</a>)</li>\n<li><a href="https://cn.history.js.org/">JavaScript 20 年</a> (<a href="https://github.com/doodlewind/jshistory-cn">GitHub</a>)</li>\n<li><a href="https://es-interview.js.org/">ECMAScript+ 面试宝典</a> (<a href="https://github.com/hylerrix/es-interview">GitHub</a>)</li>\n<li><a href="https://github.com/xcatliu/pagic/issues/new?assignees=xcatliu&amp;labels=demo&amp;template=add-a-demo.md&amp;title=Add+my+site+as+a+demo+https%3A%2F%2Fexample.com">Add my site as a demo</a> 😝</li>\n</ul>'
        } }),
    'contentHasKatex': false,
    'toc': null,
    'date': "2020-10-12T13:36:11.000Z",
    'updated': null,
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'blog': {
        "isPost": false,
        "isPosts": false,
        "posts": [
            {
                "pagePath": "blog/design_pagic_config_ts.md",
                "title": "Design pagic.config.ts",
                "link": "blog/design_pagic_config_ts.html",
                "date": "2020-07-12T00:00:00.000Z",
                "updated": null
            }
        ]
    },
    'sidebar': [
        {
            "title": "Introduction",
            "link": "docs/introduction.html",
            "pagePath": "docs/introduction.md"
        },
        {
            "title": "Usage",
            "link": "docs/usage.html",
            "pagePath": "docs/usage.md"
        },
        {
            "title": "Config",
            "link": "docs/config.html",
            "pagePath": "docs/config.md"
        },
        {
            "title": "Content",
            "link": "docs/content.html",
            "pagePath": "docs/content.md"
        },
        {
            "title": "_layout.tsx",
            "link": "docs/layout.html",
            "pagePath": "docs/layout.md"
        },
        {
            "title": "Themes",
            "link": "docs/themes.html",
            "pagePath": "docs/themes.md"
        },
        {
            "title": "Plugins",
            "link": "docs/plugins.html",
            "pagePath": "docs/plugins.md"
        },
        {
            "title": "Deployment",
            "link": "docs/deployment.html",
            "pagePath": "docs/deployment.md"
        },
        {
            "title": "Demos",
            "link": "docs/demos.html",
            "pagePath": "docs/demos.md"
        },
        {
            "title": "Limitations",
            "link": "docs/limitations.html",
            "pagePath": "docs/limitations.md"
        }
    ]
};
