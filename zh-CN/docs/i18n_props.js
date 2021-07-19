import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
var _a, _b;
export default {
    'prev': {
        "text": "博客",
        "link": "zh-CN/docs/blog.html"
    },
    'next': {
        "text": "部署",
        "link": "zh-CN/docs/deployment.html"
    },
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['zh-CN'], branch: 'master' },
    'pagePath': "zh-CN/docs/i18n.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "zh-CN/docs/i18n.html",
    'title': "国际化",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>国际化</h1>\n<blockquote>\n<p>国际化目前只支持 <code>docs</code> 主题</p>\n</blockquote>\n<h2 id="%E9%85%8D%E7%BD%AE">配置<a class="anchor" href="#%E9%85%8D%E7%BD%AE">§</a></h2>\n<p>示例如下：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  i18n<span class="token operator">:</span> <span class="token punctuation">{</span>\n    languages<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span> code<span class="token operator">:</span> <span class="token string">\'en\'</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token string">\'English\'</span><span class="token punctuation">,</span> root<span class="token operator">:</span> <span class="token string">\'/\'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span> code<span class="token operator">:</span> <span class="token string">\'zh-CN\'</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token string">\'简体中文\'</span><span class="token punctuation">,</span> root<span class="token operator">:</span> <span class="token string">\'/zh-CN/\'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    overrides<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token string">\'zh-CN\'</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        sidebar<span class="token operator">:</span> <span class="token punctuation">{</span>\n          <span class="token string">\'/zh-CN/docs/\'</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n            <span class="token string">\'zh-CN/docs/introduction.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/usage.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/config.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/content.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/layout.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/themes.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/plugins.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/blog.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/i18n.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/deployment.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/demos.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/limitations.md\'</span><span class="token punctuation">,</span>\n          <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        blog<span class="token operator">:</span> <span class="token punctuation">{</span>\n          root<span class="token operator">:</span> <span class="token string">\'/zh-CN/blog/\'</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    resources<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token string">\'zh-CN\'</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        translation<span class="token operator">:</span> <span class="token punctuation">{</span>\n          <span class="token string">\'A static site generator powered by Deno + React\'</span><span class="token operator">:</span> <span class="token string">\'Deno + React 驱动的静态网站生成器\'</span><span class="token punctuation">,</span>\n          <span class="token string">\'Get Started\'</span><span class="token operator">:</span> <span class="token string">\'开始使用\'</span><span class="token punctuation">,</span>\n          Demos<span class="token operator">:</span> <span class="token string">\'示例网站\'</span><span class="token punctuation">,</span>\n          <span class="token string">\'Render &lt;1>md/tsx&lt;/1> to static HTML page\'</span><span class="token operator">:</span> <span class="token string">\'支持将 &lt;1>md/tsx&lt;/1> 文件渲染成静态页面\'</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<h3 id="i18nlanguage"><code>i18n.language</code><a class="anchor" href="#i18nlanguage">§</a></h3>\n<p><code>i18n.language</code> 表示你的网站支持的语言列表数组，数组的每一项都需要符合 <code>{ code:string, name:string, root:string }</code> 的格式，其中：</p>\n<ul>\n<li><code>code</code> 是该语言的 <em>ISO Language Code</em>，可以参考<a href="http://www.lingoes.net/en/translator/langcode.htm">这个网站</a>来设置</li>\n<li><code>name</code> 是该语言展示在语言切换组件中的选项</li>\n<li><code>root</code> 是该语言所在的根目录，它的值应当总是以斜杠开始，并以斜杠结束</li>\n</ul>\n<p>注意，<code>i18n.language</code> 的第一项是网站的默认语言，它的 <code>root</code> 必须是 <code>/</code>。</p>\n<h3 id="i18noverrides"><code>i18n.overrides</code><a class="anchor" href="#i18noverrides">§</a></h3>\n<p><code>i18n.overrides</code> 是一个特殊的配置项，它可以允许特定语言下覆盖 <code>pagic.config.ts</code> 中的字段，它的类型是 <code>Record&lt;string, PagicConfig&gt;</code>，其中键必须是 <code>i18n.language</code> 中的 <code>code</code> 字段，值的类型是整个 <code>pagic.config.ts</code> 的类型。当访问该语言的页面时，读取的 <code>pagic.config</code> 会是合并后的结果。</p>\n<h3 id="i18nresources"><code>i18n.resources</code><a class="anchor" href="#i18nresources">§</a></h3>\n<p><code>i18n.resources</code> 描述了各语言的翻译，<code>tsx</code> 文件中使用的 <code>t(\'Get Started\')</code> 或 <code>&lt;Trans&gt;Render &lt;code&gt;md/tsx&lt;/code&gt; to static HTML page&lt;/Trans&gt;</code> 将会使用这里配置的翻译资源。<code>t()</code> 和 <code>&lt;Trans&gt;</code> 的具体语法请参考 <a href="https://react.i18next.com/getting-started#simple-content">react-i18next</a>。</p>\n<h2 id="props"><code>props</code><a class="anchor" href="#props">§</a></h2>\n<p><code>i18n</code> 插件会给页面的 <code>props</code> 增加以下几项：</p>\n<h3 id="language"><code>language</code><a class="anchor" href="#language">§</a></h3>\n<p><code>language</code> 表示当前页面的语言，它取自 <code>pagic.config.ts</code> 中的 <code>i18n.languages</code> 中的某一项，故它的类型如下：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">interface</span> <span class="token class-name">Language</span> <span class="token punctuation">{</span>\n  code<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n  root<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>'
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
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'language': {
        "code": "zh-CN",
        "name": "简体中文",
        "root": "/zh-CN/"
    },
    'contentTitle': React.createElement("h1", { key: "0" }, "\u56FD\u9645\u5316"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<blockquote>\n<p>国际化目前只支持 <code>docs</code> 主题</p>\n</blockquote>\n<h2 id="%E9%85%8D%E7%BD%AE">配置<a class="anchor" href="#%E9%85%8D%E7%BD%AE">§</a></h2>\n<p>示例如下：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  i18n<span class="token operator">:</span> <span class="token punctuation">{</span>\n    languages<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span> code<span class="token operator">:</span> <span class="token string">\'en\'</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token string">\'English\'</span><span class="token punctuation">,</span> root<span class="token operator">:</span> <span class="token string">\'/\'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span> code<span class="token operator">:</span> <span class="token string">\'zh-CN\'</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token string">\'简体中文\'</span><span class="token punctuation">,</span> root<span class="token operator">:</span> <span class="token string">\'/zh-CN/\'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    overrides<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token string">\'zh-CN\'</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        sidebar<span class="token operator">:</span> <span class="token punctuation">{</span>\n          <span class="token string">\'/zh-CN/docs/\'</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n            <span class="token string">\'zh-CN/docs/introduction.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/usage.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/config.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/content.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/layout.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/themes.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/plugins.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/blog.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/i18n.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/deployment.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/demos.md\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'zh-CN/docs/limitations.md\'</span><span class="token punctuation">,</span>\n          <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        blog<span class="token operator">:</span> <span class="token punctuation">{</span>\n          root<span class="token operator">:</span> <span class="token string">\'/zh-CN/blog/\'</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    resources<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token string">\'zh-CN\'</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        translation<span class="token operator">:</span> <span class="token punctuation">{</span>\n          <span class="token string">\'A static site generator powered by Deno + React\'</span><span class="token operator">:</span> <span class="token string">\'Deno + React 驱动的静态网站生成器\'</span><span class="token punctuation">,</span>\n          <span class="token string">\'Get Started\'</span><span class="token operator">:</span> <span class="token string">\'开始使用\'</span><span class="token punctuation">,</span>\n          Demos<span class="token operator">:</span> <span class="token string">\'示例网站\'</span><span class="token punctuation">,</span>\n          <span class="token string">\'Render &lt;1>md/tsx&lt;/1> to static HTML page\'</span><span class="token operator">:</span> <span class="token string">\'支持将 &lt;1>md/tsx&lt;/1> 文件渲染成静态页面\'</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<h3 id="i18nlanguage"><code>i18n.language</code><a class="anchor" href="#i18nlanguage">§</a></h3>\n<p><code>i18n.language</code> 表示你的网站支持的语言列表数组，数组的每一项都需要符合 <code>{ code:string, name:string, root:string }</code> 的格式，其中：</p>\n<ul>\n<li><code>code</code> 是该语言的 <em>ISO Language Code</em>，可以参考<a href="http://www.lingoes.net/en/translator/langcode.htm">这个网站</a>来设置</li>\n<li><code>name</code> 是该语言展示在语言切换组件中的选项</li>\n<li><code>root</code> 是该语言所在的根目录，它的值应当总是以斜杠开始，并以斜杠结束</li>\n</ul>\n<p>注意，<code>i18n.language</code> 的第一项是网站的默认语言，它的 <code>root</code> 必须是 <code>/</code>。</p>\n<h3 id="i18noverrides"><code>i18n.overrides</code><a class="anchor" href="#i18noverrides">§</a></h3>\n<p><code>i18n.overrides</code> 是一个特殊的配置项，它可以允许特定语言下覆盖 <code>pagic.config.ts</code> 中的字段，它的类型是 <code>Record&lt;string, PagicConfig&gt;</code>，其中键必须是 <code>i18n.language</code> 中的 <code>code</code> 字段，值的类型是整个 <code>pagic.config.ts</code> 的类型。当访问该语言的页面时，读取的 <code>pagic.config</code> 会是合并后的结果。</p>\n<h3 id="i18nresources"><code>i18n.resources</code><a class="anchor" href="#i18nresources">§</a></h3>\n<p><code>i18n.resources</code> 描述了各语言的翻译，<code>tsx</code> 文件中使用的 <code>t(\'Get Started\')</code> 或 <code>&lt;Trans&gt;Render &lt;code&gt;md/tsx&lt;/code&gt; to static HTML page&lt;/Trans&gt;</code> 将会使用这里配置的翻译资源。<code>t()</code> 和 <code>&lt;Trans&gt;</code> 的具体语法请参考 <a href="https://react.i18next.com/getting-started#simple-content">react-i18next</a>。</p>\n<h2 id="props"><code>props</code><a class="anchor" href="#props">§</a></h2>\n<p><code>i18n</code> 插件会给页面的 <code>props</code> 增加以下几项：</p>\n<h3 id="language"><code>language</code><a class="anchor" href="#language">§</a></h3>\n<p><code>language</code> 表示当前页面的语言，它取自 <code>pagic.config.ts</code> 中的 <code>i18n.languages</code> 中的某一项，故它的类型如下：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">interface</span> <span class="token class-name">Language</span> <span class="token punctuation">{</span>\n  code<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n  root<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E9%85%8D%E7%BD%AE" }, "\u914D\u7F6E"),
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
    'excerpt': "配置 示例如下： export default { i18n: { languages: [ { code: 'en', name: 'English', root: '/' }, { code: 'zh-CN', name: '简体中文', root: '/zh-CN/' }, ], overrides: { 'zh-CN': { sidebar: { '/zh-CN/docs/': [ 'z...",
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
