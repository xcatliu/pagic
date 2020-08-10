import projectConfig from '/pagic.config.js';
export default {
    'prev': {
        "text": "基本用法",
        "link": "docs/usage.html"
    },
    'next': {
        "text": "_layout.tsx",
        "link": "docs/layout.html"
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
            "text": "配置",
            "link": "docs/configuration.html",
            "pagePath": "docs/configuration.md"
        },
        {
            "text": "_layout.tsx",
            "link": "docs/layout.html",
            "pagePath": "docs/layout.md"
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
            __html: '<h1>配置</h1>\n<p>Pagic 提供了丰富的配置，大部分用户通过配置文件就可以构建出一个具有丰富功能的静态网站了。</p>\n<p>Pagic 的配置文件名称为 <code>pagic.config.ts</code> 或 <code>pagic.config.tsx</code>（如果你的配置文件中使用了 jsx 语法）。</p>\n<blockquote>\n<p>以下列出的是官方提供的配置字段，一些第三方主题或插件可能会包含额外的配置字段，需要参考其说明文档。</p>\n</blockquote>\n<h2 id="%E8%BE%93%E5%85%A5%E5%92%8C%E8%BE%93%E5%87%BA">输入和输出<a class="anchor" href="#%E8%BE%93%E5%85%A5%E5%92%8C%E8%BE%93%E5%87%BA">§</a></h2>\n<h3 id="srcdir"><code>srcDir</code><a class="anchor" href="#srcdir">§</a></h3>\n<p>执行 Pagic 构建过程的源目录，默认为 <code>pagic.config.ts</code> 所在的当前目录 <code>.</code>：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  srcDir<span class="token operator">:</span> <span class="token string">\'.\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n|── dist    # 构建结果目录\n|   └── index<span class="token punctuation">.</span>html\n└── README<span class="token punctuation">.</span>md\n</code></pre>\n<p>通常在给一个已有的项目写文档时，可以通过配置 <code>srcDir</code> 在子目录下写文档：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  srcDir<span class="token operator">:</span> <span class="token string">\'docs\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n|── dist    # 构建结果目录\n|   └── index<span class="token punctuation">.</span>html\n└── docs    # 构建源目录\n    └── README<span class="token punctuation">.</span>md\n</code></pre>\n<h3 id="outdir"><code>outDir</code><a class="anchor" href="#outdir">§</a></h3>\n<p>Pagic 构建的结果目录，默认值为 <code>dist</code>。配合 <code>srcDir</code> 可以同时自定义输入和输出目录：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  srcDir<span class="token operator">:</span> <span class="token string">\'docs\'</span><span class="token punctuation">,</span>\n  outDir<span class="token operator">:</span> <span class="token string">\'public\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n|── public  # 构建结果目录\n|   └── index<span class="token punctuation">.</span>html\n└── docs    # 构建源目录\n    └── README<span class="token punctuation">.</span>md\n</code></pre>\n<h3 id="include"><code>include</code><a class="anchor" href="#include">§</a></h3>\n<h3 id="exclude"><code>exclude</code><a class="anchor" href="#exclude">§</a></h3>\n<h3 id="root"><code>root</code><a class="anchor" href="#root">§</a></h3>\n<h2 id="%E4%B8%BB%E9%A2%98%E5%92%8C%E6%8F%92%E4%BB%B6">主题和插件<a class="anchor" href="#%E4%B8%BB%E9%A2%98%E5%92%8C%E6%8F%92%E4%BB%B6">§</a></h2>\n<h3 id="theme"><code>theme</code><a class="anchor" href="#theme">§</a></h3>\n<h3 id="plugins"><code>plugins</code><a class="anchor" href="#plugins">§</a></h3>\n<h2 id="%E9%A1%B5%E9%9D%A2-props">页面 props<a class="anchor" href="#%E9%A1%B5%E9%9D%A2-props">§</a></h2>\n<h3 id="title"><code>title</code><a class="anchor" href="#title">§</a></h3>\n<h3 id="description"><code>description</code><a class="anchor" href="#description">§</a></h3>\n<h3 id="head"><code>head</code><a class="anchor" href="#head">§</a></h3>\n<h3 id="nav"><code>nav</code><a class="anchor" href="#nav">§</a></h3>\n<h3 id="sidebar"><code>sidebar</code><a class="anchor" href="#sidebar">§</a></h3>\n<h3 id="github"><code>github</code><a class="anchor" href="#github">§</a></h3>\n<h3 id="tools"><code>tools</code><a class="anchor" href="#tools">§</a></h3>\n<h3 id="tocad"><code>tocAd</code><a class="anchor" href="#tocad">§</a></h3>\n<h3 id="gitalk"><code>gitalk</code><a class="anchor" href="#gitalk">§</a></h3>\n<h3 id="ga"><code>ga</code><a class="anchor" href="#ga">§</a></h3>\n<h2 id="%E5%91%BD%E4%BB%A4%E8%A1%8C%E9%80%89%E9%A1%B9">命令行选项<a class="anchor" href="#%E5%91%BD%E4%BB%A4%E8%A1%8C%E9%80%89%E9%A1%B9">§</a></h2>\n<h3 id="watch"><code>watch</code><a class="anchor" href="#watch">§</a></h3>\n<h3 id="serve"><code>serve</code><a class="anchor" href="#serve">§</a></h3>\n<h3 id="port"><code>port</code><a class="anchor" href="#port">§</a></h3>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E8%BE%93%E5%85%A5%E5%92%8C%E8%BE%93%E5%87%BA">输入和输出</a><ol><li><a href="#srcdir">srcDir</a></li><li><a href="#outdir">outDir</a></li><li><a href="#include">include</a></li><li><a href="#exclude">exclude</a></li><li><a href="#root">root</a></li></ol></li><li><a href="#%E4%B8%BB%E9%A2%98%E5%92%8C%E6%8F%92%E4%BB%B6">主题和插件</a><ol><li><a href="#theme">theme</a></li><li><a href="#plugins">plugins</a></li></ol></li><li><a href="#%E9%A1%B5%E9%9D%A2-props">页面 props</a><ol><li><a href="#title">title</a></li><li><a href="#description">description</a></li><li><a href="#head">head</a></li><li><a href="#nav">nav</a></li><li><a href="#sidebar">sidebar</a></li><li><a href="#github">github</a></li><li><a href="#tools">tools</a></li><li><a href="#tocad">tocAd</a></li><li><a href="#gitalk">gitalk</a></li><li><a href="#ga">ga</a></li></ol></li><li><a href="#%E5%91%BD%E4%BB%A4%E8%A1%8C%E9%80%89%E9%A1%B9">命令行选项</a><ol><li><a href="#watch">watch</a></li><li><a href="#serve">serve</a></li><li><a href="#port">port</a></li></ol></li></ol></nav>'
        } })
};
