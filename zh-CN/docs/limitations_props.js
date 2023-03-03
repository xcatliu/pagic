import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
var _a, _b;
export default {
    'prev': {
        "text": "示例网站",
        "link": "zh-CN/docs/demos.html"
    },
    'next': undefined,
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['zh-CN'], branch: 'master' },
    'pagePath': "zh-CN/docs/limitations.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "zh-CN/docs/limitations.html",
    'title': "局限性",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>局限性</h1>\n<p>Pagic 很优秀，但也有一些缺陷。</p>\n<p>由于 Pagic 构建的网站使用到了一些最新的 JavaScript 和 CSS 特性，所以必须使用现代浏览器（Chrome, Firefox, Safari, Edge 等）访问网站才能拥有完整的体验，如果你的目标用户使用的是 IE 浏览器，那么不建议使用 Pagic 来构建网站。</p>\n<p>Pagic 使用到的最新特性包括：</p>\n<ul>\n<li>通过 <code>&lt;script type=&quot;module&quot;&gt;</code> 加载 esm 模块（<a href="https://caniuse.com/#feat=es6-module">浏览器支持性</a>）</li>\n<li>通过 <code>import()</code> 动态加载 esm 模块（<a href="https://caniuse.com/#feat=es6-module-dynamic-import">浏览器支持性</a>）</li>\n<li><code>import</code>, <code>export</code>, <code>export default</code> 等 esm 语法（<a href="https://caniuse.com/#feat=mdn-javascript_statements_import">浏览器支持性</a>）</li>\n<li><code>async</code> 函数（<a href="https://caniuse.com/#feat=async-functions">浏览器兼容性</a>）</li>\n<li>常用的 ES6 语法，包括 <code>let</code>, <code>const</code>, <code>() =&gt; {}</code> 等</li>\n<li>CSS Variables（<a href="https://caniuse.com/#feat=css-variables">浏览器兼容性</a>）</li>\n<li>CSS <code>calc()</code>（<a href="https://caniuse.com/#feat=calc">浏览器兼容性</a>）</li>\n<li>CSS flexbox（<a href="https://caniuse.com/#feat=flexbox">浏览器兼容性</a>）</li>\n</ul>\n<h2 id="%E5%85%B6%E4%BB%96%E7%AB%A0%E8%8A%82%E4%B8%AD%E6%8F%90%E5%88%B0%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7">其他章节中提到的局限性<a class="anchor" href="#%E5%85%B6%E4%BB%96%E7%AB%A0%E8%8A%82%E4%B8%AD%E6%8F%90%E5%88%B0%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7">§</a></h2>\n<ul>\n<li><a href="./content.html#%E5%B1%80%E9%99%90%E6%80%A7">页面内容#局限性</a></li>\n<li><a href="./content.html#%E5%B1%80%E9%99%90%E6%80%A7-2">页面内容#局限性-2</a></li>\n</ul>'
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
        "code": "zh-CN",
        "name": "简体中文",
        "root": "/zh-CN/"
    },
    'contentTitle': React.createElement("h1", { key: "0" }, "\u5C40\u9650\u6027"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>Pagic 很优秀，但也有一些缺陷。</p>\n<p>由于 Pagic 构建的网站使用到了一些最新的 JavaScript 和 CSS 特性，所以必须使用现代浏览器（Chrome, Firefox, Safari, Edge 等）访问网站才能拥有完整的体验，如果你的目标用户使用的是 IE 浏览器，那么不建议使用 Pagic 来构建网站。</p>\n<p>Pagic 使用到的最新特性包括：</p>\n<ul>\n<li>通过 <code>&lt;script type=&quot;module&quot;&gt;</code> 加载 esm 模块（<a href="https://caniuse.com/#feat=es6-module">浏览器支持性</a>）</li>\n<li>通过 <code>import()</code> 动态加载 esm 模块（<a href="https://caniuse.com/#feat=es6-module-dynamic-import">浏览器支持性</a>）</li>\n<li><code>import</code>, <code>export</code>, <code>export default</code> 等 esm 语法（<a href="https://caniuse.com/#feat=mdn-javascript_statements_import">浏览器支持性</a>）</li>\n<li><code>async</code> 函数（<a href="https://caniuse.com/#feat=async-functions">浏览器兼容性</a>）</li>\n<li>常用的 ES6 语法，包括 <code>let</code>, <code>const</code>, <code>() =&gt; {}</code> 等</li>\n<li>CSS Variables（<a href="https://caniuse.com/#feat=css-variables">浏览器兼容性</a>）</li>\n<li>CSS <code>calc()</code>（<a href="https://caniuse.com/#feat=calc">浏览器兼容性</a>）</li>\n<li>CSS flexbox（<a href="https://caniuse.com/#feat=flexbox">浏览器兼容性</a>）</li>\n</ul>\n<h2 id="%E5%85%B6%E4%BB%96%E7%AB%A0%E8%8A%82%E4%B8%AD%E6%8F%90%E5%88%B0%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7">其他章节中提到的局限性<a class="anchor" href="#%E5%85%B6%E4%BB%96%E7%AB%A0%E8%8A%82%E4%B8%AD%E6%8F%90%E5%88%B0%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7">§</a></h2>\n<ul>\n<li><a href="./content.html#%E5%B1%80%E9%99%90%E6%80%A7">页面内容#局限性</a></li>\n<li><a href="./content.html#%E5%B1%80%E9%99%90%E6%80%A7-2">页面内容#局限性-2</a></li>\n</ul>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%85%B6%E4%BB%96%E7%AB%A0%E8%8A%82%E4%B8%AD%E6%8F%90%E5%88%B0%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7" }, "\u5176\u4ED6\u7AE0\u8282\u4E2D\u63D0\u5230\u7684\u5C40\u9650\u6027")))),
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'date': "2020-08-11T05:59:50.000Z",
    'updated': "2020-10-12T13:36:11.000Z",
    'excerpt': "Pagic 很优秀，但也有一些缺陷。 由于 Pagic 构建的网站使用到了一些最新的 JavaScript 和 CSS 特性，所以必须使用现代浏览器（Chrome, Firefox, Safari, Edge 等）访问网站才能拥有完整的体验，如果你的目标用户使用的是 IE 浏...",
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
