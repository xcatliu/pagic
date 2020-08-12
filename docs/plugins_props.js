import projectConfig from '/pagic.config.js';
export default {
    'prev': {
        "text": "主题",
        "link": "docs/themes.html"
    },
    'next': {
        "text": "部署",
        "link": "docs/deployment.html"
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
            "text": "配置文件",
            "link": "docs/config.html",
            "pagePath": "docs/config.md"
        },
        {
            "text": "页面内容",
            "link": "docs/content.html",
            "pagePath": "docs/content.md"
        },
        {
            "text": "_layout.tsx",
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
        },
        {
            "text": "示例网站",
            "link": "docs/demos.html",
            "pagePath": "docs/demos.md"
        },
        {
            "text": "局限性",
            "link": "docs/limitations.html",
            "pagePath": "docs/limitations.md"
        }
    ],
    config: { "root": "/", ...projectConfig },
    'pagePath': "docs/plugins.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/plugins.html",
    'title': "插件",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>插件</h1>\n<p>本章会介绍如何使用插件，以及如何开发插件。</p>\n<p>如果你想查看所有插件的列表及其说明文档，请访问<a href="/plugins/">插件列表</a>。</p>\n<h2 id="%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F">使用方式<a class="anchor" href="#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F">§</a></h2>\n<p>按照插件的级别可以将插件分为内置插件、官方插件以及第三方插件。</p>\n<h3 id="%E5%86%85%E7%BD%AE%E6%8F%92%E4%BB%B6">内置插件<a class="anchor" href="#%E5%86%85%E7%BD%AE%E6%8F%92%E4%BB%B6">§</a></h3>\n<p>内置插件是最重要的插件，它们组成了 Pagic 的整个构建过程——换一句话说，Pagic 的整个构建过程被拆分为了内置插件。</p>\n<p>内置插件包括：<code>[\'clean\', \'init\', \'md\', \'tsx\', \'script\', \'layout\', \'out\']</code>，Pagic 的构建过程也是按照这个次序来的：</p>\n<ol>\n<li><code>clean</code>: 清空输出目录</li>\n<li><code>init</code>: 初始化中间变量（<code>pagePropsMap</code>）</li>\n<li><code>md</code>: 解析 <code>md</code> 文件，更新中间变量</li>\n<li><code>tsx</code>: 解析 <code>tsx</code> 文件，更新中间变量</li>\n<li><code>script</code>: 编译 <code>tsx</code> 文件，生成 <code>pagic.config.js</code>, <code>index.js</code>, <code>*_props.js</code>, <code>*_content.js</code> 等文件</li>\n<li><code>layout</code>: 解析 <code>_layout.tsx</code> 文件，使用 <code>Layout</code> 组件来渲染</li>\n<li><code>out</code>: 生成 html 文件，复制静态文件</li>\n</ol>\n<blockquote>\n<p>其实第 1 步之前还有一些步骤：解析 <code>pagic.config.ts</code>，扫描项目目录，找出页面文件和模版文件。但是由于一些运行机制的原因，它们无法被拆分为插件。</p>\n</blockquote>\n<h3 id="%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">官方插件<a class="anchor" href="#%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">§</a></h3>\n<h3 id="%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6">第三方插件<a class="anchor" href="#%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6">§</a></h3>\n<p>当使用第三方插件时，数组中的项应为一个完整的入口文件链接：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">\'<a class="token url-link" href="https://raw.githubusercontent.com/xcatliu/pagic_plugin_custom/master/mod.ts">https://raw.githubusercontent.com/xcatliu/pagic_plugin_custom/master/mod.ts</a>\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<h2 id="%E5%A6%82%E4%BD%95%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6">如何开发插件<a class="anchor" href="#%E5%A6%82%E4%BD%95%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6">§</a></h2>\n<h3 id="%E5%8F%82%E8%80%83%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">参考官方插件<a class="anchor" href="#%E5%8F%82%E8%80%83%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">§</a></h3>\n<p>开发一个插件最佳的参考就是官方插件，你可以直接<a href="https://github.com/xcatliu/pagic/tree/master/src/plugins">查看官方插件的源码</a>。</p>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F">使用方式</a><ol><li><a href="#%E5%86%85%E7%BD%AE%E6%8F%92%E4%BB%B6">内置插件</a></li><li><a href="#%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">官方插件</a></li><li><a href="#%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6">第三方插件</a></li></ol></li><li><a href="#%E5%A6%82%E4%BD%95%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6">如何开发插件</a><ol><li><a href="#%E5%8F%82%E8%80%83%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">参考官方插件</a></li></ol></li></ol></nav>'
        } })
};
