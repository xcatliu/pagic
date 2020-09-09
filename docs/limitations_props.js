import projectConfig from '/pagic.config.js';
var _a, _b;
export default {
    'prev': {
        "text": "Demos",
        "link": "docs/demos.html"
    },
    'next': null,
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
    ],
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['en'] },
    'pagePath': "docs/limitations.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/limitations.html",
    'title': "Limitations",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Limitations</h1>\n<p>Pagic 很优秀，但也有一些缺陷。</p>\n<p>由于 Pagic 构建的网站使用到了一些最新的 JavaScript 和 CSS 特性，所以必须使用现代浏览器（Chrome, Firefox, Safari, Edge 等）访问网站才能拥有完整的体验，如果你的目标用户使用的是 IE 浏览器，那么不建议使用 Pagic 来构建网站。</p>\n<p>Pagic 使用到的最新特性包括：</p>\n<ul>\n<li>通过 <code>&lt;script type=&quot;module&quot;&gt;</code> 加载 esm 模块（<a href="https://caniuse.com/#feat=es6-module">浏览器支持性</a>）</li>\n<li>通过 <code>import()</code> 动态加载 esm 模块（<a href="https://caniuse.com/#feat=es6-module-dynamic-import">浏览器支持性</a>）</li>\n<li><code>import</code>, <code>export</code>, <code>export default</code> 等 esm 语法（<a href="https://caniuse.com/#feat=mdn-javascript_statements_import">浏览器支持性</a>）</li>\n<li><code>async</code> 函数（<a href="https://caniuse.com/#feat=async-functions">浏览器兼容性</a>）</li>\n<li>常用的 ES6 语法，包括 <code>let</code>, <code>const</code>, <code>() =&gt; {}</code> 等</li>\n<li>CSS Variables（<a href="https://caniuse.com/#feat=css-variables">浏览器兼容性</a>）</li>\n<li>CSS <code>calc()</code>（<a href="https://caniuse.com/#feat=calc">浏览器兼容性</a>）</li>\n<li>CSS flexbox（<a href="https://caniuse.com/#feat=flexbox">浏览器兼容性</a>）</li>\n</ul>\n<h2 id="%E5%85%B6%E4%BB%96%E7%AB%A0%E8%8A%82%E4%B8%AD%E6%8F%90%E5%88%B0%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7">其他章节中提到的局限性<a class="anchor" href="#%E5%85%B6%E4%BB%96%E7%AB%A0%E8%8A%82%E4%B8%AD%E6%8F%90%E5%88%B0%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7">§</a></h2>\n<ul>\n<li><a href="./content.html#%E5%B1%80%E9%99%90%E6%80%A7">页面内容#局限性</a></li>\n<li><a href="./content.html#%E5%B1%80%E9%99%90%E6%80%A7-2">页面内容#局限性-2</a></li>\n</ul>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "/i18n.js", type: "module" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E5%85%B6%E4%BB%96%E7%AB%A0%E8%8A%82%E4%B8%AD%E6%8F%90%E5%88%B0%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7">其他章节中提到的局限性</a></li></ol></nav>'
        } }),
    'language': {
        "code": "en",
        "name": "English",
        "path": ""
    }
};
