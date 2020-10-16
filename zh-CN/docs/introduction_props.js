import projectConfig from '/pagic.config.js';
var _a, _b;
export default {
    'prev': null,
    'next': {
        "title": "基本用法",
        "link": "zh-CN/docs/usage.html"
    },
    'sidebar': [
        {
            "title": "介绍",
            "link": "zh-CN/docs/introduction.html",
            "pagePath": "zh-CN/docs/introduction.md"
        },
        {
            "title": "基本用法",
            "link": "zh-CN/docs/usage.html",
            "pagePath": "zh-CN/docs/usage.md"
        },
        {
            "title": "配置文件",
            "link": "zh-CN/docs/config.html",
            "pagePath": "zh-CN/docs/config.md"
        },
        {
            "title": "页面内容",
            "link": "zh-CN/docs/content.html",
            "pagePath": "zh-CN/docs/content.md"
        },
        {
            "title": "_layout.tsx",
            "link": "zh-CN/docs/layout.html",
            "pagePath": "zh-CN/docs/layout.md"
        },
        {
            "title": "主题",
            "link": "zh-CN/docs/themes.html",
            "pagePath": "zh-CN/docs/themes.md"
        },
        {
            "title": "插件",
            "link": "zh-CN/docs/plugins.html",
            "pagePath": "zh-CN/docs/plugins.md"
        },
        {
            "title": "部署",
            "link": "zh-CN/docs/deployment.html",
            "pagePath": "zh-CN/docs/deployment.md"
        },
        {
            "title": "示例网站",
            "link": "zh-CN/docs/demos.html",
            "pagePath": "zh-CN/docs/demos.md"
        },
        {
            "title": "局限性",
            "link": "zh-CN/docs/limitations.html",
            "pagePath": "zh-CN/docs/limitations.md"
        }
    ],
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['zh-CN'] },
    'pagePath': "zh-CN/docs/introduction.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "zh-CN/docs/introduction.html",
    'title': "介绍",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>介绍</h1>\n<p>Pagic 是一个由 Deno + React 驱动的静态网站生成器。</p>\n<p>它配置简单，支持将 <code>md/tsx</code> 文件渲染成静态页面，而且还有大量的官方或第三方主题和插件可供扩展。</p>\n<h2 id="%E7%89%B9%E6%80%A7">特性<a class="anchor" href="#%E7%89%B9%E6%80%A7">§</a></h2>\n<h3 id="%E9%85%8D%E7%BD%AE%E7%AE%80%E5%8D%95">配置简单<a class="anchor" href="#%E9%85%8D%E7%BD%AE%E7%AE%80%E5%8D%95">§</a></h3>\n<p>Pagic 遵循<a href="https://zh.wikipedia.org/wiki/%E7%BA%A6%E5%AE%9A%E4%BC%98%E4%BA%8E%E9%85%8D%E7%BD%AE">约定优于配置</a>的理念，尽可能的减少配置项，通过一些符合直觉的设计，降低用户的理解成本，而又不失灵活性。</p>\n<h3 id="%E6%94%AF%E6%8C%81-md-%E5%92%8C-tsx">支持 md 和 tsx<a class="anchor" href="#%E6%94%AF%E6%8C%81-md-%E5%92%8C-tsx">§</a></h3>\n<p>Pagic 不仅支持将 <code>md/tsx</code> 文件渲染成静态页面，而且还能运行 <code>tsx</code> 中的 Hooks，借助 React 组件的可编程性，极大的扩展了静态网站的能力。</p>\n<p>值得注意的是，每一个由 Pagic 生成的页面都带有预渲染好的 HTML，也因此具有极致的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，React 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。</p>\n<h3 id="%E4%B8%BB%E9%A2%98%E5%92%8C%E6%8F%92%E4%BB%B6">主题和插件<a class="anchor" href="#%E4%B8%BB%E9%A2%98%E5%92%8C%E6%8F%92%E4%BB%B6">§</a></h3>\n<p>Pagic 拥有官方的 default, docs, blog 等主题，我们可以使用官方主题轻松的生成一个网站，也可以创建个性化的主题，甚至还可以扩展某个主题——这些能力都得益于 Pagic 符合直觉的 <code>_layout.tsx</code> 设计。</p>\n<p>插件是 Pagic 最核心的功能之一。Pagic 将整个构建过程拆分为一个个内置插件，使得其他插件可以插入到构建过程中的任意位置，甚至可以通过替换内置插件完全的更改 Pagic 的构建过程，这给 Pagic 提供了无与伦比的灵活性。</p>\n<p>Pagic 参考了 Deno 的设计，要求用户通过一个完整的 URL 来引入第三方主题或插件。</p>\n<h2 id="%E7%AB%9E%E5%93%81%E5%AF%B9%E6%AF%94">竞品对比<a class="anchor" href="#%E7%AB%9E%E5%93%81%E5%AF%B9%E6%AF%94">§</a></h2>\n<p>作为一个「静态网站生成器狂热爱好者」，大部分流行的静态网站生成器我都使用过，它们都很优秀，但 Pagic 尝试了一些新的设计理念。下面列出一些关键性差异：</p>\n<table>\n<thead>\n<tr>\n<th></th>\n<th>Pagic</th>\n<th>VuePress</th>\n<th>Hexo</th>\n<th>Jekyll</th>\n<th>Hugo</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>支持 md</td>\n<td>✓</td>\n<td>✓</td>\n<td>✓</td>\n<td>✓</td>\n<td>✓</td>\n</tr>\n<tr>\n<td>React/Vue</td>\n<td>✓</td>\n<td>✓</td>\n<td></td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>SPA</td>\n<td>✓</td>\n<td>✓</td>\n<td></td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>...</td>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p>Pagic 站在了巨人的肩膀上，参考了一些其他静态网站生成器的配置项、文档等，在此给予这些开源软件及开源社区最诚挚的感谢。</p>'
        } }),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u4ECB\u7ECD"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>Pagic 是一个由 Deno + React 驱动的静态网站生成器。</p>\n<p>它配置简单，支持将 <code>md/tsx</code> 文件渲染成静态页面，而且还有大量的官方或第三方主题和插件可供扩展。</p>\n<h2 id="%E7%89%B9%E6%80%A7">特性<a class="anchor" href="#%E7%89%B9%E6%80%A7">§</a></h2>\n<h3 id="%E9%85%8D%E7%BD%AE%E7%AE%80%E5%8D%95">配置简单<a class="anchor" href="#%E9%85%8D%E7%BD%AE%E7%AE%80%E5%8D%95">§</a></h3>\n<p>Pagic 遵循<a href="https://zh.wikipedia.org/wiki/%E7%BA%A6%E5%AE%9A%E4%BC%98%E4%BA%8E%E9%85%8D%E7%BD%AE">约定优于配置</a>的理念，尽可能的减少配置项，通过一些符合直觉的设计，降低用户的理解成本，而又不失灵活性。</p>\n<h3 id="%E6%94%AF%E6%8C%81-md-%E5%92%8C-tsx">支持 md 和 tsx<a class="anchor" href="#%E6%94%AF%E6%8C%81-md-%E5%92%8C-tsx">§</a></h3>\n<p>Pagic 不仅支持将 <code>md/tsx</code> 文件渲染成静态页面，而且还能运行 <code>tsx</code> 中的 Hooks，借助 React 组件的可编程性，极大的扩展了静态网站的能力。</p>\n<p>值得注意的是，每一个由 Pagic 生成的页面都带有预渲染好的 HTML，也因此具有极致的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，React 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。</p>\n<h3 id="%E4%B8%BB%E9%A2%98%E5%92%8C%E6%8F%92%E4%BB%B6">主题和插件<a class="anchor" href="#%E4%B8%BB%E9%A2%98%E5%92%8C%E6%8F%92%E4%BB%B6">§</a></h3>\n<p>Pagic 拥有官方的 default, docs, blog 等主题，我们可以使用官方主题轻松的生成一个网站，也可以创建个性化的主题，甚至还可以扩展某个主题——这些能力都得益于 Pagic 符合直觉的 <code>_layout.tsx</code> 设计。</p>\n<p>插件是 Pagic 最核心的功能之一。Pagic 将整个构建过程拆分为一个个内置插件，使得其他插件可以插入到构建过程中的任意位置，甚至可以通过替换内置插件完全的更改 Pagic 的构建过程，这给 Pagic 提供了无与伦比的灵活性。</p>\n<p>Pagic 参考了 Deno 的设计，要求用户通过一个完整的 URL 来引入第三方主题或插件。</p>\n<h2 id="%E7%AB%9E%E5%93%81%E5%AF%B9%E6%AF%94">竞品对比<a class="anchor" href="#%E7%AB%9E%E5%93%81%E5%AF%B9%E6%AF%94">§</a></h2>\n<p>作为一个「静态网站生成器狂热爱好者」，大部分流行的静态网站生成器我都使用过，它们都很优秀，但 Pagic 尝试了一些新的设计理念。下面列出一些关键性差异：</p>\n<table>\n<thead>\n<tr>\n<th></th>\n<th>Pagic</th>\n<th>VuePress</th>\n<th>Hexo</th>\n<th>Jekyll</th>\n<th>Hugo</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>支持 md</td>\n<td>✓</td>\n<td>✓</td>\n<td>✓</td>\n<td>✓</td>\n<td>✓</td>\n</tr>\n<tr>\n<td>React/Vue</td>\n<td>✓</td>\n<td>✓</td>\n<td></td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>SPA</td>\n<td>✓</td>\n<td>✓</td>\n<td></td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>...</td>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p>Pagic 站在了巨人的肩膀上，参考了一些其他静态网站生成器的配置项、文档等，在此给予这些开源软件及开源社区最诚挚的感谢。</p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "/i18n.js", type: "module" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E7%89%B9%E6%80%A7">特性</a><ol><li><a href="#%E9%85%8D%E7%BD%AE%E7%AE%80%E5%8D%95">配置简单</a></li><li><a href="#%E6%94%AF%E6%8C%81-md-%E5%92%8C-tsx">支持 md 和 tsx</a></li><li><a href="#%E4%B8%BB%E9%A2%98%E5%92%8C%E6%8F%92%E4%BB%B6">主题和插件</a></li></ol></li><li><a href="#%E7%AB%9E%E5%93%81%E5%AF%B9%E6%AF%94">竞品对比</a></li></ol></nav>'
        } }),
    'language': {
        "code": "zh-CN",
        "name": "简体中文",
        "path": "zh-CN/"
    },
    'contentHasKatex': false,
    'date': "2020-10-16T02:28:37.000Z",
    'updated': null,
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'blog': {
        "isPost": false,
        "isPosts": false,
        "posts": [
            {
                "pagePath": "zh-CN/blog/design_pagic_config_ts.md",
                "title": "设计 pagic.config.ts",
                "link": "zh-CN/blog/design_pagic_config_ts.html",
                "date": "2020-07-12T00:00:00.000Z",
                "updated": null
            }
        ]
    }
};
