import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
var _a, _b;
export default {
    'prev': {
        "title": "介绍",
        "link": "zh-CN/docs/introduction.html"
    },
    'next': {
        "title": "配置文件",
        "link": "zh-CN/docs/config.html"
    },
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['zh-CN'] },
    'pagePath': "zh-CN/docs/usage.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "zh-CN/docs/usage.html",
    'title': "基本用法",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>基本用法</h1>\n<p>本章会介绍 Pagic 的安装和使用方式。</p>\n<h2 id="%E5%AE%89%E8%A3%85">安装<a class="anchor" href="#%E5%AE%89%E8%A3%85">§</a></h2>\n<h3 id="%E5%AE%89%E8%A3%85-deno">安装 Deno<a class="anchor" href="#%E5%AE%89%E8%A3%85-deno">§</a></h3>\n<p>Pagic 是基于 Deno 实现的，所以使用前需要先安装 Deno。</p>\n<pre class="language-bash"><code class="language-bash"><span class="token comment"># Shell (Mac, Linux):</span>\n<span class="token function">curl</span> -fsSL <a class="token url-link" href="https://deno.land/x/install/install.sh">https://deno.land/x/install/install.sh</a> <span class="token operator">|</span> <span class="token function">sh</span>\n</code></pre>\n<p>其他安装方式（PowerShell、Homebrew 等）可以参考 <a href="https://deno.land/#installation">Deno 官网</a>。</p>\n<p>中国大陆用户可以<a href="https://x.deno.js.cn/">使用镜像加速</a>安装。</p>\n<h3 id="%E5%AE%89%E8%A3%85-pagic">安装 Pagic<a class="anchor" href="#%E5%AE%89%E8%A3%85-pagic">§</a></h3>\n<p>执行以下命令来安装最新版本的 Pagic：</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net --allow-run --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n</code></pre>\n<p>若需要安装指定版本的 Pagic，则可以在安装的 URL 中加入版本号：</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net --allow-run --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic@v0.12.2/mod.ts">https://deno.land/x/pagic@v0.12.2/mod.ts</a>\n</code></pre>\n<blockquote>\n<p>Pagic 只会要求必须用到的权限，如果你希望更进一步限制 Pagic 运行时的权限，可以通过指定读写目录的方式加以限制：</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read<span class="token operator">=</span>/home/xcatliu/site --allow-write<span class="token operator">=</span>/home/xcatliu/site --allow-net --allow-run --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n</code></pre>\n</blockquote>\n<h3 id="%E9%80%9A%E8%BF%87-docker-%E5%AE%89%E8%A3%85">通过 Docker 安装<a class="anchor" href="#%E9%80%9A%E8%BF%87-docker-%E5%AE%89%E8%A3%85">§</a></h3>\n<p>执行以下命令可以通过 Docker 安装 Pagic：</p>\n<pre class="language-bash"><code class="language-bash"><span class="token builtin class-name">alias</span> <span class="token assign-left variable">pagic</span><span class="token operator">=</span><span class="token string">\'docker run -it --rm -v <span class="token environment constant">$PWD</span>:/pagic xcatliu/pagic\'</span>\n</code></pre>\n<p>需要注意的是，执行以上命令只会在当前 shell 生效，如果希望永久生效，建议将它写入到 <code>~/.bashrc</code> 或 <code>~/.bash_profile</code> 或 <code>~/.zshrc</code> 中。</p>\n<h2 id="%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE">初始化项目<a class="anchor" href="#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE">§</a></h2>\n<p>要使用 <code>pagic</code> 构建静态网站，则该项目<strong>至少需要包含</strong>一个 <code>pagic.config.ts</code> 配置文件和一个 <code>md/tsx</code> 页面文件：</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n└── README<span class="token punctuation">.</span>md\n</code></pre>\n<p>当然，<code>pagic.config.ts</code> 一开始可以只导出一个空对象：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<p><code>README.md</code> 可以是一个简单的 Markdown 文件：</p>\n<pre class="language-md"><code class="language-md"><span class="token title important"><span class="token punctuation">#</span> Hello world</span>\n</code></pre>\n<blockquote>\n<p>你可以运行以下命令一次性创建出上面的 <code>site</code> 项目：</p>\n<pre class="language-bash"><code class="language-bash"><span class="token function">mkdir</span> site <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> site <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">"export default {};"</span> <span class="token operator">></span> pagic.config.ts <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">"# Hello world"</span> <span class="token operator">></span> README.md\n</code></pre>\n</blockquote>\n<p>你也可以运行 <code>pagic init</code> 然后选择 <code>site</code> 在当前目录下生成一个 <code>pagic.config.ts</code> 文件。</p>\n<h2 id="%E8%BF%90%E8%A1%8C-pagic-build">运行 <code>pagic build</code><a class="anchor" href="#%E8%BF%90%E8%A1%8C-pagic-build">§</a></h2>\n<p>接下来，我们就可以在项目中使用 <code>pagic build</code> 命令了。它的基本用法如下：</p>\n<pre class="language-bash"><code class="language-bash"><span class="token comment"># 构建静态网站</span>\npagic build <span class="token punctuation">[</span>options<span class="token punctuation">]</span>\n<span class="token comment"># --watch   监听文件变动以重新构建</span>\n<span class="token comment"># --serve   启动本地服务，预览静态网站</span>\n<span class="token comment"># --port    指定本地服务的端口号</span>\n</code></pre>\n<p>不妨试试在 <code>site</code> 目录下运行以下代码：</p>\n<pre class="language-bash"><code class="language-bash">pagic build --watch --serve\n</code></pre>\n<p>然后用浏览器打开 <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a> ，看看是不是显示出 <code>Hello world</code> 了呢？</p>\n<p>注意，构建结果在 dist 目录中（这里隐藏了一些次要的文件）：</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n|── dist    # 构建结果目录\n|   └── index<span class="token punctuation">.</span>html\n├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n└── README<span class="token punctuation">.</span>md\n</code></pre>\n<blockquote>\n<p>一般的 Markdown 文件会被构建为同名的 HTML 文件，但是 <code>README.md</code> 被构建为了 <code>index.html</code>，这是一种人性化的处理，方便同时在 GitHub 中和静态网站中展示首页的内容。</p>\n</blockquote>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "G-JPPPP5EF38" }),
        React.createElement(React.Fragment, { key: ".1" },
            React.createElement(React.Fragment, { key: ".0" },
                React.createElement("script", { src: "/i18n.js", type: "module" })),
            React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" }))),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'language': {
        "code": "zh-CN",
        "name": "简体中文",
        "root": "/zh-CN/"
    },
    'contentTitle': React.createElement("h1", { key: "0" }, "\u57FA\u672C\u7528\u6CD5"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>本章会介绍 Pagic 的安装和使用方式。</p>\n<h2 id="%E5%AE%89%E8%A3%85">安装<a class="anchor" href="#%E5%AE%89%E8%A3%85">§</a></h2>\n<h3 id="%E5%AE%89%E8%A3%85-deno">安装 Deno<a class="anchor" href="#%E5%AE%89%E8%A3%85-deno">§</a></h3>\n<p>Pagic 是基于 Deno 实现的，所以使用前需要先安装 Deno。</p>\n<pre class="language-bash"><code class="language-bash"><span class="token comment"># Shell (Mac, Linux):</span>\n<span class="token function">curl</span> -fsSL <a class="token url-link" href="https://deno.land/x/install/install.sh">https://deno.land/x/install/install.sh</a> <span class="token operator">|</span> <span class="token function">sh</span>\n</code></pre>\n<p>其他安装方式（PowerShell、Homebrew 等）可以参考 <a href="https://deno.land/#installation">Deno 官网</a>。</p>\n<p>中国大陆用户可以<a href="https://x.deno.js.cn/">使用镜像加速</a>安装。</p>\n<h3 id="%E5%AE%89%E8%A3%85-pagic">安装 Pagic<a class="anchor" href="#%E5%AE%89%E8%A3%85-pagic">§</a></h3>\n<p>执行以下命令来安装最新版本的 Pagic：</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net --allow-run --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n</code></pre>\n<p>若需要安装指定版本的 Pagic，则可以在安装的 URL 中加入版本号：</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net --allow-run --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic@v0.12.2/mod.ts">https://deno.land/x/pagic@v0.12.2/mod.ts</a>\n</code></pre>\n<blockquote>\n<p>Pagic 只会要求必须用到的权限，如果你希望更进一步限制 Pagic 运行时的权限，可以通过指定读写目录的方式加以限制：</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read<span class="token operator">=</span>/home/xcatliu/site --allow-write<span class="token operator">=</span>/home/xcatliu/site --allow-net --allow-run --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n</code></pre>\n</blockquote>\n<h3 id="%E9%80%9A%E8%BF%87-docker-%E5%AE%89%E8%A3%85">通过 Docker 安装<a class="anchor" href="#%E9%80%9A%E8%BF%87-docker-%E5%AE%89%E8%A3%85">§</a></h3>\n<p>执行以下命令可以通过 Docker 安装 Pagic：</p>\n<pre class="language-bash"><code class="language-bash"><span class="token builtin class-name">alias</span> <span class="token assign-left variable">pagic</span><span class="token operator">=</span><span class="token string">\'docker run -it --rm -v <span class="token environment constant">$PWD</span>:/pagic xcatliu/pagic\'</span>\n</code></pre>\n<p>需要注意的是，执行以上命令只会在当前 shell 生效，如果希望永久生效，建议将它写入到 <code>~/.bashrc</code> 或 <code>~/.bash_profile</code> 或 <code>~/.zshrc</code> 中。</p>\n<h2 id="%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE">初始化项目<a class="anchor" href="#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE">§</a></h2>\n<p>要使用 <code>pagic</code> 构建静态网站，则该项目<strong>至少需要包含</strong>一个 <code>pagic.config.ts</code> 配置文件和一个 <code>md/tsx</code> 页面文件：</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n└── README<span class="token punctuation">.</span>md\n</code></pre>\n<p>当然，<code>pagic.config.ts</code> 一开始可以只导出一个空对象：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<p><code>README.md</code> 可以是一个简单的 Markdown 文件：</p>\n<pre class="language-md"><code class="language-md"><span class="token title important"><span class="token punctuation">#</span> Hello world</span>\n</code></pre>\n<blockquote>\n<p>你可以运行以下命令一次性创建出上面的 <code>site</code> 项目：</p>\n<pre class="language-bash"><code class="language-bash"><span class="token function">mkdir</span> site <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> site <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">"export default {};"</span> <span class="token operator">></span> pagic.config.ts <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">"# Hello world"</span> <span class="token operator">></span> README.md\n</code></pre>\n</blockquote>\n<p>你也可以运行 <code>pagic init</code> 然后选择 <code>site</code> 在当前目录下生成一个 <code>pagic.config.ts</code> 文件。</p>\n<h2 id="%E8%BF%90%E8%A1%8C-pagic-build">运行 <code>pagic build</code><a class="anchor" href="#%E8%BF%90%E8%A1%8C-pagic-build">§</a></h2>\n<p>接下来，我们就可以在项目中使用 <code>pagic build</code> 命令了。它的基本用法如下：</p>\n<pre class="language-bash"><code class="language-bash"><span class="token comment"># 构建静态网站</span>\npagic build <span class="token punctuation">[</span>options<span class="token punctuation">]</span>\n<span class="token comment"># --watch   监听文件变动以重新构建</span>\n<span class="token comment"># --serve   启动本地服务，预览静态网站</span>\n<span class="token comment"># --port    指定本地服务的端口号</span>\n</code></pre>\n<p>不妨试试在 <code>site</code> 目录下运行以下代码：</p>\n<pre class="language-bash"><code class="language-bash">pagic build --watch --serve\n</code></pre>\n<p>然后用浏览器打开 <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a> ，看看是不是显示出 <code>Hello world</code> 了呢？</p>\n<p>注意，构建结果在 dist 目录中（这里隐藏了一些次要的文件）：</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n|── dist    # 构建结果目录\n|   └── index<span class="token punctuation">.</span>html\n├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n└── README<span class="token punctuation">.</span>md\n</code></pre>\n<blockquote>\n<p>一般的 Markdown 文件会被构建为同名的 HTML 文件，但是 <code>README.md</code> 被构建为了 <code>index.html</code>，这是一种人性化的处理，方便同时在 GitHub 中和静态网站中展示首页的内容。</p>\n</blockquote>'
        } }),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E5%AE%89%E8%A3%85">安装</a><ol><li><a href="#%E5%AE%89%E8%A3%85-deno">安装 Deno</a></li><li><a href="#%E5%AE%89%E8%A3%85-pagic">安装 Pagic</a></li><li><a href="#%E9%80%9A%E8%BF%87-docker-%E5%AE%89%E8%A3%85">通过 Docker 安装</a></li></ol></li><li><a href="#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE">初始化项目</a></li><li><a href="#%E8%BF%90%E8%A1%8C-pagic-build">运行 pagic build</a></li></ol></nav>'
        } }),
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'date': "2020-08-10T04:25:19.000Z",
    'updated': "2020-11-11T13:23:07.000Z",
    'excerpt': "本章会介绍 Pagic 的安装和使用方式。 安装 安装 Deno Pagic 是基于 Deno 实现的，所以使用前需要先安装 Deno。 # Shell (Mac, Linux): curl -fsSL https://deno.land/x/install/install.sh | sh 其他安装方式（PowerShell、Ho...",
    'cover': undefined,
    'blog': {
        "isPost": false,
        "posts": [
            {
                "pagePath": "zh-CN/blog/design_pagic_config_ts.md",
                "title": "设计 pagic.config.ts",
                "link": "zh-CN/blog/design_pagic_config_ts.html",
                "date": "2020-07-12T00:00:00.000Z",
                "updated": "2020-10-12T13:36:11.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "excerpt": "作为一名资深博客爱好者，我热衷于折腾各种博客系统，写过多个博客主题。 终于，写主题也无法得到满足，我开始写博客系统了。 或者说是更广义的，静态网站生成器。 如今 Pagic 已经完成了一个雏形，我也邀请了一些朋友试用，经..."
            }
        ],
        "tags": [],
        "categories": []
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
            "title": "博客",
            "link": "zh-CN/docs/blog.html",
            "pagePath": "zh-CN/docs/blog.md"
        },
        {
            "title": "国际化",
            "link": "zh-CN/docs/i18n.html",
            "pagePath": "zh-CN/docs/i18n.md"
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
    ]
};
