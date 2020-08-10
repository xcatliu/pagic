import projectConfig from '/pagic.config.js';
export default {
    'prev': {
        "text": "基本用法",
        "link": "docs/usage.html"
    },
    'next': {
        "text": "配置",
        "link": "docs/configuration.html"
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
            "text": "_layout.tsx",
            "link": "docs/layout.html",
            "pagePath": "docs/layout.md"
        },
        {
            "text": "配置",
            "link": "docs/configuration.html",
            "pagePath": "docs/configuration.md"
        },
        {
            "text": "内容",
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
    'pagePath': "docs/layout.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/layout.html",
    'title': "_layout.tsx",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1><code>_layout.tsx</code></h1>\n<p><code>_layout.tsx</code> 是 Pagic 的核心理念之一。</p>\n<h2 id="%E4%BB%80%E4%B9%88%E6%98%AF-_layout.tsx%EF%BC%9F">什么是 <code>_layout.tsx</code>？<a class="anchor" href="#%E4%BB%80%E4%B9%88%E6%98%AF-_layout.tsx%EF%BC%9F">§</a></h2>\n<p><code>_layout.tsx</code> 可以理解为 Pagic 在运行时的模版文件，所有页面文件（<code>md/tsx</code>）在渲染时都会以 <code>_layout.tsx</code> 为模版。</p>\n<p>我们在上一章的 <code>site</code> 项目中创建一个 <code>_layout.tsx</code>：</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n├── _layout<span class="token punctuation">.</span>tsx\n├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n└── README<span class="token punctuation">.</span>md\n</code></pre>\n<p>其中 <code>_layout.tsx</code> 的内容如下：</p>\n<pre class="language-tsx"><code class="language-tsx"><span class="token comment">// @deno-types="<a class="token url-link" href="https://deno.land/x/pagic@v0.8.6/src/types/react/v16.13.1/react.d.ts">https://deno.land/x/pagic@v0.8.6/src/types/react/v16.13.1/react.d.ts</a>"</span>\n<span class="token keyword">import</span> <span class="token maybe-class-name">React</span> <span class="token keyword">from</span> <span class="token string">\'<a class="token url-link" href="https://dev.jspm.io/react@16.13.1">https://dev.jspm.io/react@16.13.1</a>\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token maybe-class-name">PagicLayout</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'<a class="token url-link" href="https://deno.land/x/pagic@v0.8.6/mod.ts">https://deno.land/x/pagic@v0.8.6/mod.ts</a>\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token maybe-class-name">Layout</span><span class="token operator">:</span> <span class="token function-variable function"><span class="token maybe-class-name">PagicLayout</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> title<span class="token punctuation">,</span> content <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>title<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charSet</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token punctuation">{</span>content<span class="token punctuation">}</span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">Custom _layout.tsx</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span><span class="token plain-text">\n  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token maybe-class-name">Layout</span><span class="token punctuation">;</span>\n</code></pre>\n<p>接下来我们运行：</p>\n<pre class="language-bash"><code class="language-bash">pagic build --serve\n</code></pre>\n<p>然后打开 http://127.0.0.1:8000/，可以看到页面中除了有标题 <code>Hello world</code> 之外，还有一个段落 <code>Custom _layout.tsx</code>，这说明此页面是用 <code>_layout.tsx</code> 作为模版渲染出来的。</p>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E4%BB%80%E4%B9%88%E6%98%AF-_layout.tsx%EF%BC%9F">什么是 _layout.tsx？</a></li></ol></nav>'
        } })
};
