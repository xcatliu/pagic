import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
var _a, _b;
export default {
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['zh-CN'], branch: 'master' },
    'pagePath': "zh-CN/plugins/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "zh-CN/plugins/index.html",
    'title': "插件",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>插件</h1>\n<h2 id="%E5%86%85%E7%BD%AE%E6%8F%92%E4%BB%B6">内置插件<a class="anchor" href="#%E5%86%85%E7%BD%AE%E6%8F%92%E4%BB%B6">§</a></h2>\n<h3 id="clean"><code>clean</code><a class="anchor" href="#clean">§</a></h3>\n<p>清空 <code>dist</code> 目录</p>\n<h3 id="init"><code>init</code><a class="anchor" href="#init">§</a></h3>\n<p>初始化中间变量（<code>pagePropsMap</code>）</p>\n<h3 id="md"><code>md</code><a class="anchor" href="#md">§</a></h3>\n<p>解析 <code>md</code> 文件，更新中间变量</p>\n<h3 id="tsx"><code>tsx</code><a class="anchor" href="#tsx">§</a></h3>\n<p>解析 <code>tsx</code> 文件，更新中间变量</p>\n<h3 id="script"><code>script</code><a class="anchor" href="#script">§</a></h3>\n<p>编译 <code>tsx</code> 文件，生成 <code>pagic.config.js</code>, <code>index.js</code>, <code>*_props.js</code>, <code>*_content.js</code> 等文件</p>\n<h3 id="layout"><code>layout</code><a class="anchor" href="#layout">§</a></h3>\n<p>解析 <code>_layout.tsx</code> 文件，使用 <code>Layout</code> 组件来渲染</p>\n<h3 id="out"><code>out</code><a class="anchor" href="#out">§</a></h3>\n<p>生成 HTML 文件，复制静态资源</p>\n<h2 id="%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">官方插件<a class="anchor" href="#%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">§</a></h2>\n<h3 id="sidebar"><code>sidebar</code><a class="anchor" href="#sidebar">§</a></h3>\n<p>侧边栏插件，用于解析 <code>pagic.config.ts</code> 中配置的 <code>sidebar</code>，解析完成后由主题来渲染</p>\n<h3 id="prev_next"><code>prev_next</code><a class="anchor" href="#prev_next">§</a></h3>\n<p>上一页下一页插件，会根据 <code>sidebar</code> 的配置决定链接，由主题渲染到页面的文章底部</p>\n<h3 id="ga"><code>ga</code><a class="anchor" href="#ga">§</a></h3>\n<p>谷歌分析插件，该插件会生成一个 <code>ReactElement</code>，由主题插入到页面的 <code>&lt;head&gt;</code> 中</p>\n<h3 id="gitalk"><code>gitalk</code><a class="anchor" href="#gitalk">§</a></h3>\n<p>Gitalk 插件，给页面添加评论功能，该插件会生成一个 <code>ReactElement</code>，由主题插入到页面的文章底部</p>\n<h3 id="blog"><code>blog</code><a class="anchor" href="#blog">§</a></h3>\n<p>博客插件，将指定目录下的 <code>md/tsx</code> 文件解析为博客文章</p>\n<h3 id="i18n"><code>i18n</code><a class="anchor" href="#i18n">§</a></h3>\n<p>国际化插件，使网站支持多语言能力</p>\n<h2 id="%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6">第三方插件<a class="anchor" href="#%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6">§</a></h2>\n<p>敬请期待</p>'
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
    'contentTitle': React.createElement("h1", { key: "0" }, "\u63D2\u4EF6"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h2 id="%E5%86%85%E7%BD%AE%E6%8F%92%E4%BB%B6">内置插件<a class="anchor" href="#%E5%86%85%E7%BD%AE%E6%8F%92%E4%BB%B6">§</a></h2>\n<h3 id="clean"><code>clean</code><a class="anchor" href="#clean">§</a></h3>\n<p>清空 <code>dist</code> 目录</p>\n<h3 id="init"><code>init</code><a class="anchor" href="#init">§</a></h3>\n<p>初始化中间变量（<code>pagePropsMap</code>）</p>\n<h3 id="md"><code>md</code><a class="anchor" href="#md">§</a></h3>\n<p>解析 <code>md</code> 文件，更新中间变量</p>\n<h3 id="tsx"><code>tsx</code><a class="anchor" href="#tsx">§</a></h3>\n<p>解析 <code>tsx</code> 文件，更新中间变量</p>\n<h3 id="script"><code>script</code><a class="anchor" href="#script">§</a></h3>\n<p>编译 <code>tsx</code> 文件，生成 <code>pagic.config.js</code>, <code>index.js</code>, <code>*_props.js</code>, <code>*_content.js</code> 等文件</p>\n<h3 id="layout"><code>layout</code><a class="anchor" href="#layout">§</a></h3>\n<p>解析 <code>_layout.tsx</code> 文件，使用 <code>Layout</code> 组件来渲染</p>\n<h3 id="out"><code>out</code><a class="anchor" href="#out">§</a></h3>\n<p>生成 HTML 文件，复制静态资源</p>\n<h2 id="%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">官方插件<a class="anchor" href="#%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">§</a></h2>\n<h3 id="sidebar"><code>sidebar</code><a class="anchor" href="#sidebar">§</a></h3>\n<p>侧边栏插件，用于解析 <code>pagic.config.ts</code> 中配置的 <code>sidebar</code>，解析完成后由主题来渲染</p>\n<h3 id="prev_next"><code>prev_next</code><a class="anchor" href="#prev_next">§</a></h3>\n<p>上一页下一页插件，会根据 <code>sidebar</code> 的配置决定链接，由主题渲染到页面的文章底部</p>\n<h3 id="ga"><code>ga</code><a class="anchor" href="#ga">§</a></h3>\n<p>谷歌分析插件，该插件会生成一个 <code>ReactElement</code>，由主题插入到页面的 <code>&lt;head&gt;</code> 中</p>\n<h3 id="gitalk"><code>gitalk</code><a class="anchor" href="#gitalk">§</a></h3>\n<p>Gitalk 插件，给页面添加评论功能，该插件会生成一个 <code>ReactElement</code>，由主题插入到页面的文章底部</p>\n<h3 id="blog"><code>blog</code><a class="anchor" href="#blog">§</a></h3>\n<p>博客插件，将指定目录下的 <code>md/tsx</code> 文件解析为博客文章</p>\n<h3 id="i18n"><code>i18n</code><a class="anchor" href="#i18n">§</a></h3>\n<p>国际化插件，使网站支持多语言能力</p>\n<h2 id="%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6">第三方插件<a class="anchor" href="#%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6">§</a></h2>\n<p>敬请期待</p>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%86%85%E7%BD%AE%E6%8F%92%E4%BB%B6" }, "\u5185\u7F6E\u63D2\u4EF6"),
                React.createElement("ol", null,
                    React.createElement("li", null,
                        React.createElement("a", { href: "#clean" }, "clean")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#init" }, "init")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#md" }, "md")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#tsx" }, "tsx")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#script" }, "script")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#layout" }, "layout")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#out" }, "out")))),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6" }, "\u5B98\u65B9\u63D2\u4EF6"),
                React.createElement("ol", null,
                    React.createElement("li", null,
                        React.createElement("a", { href: "#sidebar" }, "sidebar")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#prev_next" }, "prev_next")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#ga" }, "ga")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#gitalk" }, "gitalk")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#blog" }, "blog")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#i18n" }, "i18n")))),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6" }, "\u7B2C\u4E09\u65B9\u63D2\u4EF6")))),
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'date': "2020-07-19T14:12:09.000Z",
    'updated': "2020-12-05T13:42:50.000Z",
    'excerpt': "内置插件 clean 清空 dist 目录 init 初始化中间变量（pagePropsMap） md 解析 md 文件，更新中间变量 tsx 解析 tsx 文件，更新中间变量 script 编译 tsx 文件，生成 pagic.config.js, index.js, *_props.js, *_content.js 等文...",
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
    }
};
