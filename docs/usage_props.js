import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
var _a, _b;
export default {
    'prev': {
        "text": "Introduction",
        "link": "docs/introduction.html"
    },
    'next': {
        "text": "Config",
        "link": "docs/config.html"
    },
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['en'], branch: 'master' },
    'pagePath': "docs/usage.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/usage.html",
    'title': "Usage",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Usage</h1>\n<p>This chapter will introduce how to install and use Pagic.</p>\n<h2 id="installation">Installation<a class="anchor" href="#installation">§</a></h2>\n<h3 id="install-deno">Install Deno<a class="anchor" href="#install-deno">§</a></h3>\n<p>Pagic is based on Deno, so you need to install Deno before using it.</p>\n<pre class="language-bash"><code class="language-bash"><span class="token comment"># Shell (Mac, Linux):</span>\n<span class="token function">curl</span> -fsSL <a class="token url-link" href="https://deno.land/x/install/install.sh">https://deno.land/x/install/install.sh</a> <span class="token operator">|</span> <span class="token function">sh</span>\n</code></pre>\n<p>Other installation methods (PowerShell, Homebrew, etc.) can be found in <a href="https://deno.land/#installation">Deno official website</a>。</p>\n<h3 id="install-pagic">Install Pagic<a class="anchor" href="#install-pagic">§</a></h3>\n<p>Execute the following command to install the latest version of Pagic:</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net --allow-env --allow-run --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n</code></pre>\n<p>If you need to install a specific version of Pagic, you can add the version in the URL:</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net --allow-env --allow-run --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic@v1.6.1/mod.ts">https://deno.land/x/pagic@v1.6.1/mod.ts</a>\n</code></pre>\n<blockquote>\n<p>Pagic will only require the necessary permissions. If you want to further restrict Pagic\'s runtime permissions, you can limit it by specifying the read and write directories:</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read<span class="token operator">=</span>/home/xcatliu/site --allow-write<span class="token operator">=</span>/home/xcatliu/site --allow-net --allow-env --allow-run --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n</code></pre>\n</blockquote>\n<h3 id="install-via-docker">Install via Docker<a class="anchor" href="#install-via-docker">§</a></h3>\n<p>Execute the following command to install Pagic via Docker:</p>\n<pre class="language-bash"><code class="language-bash"><span class="token builtin class-name">alias</span> <span class="token assign-left variable">pagic</span><span class="token operator">=</span><span class="token string">\'docker run -it --rm -v <span class="token environment constant">$PWD</span>:/pagic xcatliu/pagic\'</span>\n</code></pre>\n<p>It should be noted that executing the above command will only take effect in the current shell. If you want to take effect permanently, it is recommended to write it in <code>~/.bashrc</code> or <code>~/.bash_profile</code> or <code>~/.zshrc</code>.</p>\n<h2 id="initialize-the-project">Initialize the project<a class="anchor" href="#initialize-the-project">§</a></h2>\n<p>To use <code>pagic</code> to build a static website, the project must include at least one <code>pagic.config.ts</code> config file and one <code>md/tsx</code> page file:</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n└── README<span class="token punctuation">.</span>md\n</code></pre>\n<p>Of course, <code>pagic.config.ts</code> can only export an empty object at the beginning:</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<p><code>README.md</code> can be a simple markdown file:</p>\n<pre class="language-md"><code class="language-md"><span class="token title important"><span class="token punctuation">#</span> Hello world</span>\n</code></pre>\n<blockquote>\n<p>You can create the above <code>site</code> project by running the following command:</p>\n<pre class="language-bash"><code class="language-bash"><span class="token function">mkdir</span> site <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> site <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">"export default {};"</span> <span class="token operator">></span> pagic.config.ts <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">"# Hello world"</span> <span class="token operator">></span> README.md\n</code></pre>\n</blockquote>\n<p>You can also run <code>pagic init</code> and select <code>site</code> to generate a <code>pagic.config.ts</code> file in the current directory.</p>\n<h2 id="run-pagic-build">Run <code>pagic build</code><a class="anchor" href="#run-pagic-build">§</a></h2>\n<p>Next, we can use the <code>pagic build</code> command in the project. Its basic usage is as follows:</p>\n<pre class="language-bash"><code class="language-bash"><span class="token comment"># Build a static website</span>\npagic build <span class="token punctuation">[</span>options<span class="token punctuation">]</span>\n<span class="token comment"># --watch   Watch file changes to rebuild</span>\n<span class="token comment"># --serve   Start local service, preview static website</span>\n<span class="token comment"># --port    Specify the port of the local service</span>\n</code></pre>\n<p>Try running the following code in the <code>site</code> directory:</p>\n<pre class="language-bash"><code class="language-bash">pagic build --watch --serve\n</code></pre>\n<p>Then open <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a> with a browser, and see if it shows <code>Hello world</code>?</p>\n<p>Note that the build result is in the dist directory (some minor files are hidden here):</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n|── dist    # Output directory\n|   └── index<span class="token punctuation">.</span>html\n├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n└── README<span class="token punctuation">.</span>md\n</code></pre>\n<blockquote>\n<p>Normal markdown files will be constructed as HTML files with the same name, but <code>README.md</code> is constructed as <code>index.html</code>, which is a kind of humanized processing, which is convenient for displaying the content of the homepage in GitHub and static websites at the same time .</p>\n</blockquote>'
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
        "code": "en",
        "name": "English",
        "root": "/"
    },
    'contentTitle': React.createElement("h1", { key: "0" }, "Usage"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>This chapter will introduce how to install and use Pagic.</p>\n<h2 id="installation">Installation<a class="anchor" href="#installation">§</a></h2>\n<h3 id="install-deno">Install Deno<a class="anchor" href="#install-deno">§</a></h3>\n<p>Pagic is based on Deno, so you need to install Deno before using it.</p>\n<pre class="language-bash"><code class="language-bash"><span class="token comment"># Shell (Mac, Linux):</span>\n<span class="token function">curl</span> -fsSL <a class="token url-link" href="https://deno.land/x/install/install.sh">https://deno.land/x/install/install.sh</a> <span class="token operator">|</span> <span class="token function">sh</span>\n</code></pre>\n<p>Other installation methods (PowerShell, Homebrew, etc.) can be found in <a href="https://deno.land/#installation">Deno official website</a>。</p>\n<h3 id="install-pagic">Install Pagic<a class="anchor" href="#install-pagic">§</a></h3>\n<p>Execute the following command to install the latest version of Pagic:</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net --allow-env --allow-run --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n</code></pre>\n<p>If you need to install a specific version of Pagic, you can add the version in the URL:</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net --allow-env --allow-run --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic@v1.6.1/mod.ts">https://deno.land/x/pagic@v1.6.1/mod.ts</a>\n</code></pre>\n<blockquote>\n<p>Pagic will only require the necessary permissions. If you want to further restrict Pagic\'s runtime permissions, you can limit it by specifying the read and write directories:</p>\n<pre class="language-bash"><code class="language-bash">deno <span class="token function">install</span> --unstable --allow-read<span class="token operator">=</span>/home/xcatliu/site --allow-write<span class="token operator">=</span>/home/xcatliu/site --allow-net --allow-env --allow-run --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n</code></pre>\n</blockquote>\n<h3 id="install-via-docker">Install via Docker<a class="anchor" href="#install-via-docker">§</a></h3>\n<p>Execute the following command to install Pagic via Docker:</p>\n<pre class="language-bash"><code class="language-bash"><span class="token builtin class-name">alias</span> <span class="token assign-left variable">pagic</span><span class="token operator">=</span><span class="token string">\'docker run -it --rm -v <span class="token environment constant">$PWD</span>:/pagic xcatliu/pagic\'</span>\n</code></pre>\n<p>It should be noted that executing the above command will only take effect in the current shell. If you want to take effect permanently, it is recommended to write it in <code>~/.bashrc</code> or <code>~/.bash_profile</code> or <code>~/.zshrc</code>.</p>\n<h2 id="initialize-the-project">Initialize the project<a class="anchor" href="#initialize-the-project">§</a></h2>\n<p>To use <code>pagic</code> to build a static website, the project must include at least one <code>pagic.config.ts</code> config file and one <code>md/tsx</code> page file:</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n└── README<span class="token punctuation">.</span>md\n</code></pre>\n<p>Of course, <code>pagic.config.ts</code> can only export an empty object at the beginning:</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<p><code>README.md</code> can be a simple markdown file:</p>\n<pre class="language-md"><code class="language-md"><span class="token title important"><span class="token punctuation">#</span> Hello world</span>\n</code></pre>\n<blockquote>\n<p>You can create the above <code>site</code> project by running the following command:</p>\n<pre class="language-bash"><code class="language-bash"><span class="token function">mkdir</span> site <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> site <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">"export default {};"</span> <span class="token operator">></span> pagic.config.ts <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">"# Hello world"</span> <span class="token operator">></span> README.md\n</code></pre>\n</blockquote>\n<p>You can also run <code>pagic init</code> and select <code>site</code> to generate a <code>pagic.config.ts</code> file in the current directory.</p>\n<h2 id="run-pagic-build">Run <code>pagic build</code><a class="anchor" href="#run-pagic-build">§</a></h2>\n<p>Next, we can use the <code>pagic build</code> command in the project. Its basic usage is as follows:</p>\n<pre class="language-bash"><code class="language-bash"><span class="token comment"># Build a static website</span>\npagic build <span class="token punctuation">[</span>options<span class="token punctuation">]</span>\n<span class="token comment"># --watch   Watch file changes to rebuild</span>\n<span class="token comment"># --serve   Start local service, preview static website</span>\n<span class="token comment"># --port    Specify the port of the local service</span>\n</code></pre>\n<p>Try running the following code in the <code>site</code> directory:</p>\n<pre class="language-bash"><code class="language-bash">pagic build --watch --serve\n</code></pre>\n<p>Then open <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a> with a browser, and see if it shows <code>Hello world</code>?</p>\n<p>Note that the build result is in the dist directory (some minor files are hidden here):</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n|── dist    # Output directory\n|   └── index<span class="token punctuation">.</span>html\n├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n└── README<span class="token punctuation">.</span>md\n</code></pre>\n<blockquote>\n<p>Normal markdown files will be constructed as HTML files with the same name, but <code>README.md</code> is constructed as <code>index.html</code>, which is a kind of humanized processing, which is convenient for displaying the content of the homepage in GitHub and static websites at the same time .</p>\n</blockquote>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#installation" }, "Installation"),
                React.createElement("ol", null,
                    React.createElement("li", null,
                        React.createElement("a", { href: "#install-deno" }, "Install Deno")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#install-pagic" }, "Install Pagic")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#install-via-docker" }, "Install via Docker")))),
            React.createElement("li", null,
                React.createElement("a", { href: "#initialize-the-project" }, "Initialize the project")),
            React.createElement("li", null,
                React.createElement("a", { href: "#run-pagic-build" }, "Run pagic build")))),
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'date': "2020-08-10T04:25:19.000Z",
    'updated': "2023-03-03T07:28:55.000Z",
    'excerpt': "This chapter will introduce how to install and use Pagic. Installation Install Deno Pagic is based on Deno, so you need to install Deno before using it. # Shell (Mac, Linux): curl -fsSL https://deno.land/x/inst...",
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
