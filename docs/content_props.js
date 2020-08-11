import projectConfig from '/pagic.config.js';
export default {
    'prev': {
        "text": "配置文件",
        "link": "docs/config.html"
    },
    'next': {
        "text": "_layout.tsx",
        "link": "docs/layout.html"
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
            "text": "页面内容",
            "link": "docs/content.html",
            "pagePath": "docs/content.md"
        },
        {
            "text": "_layout.tsx",
            "link": "docs/layout.html",
            "pagePath": "docs/layout.md"
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
        },
        {
            "text": "样例",
            "link": "docs/recipes.html",
            "pagePath": "docs/recipes.md"
        },
        {
            "text": "局限性",
            "link": "docs/limitations.html",
            "pagePath": "docs/limitations.md"
        }
    ],
    config: { "root": "/", ...projectConfig },
    'pagePath': "docs/content.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/content.html",
    'title': "页面内容",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>页面内容</h1>\n<p>Pagic 支持将 md 或 tsx 文件渲染成静态页面，下面将分别介绍这两种形式支持的特性。</p>\n<h2 id="md-%E6%96%87%E4%BB%B6">md 文件<a class="anchor" href="#md-%E6%96%87%E4%BB%B6">§</a></h2>\n<p>Pagic 使用 <a href="https://github.com/markdown-it/markdown-it">markdown-it</a> 来编译 Markdown 文件，它支持通过添加第三方插件来扩展原有的功能。Pagic 支持了以下特性：</p>\n<h3 id="title"><code>title</code><a class="anchor" href="#title">§</a></h3>\n<p>文章中的第一个 <code>&lt;h1&gt;</code> 标签将会被提取出来作为整个页面的 <code>title</code>（再加上 <code>pagic.config.ts</code> 中的 <code>title</code> 作为后缀）。</p>\n<p>若文章中没有 <code>&lt;h1&gt;</code> 标签，则会使用 <code>pagic.config.ts</code> 中的 <code>title</code> 作为页面的 <code>title</code>。</p>\n<h3 id="toc"><code>toc</code><a class="anchor" href="#toc">§</a></h3>\n<p>文章中所有的 <code>&lt;h2&gt;</code> 和 <code>&lt;h3&gt;</code> 标签会被提取出来作为页面的 <code>toc</code>。</p>\n<p>若文章中没有 <code>&lt;h2&gt;</code> 或 <code>&lt;h3&gt;</code>，则 <code>toc</code> 为 <code>undefined</code>。</p>\n<h3 id="%E6%A0%87%E9%A2%98%E4%B8%AD%E7%9A%84%E9%94%9A%E7%82%B9">标题中的锚点<a class="anchor" href="#%E6%A0%87%E9%A2%98%E4%B8%AD%E7%9A%84%E9%94%9A%E7%82%B9">§</a></h3>\n<p>文章中所有的 <code>&lt;h2&gt;</code>, <code>&lt;h3&gt;</code>, <code>&lt;h4&gt;</code>, <code>&lt;h5&gt;</code>, <code>&lt;h6&gt;</code> 标签会被插入一个可点击的锚点 <code>§</code>。</p>\n<h3 id="%E9%93%BE%E6%8E%A5%E6%9B%BF%E6%8D%A2">链接替换<a class="anchor" href="#%E9%93%BE%E6%8E%A5%E6%9B%BF%E6%8D%A2">§</a></h3>\n<p>文章中的链接如果是以 <code>.md</code> 结尾，则会在构建过程中被替换为 <code>.html</code>，比如：</p>\n<pre class="language-md"><code class="language-md"><span class="token url">[<span class="token content">配置文件</span>](./config.md)</span>\n</code></pre>\n<p>会被构建为：</p>\n<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./config.html<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>配置文件<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n</code></pre>\n<p>真实的构建结果：<a href="./config.html">配置文件</a>，不妨点击看看跳转效果。</p>\n<p>为什么要这么设计呢？</p>\n<p>因为这样的链接不仅在生成的页面中支持点击跳转，在 GitHub 的 Markdown 预览中支持点击跳转，而且在 VSCode（或其他编辑器）中也支持 <code>cmd/ctrl + click</code> 跳转。</p>\n<p>不妨在<a href="https://github.com/xcatliu/pagic/blob/master/site/docs/content.md">本页面的 GitHub 版</a>试试吧。</p>\n<p>需要注意的是，链接中的 <code>README.md</code> 不仅后缀会被替换为 <code>.html</code>，名字也会被替换为 <code>index</code>：</p>\n<pre class="language-md"><code class="language-md"><span class="token url">[<span class="token content">首页</span>](/README.md)</span>\n</code></pre>\n<p>会被构建为：</p>\n<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/index.html<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>首页<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n</code></pre>\n<p>真实的构建结果：<a href="/index.html">首页</a>，不妨点击看看跳转效果。</p>\n<p>另外，如果链接是以 <code>http://</code> 或 <code>https://</code> 开头，则表示它是一个外部链接，那么无论后缀是什么都不会被替换了。</p>\n<h3 id="%E5%A4%B4%E4%BF%A1%E6%81%AF">头信息<a class="anchor" href="#%E5%A4%B4%E4%BF%A1%E6%81%AF">§</a></h3>\n<p>prev 为例</p>\n<h2 id="tsx-%E6%96%87%E4%BB%B6">tsx 文件<a class="anchor" href="#tsx-%E6%96%87%E4%BB%B6">§</a></h2>\n<h3 id="%E9%80%BB%E8%BE%91%E8%84%9A%E6%9C%AC">逻辑脚本<a class="anchor" href="#%E9%80%BB%E8%BE%91%E8%84%9A%E6%9C%AC">§</a></h3>\n<h3 id="%E7%BB%84%E4%BB%B6%E5%8C%96">组件化<a class="anchor" href="#%E7%BB%84%E4%BB%B6%E5%8C%96">§</a></h3>\n<h3 id="%E5%A4%B4%E4%BF%A1%E6%81%AF-2">头信息<a class="anchor" href="#%E5%A4%B4%E4%BF%A1%E6%81%AF-2">§</a></h3>\n<h3 id="%E5%B1%80%E9%99%90%E6%80%A7">局限性<a class="anchor" href="#%E5%B1%80%E9%99%90%E6%80%A7">§</a></h3>\n<p>不支持代码高亮</p>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#md-%E6%96%87%E4%BB%B6">md 文件</a><ol><li><a href="#title">title</a></li><li><a href="#toc">toc</a></li><li><a href="#%E6%A0%87%E9%A2%98%E4%B8%AD%E7%9A%84%E9%94%9A%E7%82%B9">标题中的锚点</a></li><li><a href="#%E9%93%BE%E6%8E%A5%E6%9B%BF%E6%8D%A2">链接替换</a></li><li><a href="#%E5%A4%B4%E4%BF%A1%E6%81%AF">头信息</a></li></ol></li><li><a href="#tsx-%E6%96%87%E4%BB%B6">tsx 文件</a><ol><li><a href="#%E9%80%BB%E8%BE%91%E8%84%9A%E6%9C%AC">逻辑脚本</a></li><li><a href="#%E7%BB%84%E4%BB%B6%E5%8C%96">组件化</a></li><li><a href="#%E5%A4%B4%E4%BF%A1%E6%81%AF-2">头信息</a></li><li><a href="#%E5%B1%80%E9%99%90%E6%80%A7">局限性</a></li></ol></li></ol></nav>'
        } })
};
