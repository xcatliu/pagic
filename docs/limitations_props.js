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
            __html: '<h1>Limitations</h1>\n<p>Pagic is excellent, but it also has some limitations.</p>\n<p>Because the website built by Pagic uses some of the latest JavaScript and CSS features, you must use a modern browser (Chrome, Firefox, Safari, Edge, etc.) to visit the website to have a complete experience. If your target user is using IE browser, Then it is not recommended to use Pagic to build a website.</p>\n<p>The latest features used by Pagic include:</p>\n<ul>\n<li>Load esm through <code>&lt;script type=&quot;module&quot;&gt;</code> (<a href="https://caniuse.com/#feat=es6-module">Browser Support</a>)</li>\n<li>Load esm dynamically through <code>import()</code> (<a href="https://caniuse.com/#feat=es6-module-dynamic-import">Browser Support</a>)</li>\n<li><code>import</code>, <code>export</code>, <code>export default</code> and other esm syntax (<a href="https://caniuse.com/#feat=mdn-javascript_statements_import">Browser Supportability</a>)</li>\n<li><code>async</code> function (<a href="https://caniuse.com/#feat=async-functions">Browser compatibility</a>)</li>\n<li>Common ES6 syntax, including <code>let</code>, <code>const</code>, <code>() =&gt; {}</code> etc.</li>\n<li>CSS Variables (<a href="https://caniuse.com/#feat=css-variables">browser compatibility</a>)</li>\n<li>CSS <code>calc()</code> (<a href="https://caniuse.com/#feat=calc">Browser compatibility</a>)</li>\n<li>CSS flexbox (<a href="https://caniuse.com/#feat=flexbox">Browser compatibility</a>)</li>\n</ul>\n<h2 id="limitations-mentioned-in-other-chapters">Limitations mentioned in other chapters<a class="anchor" href="#limitations-mentioned-in-other-chapters">§</a></h2>\n<ul>\n<li><a href="./content.html#limitations">Content#limitations</a></li>\n<li><a href="./content.html#limitations-2">Content#limitations-2</a></li>\n</ul>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "/i18n.js", type: "module" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#limitations-mentioned-in-other-chapters">Limitations mentioned in other chapters</a></li></ol></nav>'
        } }),
    'language': {
        "code": "en",
        "name": "English",
        "path": ""
    }
};
