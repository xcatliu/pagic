import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
var _a, _b;
export default {
    'prev': {
        "text": "Internationalization",
        "link": "docs/i18n.html"
    },
    'next': {
        "text": "Demos",
        "link": "docs/demos.html"
    },
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['en'], branch: 'master' },
    'pagePath': "docs/deployment.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/deployment.html",
    'title': "Deployment",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Deployment</h1>\n<p>The output <code>dist</code> directory can be deployed to your server as a website. We strongly recommend to use CI to automate the deployment process. Here are a few common deployment methods:</p>\n<h2 id="github-pages">GitHub Pages<a class="anchor" href="#github-pages">§</a></h2>\n<p>GitHub Pages is the most common service for hosting static websites. Through the official CI tool <a href="https://github.com/features/actions">GitHub Actions</a> provided by GitHub, we can automatically build and deploy the website.</p>\n<p>It is very simple to automatically build and deploy the website to GitHub Pages. You only need to create a <code>.github/workflows/ci.yml</code> file in your GitHub project with the following content:</p>\n<pre class="language-yml"><code class="language-yml"><span class="token key atrule">name</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages\n\n<span class="token key atrule">on</span><span class="token punctuation">:</span>\n  <span class="token key atrule">push</span><span class="token punctuation">:</span>\n    <span class="token key atrule">branches</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> master\n\n<span class="token key atrule">jobs</span><span class="token punctuation">:</span>\n  <span class="token key atrule">build-and-deploy</span><span class="token punctuation">:</span>\n    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span><span class="token number">18.04</span>\n    <span class="token key atrule">steps</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2\n\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup deno\n        <span class="token key atrule">uses</span><span class="token punctuation">:</span> denolib/setup<span class="token punctuation">-</span>deno@v2\n        <span class="token key atrule">with</span><span class="token punctuation">:</span>\n          <span class="token key atrule">deno-version</span><span class="token punctuation">:</span> v1.7.0\n\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build gh<span class="token punctuation">-</span>pages\n        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>\n          deno --version\n          deno install --unstable --allow-read --allow-write --allow-net --allow-run --name=pagic https://deno.land/x/pagic@v1.5.1/mod.ts\n          <span>pagic build</span>\n\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy gh<span class="token punctuation">-</span>pages\n        <span class="token key atrule">uses</span><span class="token punctuation">:</span> peaceiris/actions<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>pages@v3\n        <span class="token key atrule">with</span><span class="token punctuation">:</span>\n          <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>\n          <span class="token key atrule">publish_dir</span><span class="token punctuation">:</span> ./dist\n          <span class="token key atrule">cname</span><span class="token punctuation">:</span> ts.xcatliu.com\n</code></pre><p>Be sure to replace <code>ts.xcatliu.com</code> in the last line with your own domain.</p>\n<p>If you don\'t have your own domain, you can also use the free domain <code>xxx.github.io</code> provided by GitHub, just delete the last line. Note that you may need to modify the <code>root</code> configuration in <code>pagic.config.ts</code> to support sub-paths.</p>\n<p>For example: if your github project name is: <code>my-site</code> , then you should change <code>root</code> to <code>/my-site/</code>.</p>\n<h3 id="sub-directory">Sub Directory<a class="anchor" href="#sub-directory">§</a></h3>\n<p>If you want your <code>pagic</code> run in the project sub directory, you should edit the <code>ci.yml</code> configure:</p>\n<ul>\n<li>Add <code>cd ./{sub-dir-name}</code> before <code>pagic build</code> in <strong>Build gh-pages</strong>.</li>\n<li>Change <code>publish_dir</code> to <code>./{sub-dir-name}/dist</code></li>\n</ul>\n<p><code>{sub-dir-name}</code> is your sub-directory name.</p>\n<h2 id="vercel">Vercel<a class="anchor" href="#vercel">§</a></h2>\n<p>Create a <code>deploy-vercel.sh</code> file in the project root directory:</p>\n<pre class="language-shell"><code class="language-shell"><span class="token shebang important">#!/bin/sh</span>\n\n<span class="token comment"># Install deno</span>\n<span class="token function">curl</span> -fsSL <a class="token url-link" href="https://deno.land/x/install/install.sh">https://deno.land/x/install/install.sh</a> <span class="token operator">|</span> <span class="token function">sh</span>\n\n<span class="token comment"># Install pagic</span>\n/vercel/.deno/bin/deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n\n<span class="token comment"># Pagic build</span>\n/vercel/.deno/bin/deno run --unstable --allow-read --allow-write --allow-net --allow-run <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a> build\n</code></pre>\n<p>Configure script command in <code>package.json</code>:</p>\n<pre class="language-diff"><code class="language-diff">"scripts": {\n<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span>  "deploy:vercel": "sh deploy-vercel.sh"\n</span>},\n</code></pre>\n<p>Next, Complete the following steps on the vercel website:</p>\n<ol>\n<li>\n<p><a href="https://vercel.com/dashboard">Home</a> -- Overview -- <a href="https://vercel.com/import/git">Import Project</a></p>\n</li>\n<li>\n<p>Enter the URL of a git repository, Import git repository, click continue</p>\n</li>\n<li>\n<p>Configure project information</p>\n<ul>\n<li>Enter project name, framework preset defaults to Other</li>\n<li>Build and Output Settings, Build Command: <code>npm run deploy:vercel</code> Output Directory: <code>dist</code> (You can also fill in your own configuration)</li>\n</ul>\n</li>\n<li>\n<p>Click Deploy，Wait for deployment to complete to visit 🎊</p>\n</li>\n</ol>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "UA-45256157-16" }),
        React.createElement(React.Fragment, { key: ".1" },
            React.createElement(React.Fragment, { key: ".0" },
                React.createElement("script", { src: "/i18n.js", type: "module" })),
            React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" }))),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@17.0.2/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@17.0.2/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'language': {
        "code": "en",
        "name": "English",
        "root": "/"
    },
    'contentTitle': React.createElement("h1", { key: "0" }, "Deployment"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>The output <code>dist</code> directory can be deployed to your server as a website. We strongly recommend to use CI to automate the deployment process. Here are a few common deployment methods:</p>\n<h2 id="github-pages">GitHub Pages<a class="anchor" href="#github-pages">§</a></h2>\n<p>GitHub Pages is the most common service for hosting static websites. Through the official CI tool <a href="https://github.com/features/actions">GitHub Actions</a> provided by GitHub, we can automatically build and deploy the website.</p>\n<p>It is very simple to automatically build and deploy the website to GitHub Pages. You only need to create a <code>.github/workflows/ci.yml</code> file in your GitHub project with the following content:</p>\n<pre class="language-yml"><code class="language-yml"><span class="token key atrule">name</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages\n\n<span class="token key atrule">on</span><span class="token punctuation">:</span>\n  <span class="token key atrule">push</span><span class="token punctuation">:</span>\n    <span class="token key atrule">branches</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> master\n\n<span class="token key atrule">jobs</span><span class="token punctuation">:</span>\n  <span class="token key atrule">build-and-deploy</span><span class="token punctuation">:</span>\n    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span><span class="token number">18.04</span>\n    <span class="token key atrule">steps</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2\n\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup deno\n        <span class="token key atrule">uses</span><span class="token punctuation">:</span> denolib/setup<span class="token punctuation">-</span>deno@v2\n        <span class="token key atrule">with</span><span class="token punctuation">:</span>\n          <span class="token key atrule">deno-version</span><span class="token punctuation">:</span> v1.7.0\n\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build gh<span class="token punctuation">-</span>pages\n        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>\n          deno --version\n          deno install --unstable --allow-read --allow-write --allow-net --allow-run --name=pagic https://deno.land/x/pagic@v1.5.1/mod.ts\n          <span>pagic build</span>\n\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy gh<span class="token punctuation">-</span>pages\n        <span class="token key atrule">uses</span><span class="token punctuation">:</span> peaceiris/actions<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>pages@v3\n        <span class="token key atrule">with</span><span class="token punctuation">:</span>\n          <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>\n          <span class="token key atrule">publish_dir</span><span class="token punctuation">:</span> ./dist\n          <span class="token key atrule">cname</span><span class="token punctuation">:</span> ts.xcatliu.com\n</code></pre><p>Be sure to replace <code>ts.xcatliu.com</code> in the last line with your own domain.</p>\n<p>If you don\'t have your own domain, you can also use the free domain <code>xxx.github.io</code> provided by GitHub, just delete the last line. Note that you may need to modify the <code>root</code> configuration in <code>pagic.config.ts</code> to support sub-paths.</p>\n<p>For example: if your github project name is: <code>my-site</code> , then you should change <code>root</code> to <code>/my-site/</code>.</p>\n<h3 id="sub-directory">Sub Directory<a class="anchor" href="#sub-directory">§</a></h3>\n<p>If you want your <code>pagic</code> run in the project sub directory, you should edit the <code>ci.yml</code> configure:</p>\n<ul>\n<li>Add <code>cd ./{sub-dir-name}</code> before <code>pagic build</code> in <strong>Build gh-pages</strong>.</li>\n<li>Change <code>publish_dir</code> to <code>./{sub-dir-name}/dist</code></li>\n</ul>\n<p><code>{sub-dir-name}</code> is your sub-directory name.</p>\n<h2 id="vercel">Vercel<a class="anchor" href="#vercel">§</a></h2>\n<p>Create a <code>deploy-vercel.sh</code> file in the project root directory:</p>\n<pre class="language-shell"><code class="language-shell"><span class="token shebang important">#!/bin/sh</span>\n\n<span class="token comment"># Install deno</span>\n<span class="token function">curl</span> -fsSL <a class="token url-link" href="https://deno.land/x/install/install.sh">https://deno.land/x/install/install.sh</a> <span class="token operator">|</span> <span class="token function">sh</span>\n\n<span class="token comment"># Install pagic</span>\n/vercel/.deno/bin/deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n\n<span class="token comment"># Pagic build</span>\n/vercel/.deno/bin/deno run --unstable --allow-read --allow-write --allow-net --allow-run <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a> build\n</code></pre>\n<p>Configure script command in <code>package.json</code>:</p>\n<pre class="language-diff"><code class="language-diff">"scripts": {\n<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span>  "deploy:vercel": "sh deploy-vercel.sh"\n</span>},\n</code></pre>\n<p>Next, Complete the following steps on the vercel website:</p>\n<ol>\n<li>\n<p><a href="https://vercel.com/dashboard">Home</a> -- Overview -- <a href="https://vercel.com/import/git">Import Project</a></p>\n</li>\n<li>\n<p>Enter the URL of a git repository, Import git repository, click continue</p>\n</li>\n<li>\n<p>Configure project information</p>\n<ul>\n<li>Enter project name, framework preset defaults to Other</li>\n<li>Build and Output Settings, Build Command: <code>npm run deploy:vercel</code> Output Directory: <code>dist</code> (You can also fill in your own configuration)</li>\n</ul>\n</li>\n<li>\n<p>Click Deploy，Wait for deployment to complete to visit 🎊</p>\n</li>\n</ol>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#github-pages" }, "GitHub Pages"),
                React.createElement("ol", null,
                    React.createElement("li", null,
                        React.createElement("a", { href: "#sub-directory" }, "Sub Directory")))),
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
    'updated': "2021-10-14T07:55:32.000Z",
    'excerpt': "The output dist directory can be deployed to your server as a website. We strongly recommend to use CI to automate the deployment process. Here are a few common deployment methods: GitHub Pages GitHub Pages is ...",
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
    },
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
            "text": "Blog",
            "link": "docs/blog.html",
            "pagePath": "docs/blog.md"
        },
        {
            "text": "Internationalization",
            "link": "docs/i18n.html",
            "pagePath": "docs/i18n.md"
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
    ]
};
