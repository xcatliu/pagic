import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
var _a, _b;
export default {
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['en'], branch: 'master' },
    'pagePath': "themes/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "themes/index.html",
    'title': "Themes",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Themes</h1>\n<h2 id="official-themes">Official themes<a class="anchor" href="#official-themes">§</a></h2>\n<h3 id="default"><code>default</code><a class="anchor" href="#default">§</a></h3>\n<p>The default theme, demos:</p>\n<ul>\n<li><a href="https://xcatliu.com/">https://xcatliu.com/</a> (<a href="https://github.com/xcatliu/xcatliu/">GitHub</a>)</li>\n</ul>\n<h3 id="docs"><code>docs</code><a class="anchor" href="#docs">§</a></h3>\n<p>The theme used to write documents or e-book, you can create a site with dosc theme by using <a href="https://github.com/xcatliu/pagic_template_docs">this template</a></p>\n<p>Other demos:</p>\n<ul>\n<li>This site itself (<a href="https://github.com/xcatliu/pagic/">GitHub</a>)</li>\n<li><a href="https://ts.xcatliu.com/">TypeScript 入门教程</a> (<a href="https://github.com/xcatliu/typescript-tutorial/">GitHub</a>)</li>\n</ul>\n<h3 id="blog"><code>blog</code><a class="anchor" href="#blog">§</a></h3>\n<p>Official blog theme, demos:</p>\n<ul>\n<li><a href="https://blog.xcatliu.com/">Xcatliu\'s Blog</a> (<a href="https://github.com/xcatliu/blog">GitHub</a>)</li>\n</ul>\n<h2 id="third-party-themes">Third-party themes<a class="anchor" href="#third-party-themes">§</a></h2>\n<p>Stay tuned.</p>'
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
        "code": "en",
        "name": "English",
        "root": "/"
    },
    'contentTitle': React.createElement("h1", { key: "0" }, "Themes"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h2 id="official-themes">Official themes<a class="anchor" href="#official-themes">§</a></h2>\n<h3 id="default"><code>default</code><a class="anchor" href="#default">§</a></h3>\n<p>The default theme, demos:</p>\n<ul>\n<li><a href="https://xcatliu.com/">https://xcatliu.com/</a> (<a href="https://github.com/xcatliu/xcatliu/">GitHub</a>)</li>\n</ul>\n<h3 id="docs"><code>docs</code><a class="anchor" href="#docs">§</a></h3>\n<p>The theme used to write documents or e-book, you can create a site with dosc theme by using <a href="https://github.com/xcatliu/pagic_template_docs">this template</a></p>\n<p>Other demos:</p>\n<ul>\n<li>This site itself (<a href="https://github.com/xcatliu/pagic/">GitHub</a>)</li>\n<li><a href="https://ts.xcatliu.com/">TypeScript 入门教程</a> (<a href="https://github.com/xcatliu/typescript-tutorial/">GitHub</a>)</li>\n</ul>\n<h3 id="blog"><code>blog</code><a class="anchor" href="#blog">§</a></h3>\n<p>Official blog theme, demos:</p>\n<ul>\n<li><a href="https://blog.xcatliu.com/">Xcatliu\'s Blog</a> (<a href="https://github.com/xcatliu/blog">GitHub</a>)</li>\n</ul>\n<h2 id="third-party-themes">Third-party themes<a class="anchor" href="#third-party-themes">§</a></h2>\n<p>Stay tuned.</p>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#official-themes" }, "Official themes"),
                React.createElement("ol", null,
                    React.createElement("li", null,
                        React.createElement("a", { href: "#default" }, "default")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#docs" }, "docs")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#blog" }, "blog")))),
            React.createElement("li", null,
                React.createElement("a", { href: "#third-party-themes" }, "Third-party themes")))),
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'date': "2020-07-19T14:12:09.000Z",
    'updated': "2020-12-14T02:33:12.000Z",
    'excerpt': "Official themes default The default theme, demos: - https://xcatliu.com/ (GitHub) docs The theme used to write documents or e-book, you can create a site with dosc theme by using this template Other demos: - Th...",
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
    }
};
