import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
var _a, _b;
export default {
    'prev': {
        "text": "国际化",
        "link": "zh-CN/docs/i18n.html"
    },
    'next': {
        "text": "示例网站",
        "link": "zh-CN/docs/demos.html"
    },
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['zh-CN'], branch: 'master' },
    'pagePath': "zh-CN/docs/deployment.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "zh-CN/docs/deployment.html",
    'title': "部署",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>部署</h1>\n<p>构建完成后的 <code>dist</code> 目录可以作为一个网站部署到你的服务器上。我们强烈推荐通过持续集成让部署过程自动化，下面列出几种常见的部署方式：</p>\n<h2 id="github-pages">GitHub Pages<a class="anchor" href="#github-pages">§</a></h2>\n<p>GitHub Pages 是最常见的一种托管静态网站的服务，通过 GitHub 官方提供的 CI 工具 <a href="https://github.com/features/actions">GitHub Actions</a>，我们可以轻松的实现提交代码后自动构建并部署网站。</p>\n<p>实现自动部署网站到 GitHub Pages 非常简单，只需要在你的 GitHub 项目中创建一个 <code>.github/workflows/ci.yml</code> 文件，内容如下：</p>\n<pre class="language-yml"><code class="language-yml"><span class="token key atrule">name</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages\n\n<span class="token key atrule">on</span><span class="token punctuation">:</span>\n  <span class="token key atrule">push</span><span class="token punctuation">:</span>\n    <span class="token key atrule">branches</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> master\n\n<span class="token key atrule">jobs</span><span class="token punctuation">:</span>\n  <span class="token key atrule">build-and-deploy</span><span class="token punctuation">:</span>\n    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span><span class="token number">18.04</span>\n    <span class="token key atrule">steps</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2\n\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup deno\n        <span class="token key atrule">uses</span><span class="token punctuation">:</span> denolib/setup<span class="token punctuation">-</span>deno@v2\n        <span class="token key atrule">with</span><span class="token punctuation">:</span>\n          <span class="token key atrule">deno-version</span><span class="token punctuation">:</span> v1.7.0\n\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build gh<span class="token punctuation">-</span>pages\n        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>\n          deno --version\n          deno install --unstable --allow-read --allow-write --allow-net --allow-env --allow-run --name=pagic https://deno.land/x/pagic@v1.6.3/mod.ts\n          <span>pagic build</span>\n\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy gh<span class="token punctuation">-</span>pages\n        <span class="token key atrule">uses</span><span class="token punctuation">:</span> peaceiris/actions<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>pages@v3\n        <span class="token key atrule">with</span><span class="token punctuation">:</span>\n          <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>\n          <span class="token key atrule">publish_dir</span><span class="token punctuation">:</span> ./dist\n          <span class="token key atrule">cname</span><span class="token punctuation">:</span> ts.xcatliu.com\n</code></pre><p>注意替换掉最后一行的 <code>ts.xcatliu.com</code> 为你自己的域名。</p>\n<p>如果没有自己的域名的话，也可以使用 GitHub 提供的免费域名 <code>xxx.github.io</code>，此时只要将最后一行删除即可。注意此时需要修改 <code>pagic.config.ts</code> 中的 <code>root</code> 配置来支持子路径，详细可参考<a href="./config.html#root">配置文件</a>章节。</p>\n<p>比如：你的项目名为 <code>my-site</code> ，你就需要将 <code>root</code> 设置为 <code>/my-site/</code></p>\n<h3 id="%E5%AD%90%E7%9B%AE%E5%BD%95">子目录<a class="anchor" href="#%E5%AD%90%E7%9B%AE%E5%BD%95">§</a></h3>\n<p>如果你希望你的 <code>pagic</code> 运行于仓库的子目录中，你需要对 <code>ci.yml</code> 进行简单编辑：</p>\n<ul>\n<li>在 <code>Build gh-pages</code> 中的 <code>pagic build</code> 前面添加 <code>cd ./{sub-dir-name}</code></li>\n<li>将 <code>publish_dir</code> 更换为 <code>./{sub-dir-name}/dist</code>（加上子目录的路径）</li>\n</ul>\n<p><code>{sub-dir-name}</code> 就是你子目录的名称。</p>\n<h2 id="vercel">Vercel<a class="anchor" href="#vercel">§</a></h2>\n<p>在项目根目录创建 <code>deploy-vercel.sh</code> 文件：</p>\n<pre class="language-shell"><code class="language-shell"><span class="token shebang important">#!/bin/sh</span>\n\n<span class="token comment"># Install deno</span>\n<span class="token function">curl</span> -fsSL <a class="token url-link" href="https://deno.land/x/install/install.sh">https://deno.land/x/install/install.sh</a> <span class="token operator">|</span> <span class="token function">sh</span>\n\n<span class="token comment"># Install pagic</span>\n/vercel/.deno/bin/deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n\n<span class="token comment"># Pagic build</span>\n/vercel/.deno/bin/deno run --unstable --allow-read --allow-write --allow-net --allow-env --allow-run <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a> build\n</code></pre>\n<p>在 <code>package.json</code> 配置脚本命令：</p>\n<pre class="language-diff"><code class="language-diff">"scripts": {\n<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span>  "deploy:vercel": "sh deploy-vercel.sh"\n</span>},\n</code></pre>\n<p>接下来，在 <a href="https://vercel.com/">Vercel</a> 网站完成以下步骤：</p>\n<ol>\n<li>\n<p>在<a href="https://vercel.com/dashboard">首页</a>点击导入项目 (Import Project)</p>\n</li>\n<li>\n<p><a href="https://vercel.com/import/git">填写</a>仓库地址，从 Github <a href="https://vercel.com/import">导入</a>要部署的仓库，点击继续</p>\n</li>\n<li>\n<p>配置项目信息</p>\n<ul>\n<li>填写项目名，框架预设默认 Other 即可</li>\n<li>打包与输出配置，构建命令: <code>npm run deploy:vercel</code> 输出目录: <code>dist</code> (也可以根据自己的配置填写)</li>\n</ul>\n</li>\n<li>\n<p>点击部署，等待部署完成即可访问 🎊</p>\n</li>\n</ol>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "UA-45256157-16" }),
        React.createElement(React.Fragment, { key: ".1" },
            React.createElement(React.Fragment, { key: ".0" },
                React.createElement("script", { src: "/i18n.js", type: "module" })),
            React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" }))),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@18.2.0/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@18.2.0/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'language': {
        "code": "zh-CN",
        "name": "简体中文",
        "root": "/zh-CN/"
    },
    'contentTitle': React.createElement("h1", { key: "0" }, "\u90E8\u7F72"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>构建完成后的 <code>dist</code> 目录可以作为一个网站部署到你的服务器上。我们强烈推荐通过持续集成让部署过程自动化，下面列出几种常见的部署方式：</p>\n<h2 id="github-pages">GitHub Pages<a class="anchor" href="#github-pages">§</a></h2>\n<p>GitHub Pages 是最常见的一种托管静态网站的服务，通过 GitHub 官方提供的 CI 工具 <a href="https://github.com/features/actions">GitHub Actions</a>，我们可以轻松的实现提交代码后自动构建并部署网站。</p>\n<p>实现自动部署网站到 GitHub Pages 非常简单，只需要在你的 GitHub 项目中创建一个 <code>.github/workflows/ci.yml</code> 文件，内容如下：</p>\n<pre class="language-yml"><code class="language-yml"><span class="token key atrule">name</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages\n\n<span class="token key atrule">on</span><span class="token punctuation">:</span>\n  <span class="token key atrule">push</span><span class="token punctuation">:</span>\n    <span class="token key atrule">branches</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> master\n\n<span class="token key atrule">jobs</span><span class="token punctuation">:</span>\n  <span class="token key atrule">build-and-deploy</span><span class="token punctuation">:</span>\n    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span><span class="token number">18.04</span>\n    <span class="token key atrule">steps</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2\n\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup deno\n        <span class="token key atrule">uses</span><span class="token punctuation">:</span> denolib/setup<span class="token punctuation">-</span>deno@v2\n        <span class="token key atrule">with</span><span class="token punctuation">:</span>\n          <span class="token key atrule">deno-version</span><span class="token punctuation">:</span> v1.7.0\n\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build gh<span class="token punctuation">-</span>pages\n        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>\n          deno --version\n          deno install --unstable --allow-read --allow-write --allow-net --allow-env --allow-run --name=pagic https://deno.land/x/pagic@v1.6.3/mod.ts\n          <span>pagic build</span>\n\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy gh<span class="token punctuation">-</span>pages\n        <span class="token key atrule">uses</span><span class="token punctuation">:</span> peaceiris/actions<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>pages@v3\n        <span class="token key atrule">with</span><span class="token punctuation">:</span>\n          <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>\n          <span class="token key atrule">publish_dir</span><span class="token punctuation">:</span> ./dist\n          <span class="token key atrule">cname</span><span class="token punctuation">:</span> ts.xcatliu.com\n</code></pre><p>注意替换掉最后一行的 <code>ts.xcatliu.com</code> 为你自己的域名。</p>\n<p>如果没有自己的域名的话，也可以使用 GitHub 提供的免费域名 <code>xxx.github.io</code>，此时只要将最后一行删除即可。注意此时需要修改 <code>pagic.config.ts</code> 中的 <code>root</code> 配置来支持子路径，详细可参考<a href="./config.html#root">配置文件</a>章节。</p>\n<p>比如：你的项目名为 <code>my-site</code> ，你就需要将 <code>root</code> 设置为 <code>/my-site/</code></p>\n<h3 id="%E5%AD%90%E7%9B%AE%E5%BD%95">子目录<a class="anchor" href="#%E5%AD%90%E7%9B%AE%E5%BD%95">§</a></h3>\n<p>如果你希望你的 <code>pagic</code> 运行于仓库的子目录中，你需要对 <code>ci.yml</code> 进行简单编辑：</p>\n<ul>\n<li>在 <code>Build gh-pages</code> 中的 <code>pagic build</code> 前面添加 <code>cd ./{sub-dir-name}</code></li>\n<li>将 <code>publish_dir</code> 更换为 <code>./{sub-dir-name}/dist</code>（加上子目录的路径）</li>\n</ul>\n<p><code>{sub-dir-name}</code> 就是你子目录的名称。</p>\n<h2 id="vercel">Vercel<a class="anchor" href="#vercel">§</a></h2>\n<p>在项目根目录创建 <code>deploy-vercel.sh</code> 文件：</p>\n<pre class="language-shell"><code class="language-shell"><span class="token shebang important">#!/bin/sh</span>\n\n<span class="token comment"># Install deno</span>\n<span class="token function">curl</span> -fsSL <a class="token url-link" href="https://deno.land/x/install/install.sh">https://deno.land/x/install/install.sh</a> <span class="token operator">|</span> <span class="token function">sh</span>\n\n<span class="token comment"># Install pagic</span>\n/vercel/.deno/bin/deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n\n<span class="token comment"># Pagic build</span>\n/vercel/.deno/bin/deno run --unstable --allow-read --allow-write --allow-net --allow-env --allow-run <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a> build\n</code></pre>\n<p>在 <code>package.json</code> 配置脚本命令：</p>\n<pre class="language-diff"><code class="language-diff">"scripts": {\n<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span>  "deploy:vercel": "sh deploy-vercel.sh"\n</span>},\n</code></pre>\n<p>接下来，在 <a href="https://vercel.com/">Vercel</a> 网站完成以下步骤：</p>\n<ol>\n<li>\n<p>在<a href="https://vercel.com/dashboard">首页</a>点击导入项目 (Import Project)</p>\n</li>\n<li>\n<p><a href="https://vercel.com/import/git">填写</a>仓库地址，从 Github <a href="https://vercel.com/import">导入</a>要部署的仓库，点击继续</p>\n</li>\n<li>\n<p>配置项目信息</p>\n<ul>\n<li>填写项目名，框架预设默认 Other 即可</li>\n<li>打包与输出配置，构建命令: <code>npm run deploy:vercel</code> 输出目录: <code>dist</code> (也可以根据自己的配置填写)</li>\n</ul>\n</li>\n<li>\n<p>点击部署，等待部署完成即可访问 🎊</p>\n</li>\n</ol>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#github-pages" }, "GitHub Pages"),
                React.createElement("ol", null,
                    React.createElement("li", null,
                        React.createElement("a", { href: "#%E5%AD%90%E7%9B%AE%E5%BD%95" }, "\u5B50\u76EE\u5F55")))),
            React.createElement("li", null,
                React.createElement("a", { href: "#vercel" }, "Vercel")))),
    'author': "xcatliu",
    'contributors': [
        "xcatliu",
        "自然醒",
        "drizzlesconsin",
        "ZhuoEr Liu"
    ],
    'date': "2020-08-10T04:25:19.000Z",
    'updated': "2023-06-06T08:08:54.000Z",
    'excerpt': "构建完成后的 dist 目录可以作为一个网站部署到你的服务器上。我们强烈推荐通过持续集成让部署过程自动化，下面列出几种常见的部署方式： GitHub Pages GitHub Pages 是最常见的一种托管静态网站的服务，通过 GitHub 官方提供的...",
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
