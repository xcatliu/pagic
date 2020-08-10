import projectConfig from '/pagic.config.js';
export default {
    'prev': {
        "text": "介绍",
        "link": "docs/introduction.html"
    },
    'next': {
        "text": "配置文件",
        "link": "docs/config.html"
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
            "text": "_layout.tsx",
            "link": "docs/layout.html",
            "pagePath": "docs/layout.md"
        },
        {
            "text": "页面内容",
            "link": "docs/content.html",
            "pagePath": "docs/content.md"
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
        }
    ],
    config: { "root": "/", ...projectConfig },
    'pagePath': "docs/usage.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/usage.html",
    'title': "基本用法",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>基本用法</h1>\n<p>本章会介绍 Pagic 的安装和使用方式。</p>\n<h2 id="%E5%AE%89%E8%A3%85">安装<a class="anchor" href="#%E5%AE%89%E8%A3%85">§</a></h2>\n<h3 id="%E5%AE%89%E8%A3%85-deno">安装 Deno<a class="anchor" href="#%E5%AE%89%E8%A3%85-deno">§</a></h3>\n<p>Pagic 是基于 Deno 实现的，所以使用前需要先安装 Deno。</p>\n<pre class="language-bash"><code class="language-bash"><span class="token comment"># Shell (Mac, Linux):</span>\n<span class="token function">curl</span> -fsSL <a class="token url-link" href="https://deno.land/x/install/install.sh">https://deno.land/x/install/install.sh</a> <span class="token operator">|</span> <span class="token function">sh</span>\n</code></pre>\n<p>其他安装方式（PowerShell、Homebrew 等）可以参考 <a href="https://deno.land/#installation">Deno 官网</a>。</p>\n<p>中国大陆用户可以<a href="https://x.deno.js.cn/">使用镜像加速</a>安装。</p>\n<h3 id="%E5%AE%89%E8%A3%85-pagic">安装 Pagic<a class="anchor" href="#%E5%AE%89%E8%A3%85-pagic">§</a></h3>\n<p>执行以下命令以安装最新版本的 Pagic：</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net --name pagic <a class="token url-link" href="https://deno.land/x/pagic@v0.8.6/mod.ts">https://deno.land/x/pagic@v0.8.6/mod.ts</a>\n</code></pre>\n<p>若需要安装指定版本的 Pagic，则可以在安装的 url 中加入版本号：</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net --name pagic <a class="token url-link" href="https://deno.land/x/pagic@v0.8.6@v1.0.0/mod.ts">https://deno.land/x/pagic@v0.8.6@v1.0.0/mod.ts</a>\n</code></pre>\n<blockquote>\n<p>Pagic 只会要求必须用到的权限，如果你希望更进一步限制 Pagic 运行时的权限，可以通过指定读写目录的方式加以限制：</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read<span class="token operator">=</span>/home/xcatliu/site --allow-write<span class="token operator">=</span>/home/xcatliu/site --allow-net --name pagic <a class="token url-link" href="https://deno.land/x/pagic@v0.8.6/mod.ts">https://deno.land/x/pagic@v0.8.6/mod.ts</a>\n</code></pre>\n</blockquote>\n<h2 id="%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE">初始化项目<a class="anchor" href="#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE">§</a></h2>\n<p>要使用 <code>pagic</code> 构建静态网站，则该项目<strong>至少需要包含</strong>一个 <code>pagic.config.ts</code> 配置文件和一个 <code>md/tsx</code> 页面文件：</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n└── README<span class="token punctuation">.</span>md\n</code></pre>\n<p>当然，<code>pagic.config.ts</code> 一开始可以只导出一个空对象：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<p><code>README.md</code> 可以是一个简单的 Markdown 文件：</p>\n<pre class="language-md"><code class="language-md"><span class="token title important"><span class="token punctuation">#</span> Hello world</span>\n</code></pre>\n<blockquote>\n<p>你可以运行以下命令一次性创建出上面的 <code>site</code> 项目：</p>\n<pre class="language-bash"><code class="language-bash"><span class="token function">mkdir</span> site <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> site <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">"export default {};"</span> <span class="token operator">></span> pagic.config.ts <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">"# Hello world"</span> <span class="token operator">></span> README.md\n</code></pre>\n</blockquote>\n<h2 id="%E8%BF%90%E8%A1%8C-pagic-%E5%91%BD%E4%BB%A4">运行 <code>pagic</code> 命令<a class="anchor" href="#%E8%BF%90%E8%A1%8C-pagic-%E5%91%BD%E4%BB%A4">§</a></h2>\n<p>接下来，我们就可以在项目中使用 <code>pagic</code> 命令了。它的基本用法如下：</p>\n<pre class="language-bash"><code class="language-bash"><span class="token comment"># 构建静态网站</span>\npagic build <span class="token punctuation">[</span>options<span class="token punctuation">]</span>\n<span class="token comment"># --watch   监听文件变动以重新构建</span>\n<span class="token comment"># --serve   启动本地服务，预览静态网站</span>\n<span class="token comment"># --port    指定本地服务的端口号</span>\n</code></pre>\n<p>不妨试试在 <code>site</code> 目录下运行以下代码：</p>\n<pre class="language-bash"><code class="language-bash">pagic build --watch --serve\n</code></pre>\n<p>然后用浏览器打开 http://127.0.0.1:8000/，看看是不是显示出 <code>Hello world</code> 了呢？</p>\n<blockquote>\n<p>构建结果在 dist 目录中。</p>\n<p>需要注意的是，一般的 Markdown 文件会被构建为同名的 HTML 文件，但是 <code>README.md</code> 被构建为了 <code>index.html</code>，这是一种人性化的处理，方便同时在 GitHub 中和静态网站中展示首页的内容。</p>\n</blockquote>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E5%AE%89%E8%A3%85">安装</a><ol><li><a href="#%E5%AE%89%E8%A3%85-deno">安装 Deno</a></li><li><a href="#%E5%AE%89%E8%A3%85-pagic">安装 Pagic</a></li></ol></li><li><a href="#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE">初始化项目</a></li><li><a href="#%E8%BF%90%E8%A1%8C-pagic-%E5%91%BD%E4%BB%A4">运行 pagic 命令</a></li></ol></nav>'
        } })
};
