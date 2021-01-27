import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
var _a, _b;
export default {
    'prev': {
        "text": "Blog",
        "link": "docs/blog.html"
    },
    'next': {
        "text": "Deployment",
        "link": "docs/deployment.html"
    },
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['en'], branch: 'master' },
    'pagePath': "docs/i18n.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/i18n.html",
    'title': "Internationalization",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Internationalization</h1>\n<blockquote>\n<p>Only support <code>docs</code> theme for now</p>\n</blockquote>\n<h2 id="configuration">Configuration<a class="anchor" href="#configuration">§</a></h2>\n<p>The example is as follows:</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  i18n<span class="token operator">:</span> <span class="token punctuation">{</span>\n    languages<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span> code<span class="token operator">:</span> <span class="token string">\'en\'</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token string">\'English\'</span><span class="token punctuation">,</span> root<span class="token operator">:</span> <span class="token string">\'/\'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span> code<span class="token operator">:</span> <span class="token string">\'zh-CN\'</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token string">\'Simplified Chinese\'</span><span class="token punctuation">,</span> root<span class="token operator">:</span> <span class="token string">\'/zh-CN/\'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    overrides<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token string">\'zh-CN\'</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        sidebar<span class="token operator">:</span> <span class="token punctuation">{</span>\n          <span class="token string">\'/zh-CN/docs/\'</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n            <span class="token string">\'zh-CN/docs/introduction.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/usage.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/config.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/content.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/layout.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/themes.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/plugins.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/blog.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/i18n.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/deployment.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/demos.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/limitations.md\'</span><span class="token punctuation">,</span>\n          <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        blog<span class="token operator">:</span> <span class="token punctuation">{</span>\n          root<span class="token operator">:</span> <span class="token string">\'/zh-CN/blog/\'</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    resources<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token string">\'zh-CN\'</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        translation<span class="token operator">:</span> <span class="token punctuation">{</span>\n          <span class="token string">\'A static site generator powered by Deno + React\'</span><span class="token operator">:</span> <span class="token string">\'Deno + React driven static website generator\'</span><span class="token punctuation">,</span>\n          <span class="token string">\'Get Started\'</span><span class="token operator">:</span> <span class="token string">\'Get Started\'</span><span class="token punctuation">,</span>\n          Demos<span class="token operator">:</span> <span class="token string">\'Sample website\'</span><span class="token punctuation">,</span>\n          <span class="token string">\'Render &lt;1>md/tsx&lt;/1> to static HTML page\'</span><span class="token operator">:</span> <span class="token string">\'Support rendering &lt;1>md/tsx&lt;/1> files into static HTML page\'</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<h3 id="i18nlanguage"><code>i18n.language</code><a class="anchor" href="#i18nlanguage">§</a></h3>\n<p><code>i18n.language</code> represents an array of language lists supported by your website. Each item in the array must match <code>{ code:string, name:string, root:string }</code>, where:</p>\n<ul>\n<li><code>code</code> is the <em>ISO Language Code</em>, you can refer to <a href="http://www.lingoes.net/en/translator/langcode.htm">this website</a></li>\n<li><code>name</code> is the option displayed in the language switch component</li>\n<li><code>root</code> is the root directory where the language is located, and its value should always start and end with a slash</li>\n</ul>\n<p>Note that the first item of <code>i18n.language</code> is the default language of the website, and its <code>root</code> must be <code>/</code>.</p>\n<h3 id="i18noverrides"><code>i18n.overrides</code><a class="anchor" href="#i18noverrides">§</a></h3>\n<p><code>i18n.overrides</code> is a special configuration item, which allows to override the fields in <code>pagic.config.ts</code> in a specific language. Its type is <code>Record&lt;string, PagicConfig&gt;</code>, where the key must be one of the <code>code</code> field in <code>i18n.language</code>, the value type is the type of the entire <code>pagic.config.ts</code>. When visiting a page in this language, <code>pagic.config</code> will be the result of the merge.</p>\n<h3 id="i18nresources"><code>i18n.resources</code><a class="anchor" href="#i18nresources">§</a></h3>\n<p><code>i18n.resources</code> describes the translation of each language, <code>t(\'Get Started\')</code> and <code>&lt;Trans&gt;Render &lt;code&gt;md/tsx&lt;/code&gt; to static HTML page&lt;/ Trans&gt;</code> in <code>tsx</code> file will use the translation resources configured here. For the specific syntax of <code>t()</code> and <code>&lt;Trans&gt;</code>, please refer to <a href="https://react.i18next.com/getting-started#simple-content">react-i18next</a>.</p>\n<h2 id="props"><code>props</code><a class="anchor" href="#props">§</a></h2>\n<p>The <code>i18n</code> plugin will add the following items to the <code>props</code> of the page:</p>\n<h3 id="language"><code>language</code><a class="anchor" href="#language">§</a></h3>\n<p><code>language</code> represents the language of the current page. It is taken from one of the items in <code>i18n.languages</code> in <code>pagic.config.ts</code>, so its type is as follows:</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">interface</span> <span class="token class-name">Language</span> <span class="token punctuation">{</span>\n  code<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n  root<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>'
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
    'contentTitle': React.createElement("h1", { key: "0" }, "Internationalization"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<blockquote>\n<p>Only support <code>docs</code> theme for now</p>\n</blockquote>\n<h2 id="configuration">Configuration<a class="anchor" href="#configuration">§</a></h2>\n<p>The example is as follows:</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  i18n<span class="token operator">:</span> <span class="token punctuation">{</span>\n    languages<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span> code<span class="token operator">:</span> <span class="token string">\'en\'</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token string">\'English\'</span><span class="token punctuation">,</span> root<span class="token operator">:</span> <span class="token string">\'/\'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span> code<span class="token operator">:</span> <span class="token string">\'zh-CN\'</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token string">\'Simplified Chinese\'</span><span class="token punctuation">,</span> root<span class="token operator">:</span> <span class="token string">\'/zh-CN/\'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    overrides<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token string">\'zh-CN\'</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        sidebar<span class="token operator">:</span> <span class="token punctuation">{</span>\n          <span class="token string">\'/zh-CN/docs/\'</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n            <span class="token string">\'zh-CN/docs/introduction.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/usage.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/config.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/content.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/layout.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/themes.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/plugins.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/blog.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/i18n.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/deployment.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/demos.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/limitations.md\'</span><span class="token punctuation">,</span>\n          <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        blog<span class="token operator">:</span> <span class="token punctuation">{</span>\n          root<span class="token operator">:</span> <span class="token string">\'/zh-CN/blog/\'</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    resources<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token string">\'zh-CN\'</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        translation<span class="token operator">:</span> <span class="token punctuation">{</span>\n          <span class="token string">\'A static site generator powered by Deno + React\'</span><span class="token operator">:</span> <span class="token string">\'Deno + React driven static website generator\'</span><span class="token punctuation">,</span>\n          <span class="token string">\'Get Started\'</span><span class="token operator">:</span> <span class="token string">\'Get Started\'</span><span class="token punctuation">,</span>\n          Demos<span class="token operator">:</span> <span class="token string">\'Sample website\'</span><span class="token punctuation">,</span>\n          <span class="token string">\'Render &lt;1>md/tsx&lt;/1> to static HTML page\'</span><span class="token operator">:</span> <span class="token string">\'Support rendering &lt;1>md/tsx&lt;/1> files into static HTML page\'</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<h3 id="i18nlanguage"><code>i18n.language</code><a class="anchor" href="#i18nlanguage">§</a></h3>\n<p><code>i18n.language</code> represents an array of language lists supported by your website. Each item in the array must match <code>{ code:string, name:string, root:string }</code>, where:</p>\n<ul>\n<li><code>code</code> is the <em>ISO Language Code</em>, you can refer to <a href="http://www.lingoes.net/en/translator/langcode.htm">this website</a></li>\n<li><code>name</code> is the option displayed in the language switch component</li>\n<li><code>root</code> is the root directory where the language is located, and its value should always start and end with a slash</li>\n</ul>\n<p>Note that the first item of <code>i18n.language</code> is the default language of the website, and its <code>root</code> must be <code>/</code>.</p>\n<h3 id="i18noverrides"><code>i18n.overrides</code><a class="anchor" href="#i18noverrides">§</a></h3>\n<p><code>i18n.overrides</code> is a special configuration item, which allows to override the fields in <code>pagic.config.ts</code> in a specific language. Its type is <code>Record&lt;string, PagicConfig&gt;</code>, where the key must be one of the <code>code</code> field in <code>i18n.language</code>, the value type is the type of the entire <code>pagic.config.ts</code>. When visiting a page in this language, <code>pagic.config</code> will be the result of the merge.</p>\n<h3 id="i18nresources"><code>i18n.resources</code><a class="anchor" href="#i18nresources">§</a></h3>\n<p><code>i18n.resources</code> describes the translation of each language, <code>t(\'Get Started\')</code> and <code>&lt;Trans&gt;Render &lt;code&gt;md/tsx&lt;/code&gt; to static HTML page&lt;/ Trans&gt;</code> in <code>tsx</code> file will use the translation resources configured here. For the specific syntax of <code>t()</code> and <code>&lt;Trans&gt;</code>, please refer to <a href="https://react.i18next.com/getting-started#simple-content">react-i18next</a>.</p>\n<h2 id="props"><code>props</code><a class="anchor" href="#props">§</a></h2>\n<p>The <code>i18n</code> plugin will add the following items to the <code>props</code> of the page:</p>\n<h3 id="language"><code>language</code><a class="anchor" href="#language">§</a></h3>\n<p><code>language</code> represents the language of the current page. It is taken from one of the items in <code>i18n.languages</code> in <code>pagic.config.ts</code>, so its type is as follows:</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">interface</span> <span class="token class-name">Language</span> <span class="token punctuation">{</span>\n  code<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n  root<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#configuration" }, "Configuration"),
                React.createElement("ol", null,
                    React.createElement("li", null,
                        React.createElement("a", { href: "#i18nlanguage" }, "i18n.language")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#i18noverrides" }, "i18n.overrides")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#i18nresources" }, "i18n.resources")))),
            React.createElement("li", null,
                React.createElement("a", { href: "#props" }, "props"),
                React.createElement("ol", null,
                    React.createElement("li", null,
                        React.createElement("a", { href: "#language" }, "language")))))),
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'date': "2020-10-31T14:04:46.000Z",
    'updated': "2020-12-05T13:42:50.000Z",
    'excerpt': "Configuration The example is as follows: export default { i18n: { languages: [ { code: 'en', name: 'English', root: '/' }, { code: 'zh-CN', name: 'Simplified Chinese', root: '/zh-CN/' }, ], overrides: { 'zh-CN'...",
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
