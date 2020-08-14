import projectConfig from '/pagic.config.js';
export default {
    'prev': {
        "text": "示例网站",
        "link": "docs/demos.html"
    },
    'next': null,
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
    'pagePath': "docs/limitations.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/limitations.html",
    'title': "局限性",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>局限性</h1>\n<p>Pagic 很优秀，但也有一些缺陷。</p>\n<p>由于 Pagic 构建的网站使用到了一些最新的 JavaScript 和 CSS 特性，所以必须使用现代浏览器（Chrome, Firefox, Safari, Edge 等）访问网站才能拥有完整的体验，如果你的目标用户使用的是 IE 浏览器，那么不建议使用 Pagic 来构建网站。</p>\n<p>Pagic 使用到的最新特性包括：</p>\n<ul>\n<li>通过 <code>&lt;script type=&quot;module&quot;&gt;</code> 加载 esm 模块（<a href="https://caniuse.com/#feat=es6-module">浏览器支持性</a>）</li>\n<li><code>import</code>, <code>export</code>, <code>export default</code> 等 esm 语法（<a href="https://caniuse.com/#feat=mdn-javascript_statements_import">浏览器支持性</a>）</li>\n<li>通过 <code>import()</code> 动态加载 esm 模块（<a href="https://caniuse.com/#feat=es6-module-dynamic-import">浏览器支持性</a>）</li>\n<li><code>async</code> 函数（<a href="https://caniuse.com/#feat=async-functions">浏览器兼容性</a>）</li>\n<li>常用的 ES6 语法，包括 <code>let</code>, <code>const</code>, <code>() =&gt; {}</code> 等</li>\n<li>CSS Variables（<a href="https://caniuse.com/#feat=css-variables">浏览器兼容性</a>）</li>\n<li>CSS <code>calc()</code>（<a href="https://caniuse.com/#feat=calc">浏览器兼容性</a>）</li>\n<li>CSS flexbox（<a href="https://caniuse.com/#feat=flexbox">浏览器兼容性</a>）</li>\n</ul>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': null
};
