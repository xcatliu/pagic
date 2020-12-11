import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
var _a, _b;
export default {
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['en'], branch: 'master' },
    'pagePath': "plugins/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "plugins/index.html",
    'title': "Plugins",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Plugins</h1>\n<h2 id="built-in-plugins">Built-in plugins<a class="anchor" href="#built-in-plugins">§</a></h2>\n<h3 id="clean"><code>clean</code><a class="anchor" href="#clean">§</a></h3>\n<p>Empty the <code>dist</code> directory</p>\n<h3 id="init"><code>init</code><a class="anchor" href="#init">§</a></h3>\n<p>Initialize intermediate variables (<code>pagePropsMap</code>)</p>\n<h3 id="md"><code>md</code><a class="anchor" href="#md">§</a></h3>\n<p>Parse the <code>md</code> file and update the intermediate variables</p>\n<h3 id="tsx"><code>tsx</code><a class="anchor" href="#tsx">§</a></h3>\n<p>Parse <code>tsx</code> files and update intermediate variables</p>\n<h3 id="script"><code>script</code><a class="anchor" href="#script">§</a></h3>\n<p>Compile <code>tsx</code> files to generate <code>pagic.config.js</code>, <code>index.js</code>, <code>*_props.js</code>, <code>*_content.js</code> and other files</p>\n<h3 id="layout"><code>layout</code><a class="anchor" href="#layout">§</a></h3>\n<p>Parse the <code>_layout.tsx</code> file and use the <code>Layout</code> component to render</p>\n<h3 id="out"><code>out</code><a class="anchor" href="#out">§</a></h3>\n<p>Generate HTML files, copy static resources</p>\n<h2 id="official-plugins">Official plugins<a class="anchor" href="#official-plugins">§</a></h2>\n<h3 id="sidebar"><code>sidebar</code><a class="anchor" href="#sidebar">§</a></h3>\n<p>Used to parse the <code>sidebar</code> configured in <code>pagic.config.ts</code>, the theme will render sidebar after the parse is completed</p>\n<h3 id="prev_next"><code>prev_next</code><a class="anchor" href="#prev_next">§</a></h3>\n<p>Will get the link of previous page and the next page according to the configuration of <code>sidebar</code>, the theme will render it to the bottom of the article</p>\n<h3 id="ga"><code>ga</code><a class="anchor" href="#ga">§</a></h3>\n<p>Google Analytics plugin, the plugin will generate a <code>ReactElement</code>, the theme will inserted it into the page\'s <code>&lt;head&gt;</code></p>\n<h3 id="gitalk"><code>gitalk</code><a class="anchor" href="#gitalk">§</a></h3>\n<p>Add comment function to the page, the plugin will generate a <code>ReactElement</code>, the theme will insert it into the bottom of the page</p>\n<h3 id="blog"><code>blog</code><a class="anchor" href="#blog">§</a></h3>\n<p>Parse the <code>md/tsx</code> file as a post in the specified directory</p>\n<h3 id="i18n"><code>i18n</code><a class="anchor" href="#i18n">§</a></h3>\n<p>Internationalization plugin, which make the website support multiple languages</p>\n<h2 id="third-party-plugins">Third-party plugins<a class="anchor" href="#third-party-plugins">§</a></h2>\n<p>Stay tuned.</p>'
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
    'contentTitle': React.createElement("h1", { key: "0" }, "Plugins"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h2 id="built-in-plugins">Built-in plugins<a class="anchor" href="#built-in-plugins">§</a></h2>\n<h3 id="clean"><code>clean</code><a class="anchor" href="#clean">§</a></h3>\n<p>Empty the <code>dist</code> directory</p>\n<h3 id="init"><code>init</code><a class="anchor" href="#init">§</a></h3>\n<p>Initialize intermediate variables (<code>pagePropsMap</code>)</p>\n<h3 id="md"><code>md</code><a class="anchor" href="#md">§</a></h3>\n<p>Parse the <code>md</code> file and update the intermediate variables</p>\n<h3 id="tsx"><code>tsx</code><a class="anchor" href="#tsx">§</a></h3>\n<p>Parse <code>tsx</code> files and update intermediate variables</p>\n<h3 id="script"><code>script</code><a class="anchor" href="#script">§</a></h3>\n<p>Compile <code>tsx</code> files to generate <code>pagic.config.js</code>, <code>index.js</code>, <code>*_props.js</code>, <code>*_content.js</code> and other files</p>\n<h3 id="layout"><code>layout</code><a class="anchor" href="#layout">§</a></h3>\n<p>Parse the <code>_layout.tsx</code> file and use the <code>Layout</code> component to render</p>\n<h3 id="out"><code>out</code><a class="anchor" href="#out">§</a></h3>\n<p>Generate HTML files, copy static resources</p>\n<h2 id="official-plugins">Official plugins<a class="anchor" href="#official-plugins">§</a></h2>\n<h3 id="sidebar"><code>sidebar</code><a class="anchor" href="#sidebar">§</a></h3>\n<p>Used to parse the <code>sidebar</code> configured in <code>pagic.config.ts</code>, the theme will render sidebar after the parse is completed</p>\n<h3 id="prev_next"><code>prev_next</code><a class="anchor" href="#prev_next">§</a></h3>\n<p>Will get the link of previous page and the next page according to the configuration of <code>sidebar</code>, the theme will render it to the bottom of the article</p>\n<h3 id="ga"><code>ga</code><a class="anchor" href="#ga">§</a></h3>\n<p>Google Analytics plugin, the plugin will generate a <code>ReactElement</code>, the theme will inserted it into the page\'s <code>&lt;head&gt;</code></p>\n<h3 id="gitalk"><code>gitalk</code><a class="anchor" href="#gitalk">§</a></h3>\n<p>Add comment function to the page, the plugin will generate a <code>ReactElement</code>, the theme will insert it into the bottom of the page</p>\n<h3 id="blog"><code>blog</code><a class="anchor" href="#blog">§</a></h3>\n<p>Parse the <code>md/tsx</code> file as a post in the specified directory</p>\n<h3 id="i18n"><code>i18n</code><a class="anchor" href="#i18n">§</a></h3>\n<p>Internationalization plugin, which make the website support multiple languages</p>\n<h2 id="third-party-plugins">Third-party plugins<a class="anchor" href="#third-party-plugins">§</a></h2>\n<p>Stay tuned.</p>'
        } }),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#built-in-plugins">Built-in plugins</a><ol><li><a href="#clean">clean</a></li><li><a href="#init">init</a></li><li><a href="#md">md</a></li><li><a href="#tsx">tsx</a></li><li><a href="#script">script</a></li><li><a href="#layout">layout</a></li><li><a href="#out">out</a></li></ol></li><li><a href="#official-plugins">Official plugins</a><ol><li><a href="#sidebar">sidebar</a></li><li><a href="#prev_next">prev_next</a></li><li><a href="#ga">ga</a></li><li><a href="#gitalk">gitalk</a></li><li><a href="#blog">blog</a></li><li><a href="#i18n">i18n</a></li></ol></li><li><a href="#third-party-plugins">Third-party plugins</a></li></ol></nav>'
        } }),
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'date': "2020-07-19T14:12:09.000Z",
    'updated': "2020-12-05T13:42:50.000Z",
    'excerpt': "Built-in plugins clean Empty the dist directory init Initialize intermediate variables (pagePropsMap) md Parse the md file and update the intermediate variables tsx Parse tsx files and update intermediate varia...",
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
