import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
var _a, _b;
export default {
    'prev': {
        "text": "页面内容",
        "link": "zh-CN/docs/content.html"
    },
    'next': {
        "text": "主题",
        "link": "zh-CN/docs/themes.html"
    },
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['zh-CN'], branch: 'master' },
    'pagePath': "zh-CN/docs/layout.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "zh-CN/docs/layout.html",
    'title': "_layout.tsx",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1><code>_layout.tsx</code></h1>\n<blockquote>\n<p>从这一章开始的内容是提供给需要深度定制的用户的，如果你只是简单使用 Pagic，那么可以直接跳到<a href="./blog.html">博客</a>章节。</p>\n</blockquote>\n<p><code>_layout.tsx</code> 是 Pagic 的核心理念之一。</p>\n<h2 id="%E4%BB%80%E4%B9%88%E6%98%AF-_layouttsx">什么是 <code>_layout.tsx</code><a class="anchor" href="#%E4%BB%80%E4%B9%88%E6%98%AF-_layouttsx">§</a></h2>\n<p><code>_layout.tsx</code> 可以理解为 Pagic 在渲染页面时的模版文件，所有页面文件（<code>md/tsx</code>）在渲染时都会以 <code>_layout.tsx</code> 为模版。</p>\n<p>我们不妨在之前的 <code>site</code> 项目中创建一个 <code>_layout.tsx</code>：</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n<span class="highlighted-line">├── _layout<span class="token punctuation">.</span>tsx</span>├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n└── README<span class="token punctuation">.</span>md\n</code></pre><p>其中 <code>_layout.tsx</code> 的内容如下：</p>\n<pre class="language-tsx"><code class="language-tsx"><span class="token keyword">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">React</span><span class="token punctuation">,</span> <span class="token maybe-class-name">PagicLayout</span> <span class="token punctuation">}</span></span> <span class="token keyword">from</span> <span class="token string">\'<a class="token url-link" href="https://deno.land/x/pagic@v1.6.1/mod.ts">https://deno.land/x/pagic@v1.6.1/mod.ts</a>\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token maybe-class-name">Layout</span><span class="token operator">:</span> <span class="token function-variable function">PagicLayout</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> title<span class="token punctuation">,</span> content <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>title<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charSet</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token punctuation">{</span>content<span class="token punctuation">}</span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">Custom _layout.tsx</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span><span class="token plain-text">\n  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token maybe-class-name">Layout</span><span class="token punctuation">;</span>\n</code></pre>\n<p>接下来我们运行：</p>\n<pre class="language-bash"><code class="language-bash">pagic build --serve\n</code></pre>\n<p>然后打开 <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a> ，可以看到页面中除了有标题 <code>Hello world</code> 之外，还有一个段落 <code>Custom _layout.tsx</code>，这说明此页面是用 <code>_layout.tsx</code> 作为模版渲染出来的。</p>\n<p>为什么在上一章中不需要 <code>_layout.tsx</code> 也可以构建出页面呢？</p>\n<p>那是因为 Pagic 默认会使用 default 主题中的 <code>_layout.tsx</code> 文件作为模版。当我们创建一个自己的 <code>_layout.tsx</code> 时，就会覆盖掉主题中的 <code>_layout.tsx</code> 了。</p>\n<h2 id="%E5%AD%90%E9%A1%B5%E9%9D%A2%E5%92%8C%E5%AD%90%E6%A8%A1%E7%89%88">子页面和子模版<a class="anchor" href="#%E5%AD%90%E9%A1%B5%E9%9D%A2%E5%92%8C%E5%AD%90%E6%A8%A1%E7%89%88">§</a></h2>\n<p><code>_layout.tsx</code> 的设计是符合直觉的，当我们创建子目录时，其中的页面会优先使用该目录下的 <code>_layout.tsx</code>，只有当子目录下没有 <code>_layout.tsx</code> 时才会向上级目录查找，直到找到 <code>_layout.tsx</code> 为止：</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n|── dist    # 构建结果目录\n|   |── index<span class="token punctuation">.</span>html\n|   └── foo\n|       ├── index<span class="token punctuation">.</span>html\n|       └── bar\n|           └── index<span class="token punctuation">.</span>html\n<span class="highlighted-line">├── _layout<span class="token punctuation">.</span>tsx</span>├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n|── README<span class="token punctuation">.</span>md\n└── foo\n    ├── README<span class="token punctuation">.</span>md\n    └── bar\n<span class="highlighted-line">        ├── _layout<span class="token punctuation">.</span>tsx</span>        └── README<span class="token punctuation">.</span>md\n</code></pre><p>在上面的例子中，<code>site/foo/bar/README.md</code> 会使用同级目录下的 <code>site/foo/bar/_layout.tsx</code> 作为模版，而 <code>site/foo/README.md</code> 则会使用 <code>site/_layout.tsx</code> 作为模版。</p>\n<blockquote>\n<p>通过配置页面头信息可以跳过此规则，强制指定一个模版。</p>\n</blockquote>\n<h2 id="%E7%BB%84%E4%BB%B6%E5%8C%96">组件化<a class="anchor" href="#%E7%BB%84%E4%BB%B6%E5%8C%96">§</a></h2>\n<p>组件化是 React 的重要特性之一，我们可以通过拆分 <code>_layout.tsx</code> 为一个个子组件来复用代码。不过在 Pagic 中，由于需要支持 <code>tsx</code> 文件渲染为页面，所以我们需要对子组件做一个约定——以 <code>_</code> 开头的组件为子组件：</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n|── dist    # 构建结果目录\n|   └── hello<span class="token punctuation">.</span>html\n├── _layout<span class="token punctuation">.</span>tsx\n<span class="highlighted-line">├── _sidebar<span class="token punctuation">.</span>tsx</span>├── hello<span class="token punctuation">.</span>tsx\n└── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n</code></pre><p>在上面的例子中，<code>hello.tsx</code> 会被构建为 <code>dist/hello.html</code>，而 <code>_sidebar.tsx</code> 由于是 <code>_</code> 开头，所以不会被构建为页面。这样就可以实现对 <code>_layout.tsx</code> 的拆分，将 <code>Sidebar</code> 组件拆分到 <code>_sidebar.tsx</code> 文件中，然后在 <code>_layout.tsx</code> 中引用即可：</p>\n<pre class="language-tsx"><code class="language-tsx"><span class="token keyword">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">React</span><span class="token punctuation">,</span> <span class="token maybe-class-name">PagicLayout</span> <span class="token punctuation">}</span></span> <span class="token keyword">from</span> <span class="token string">\'<a class="token url-link" href="https://deno.land/x/pagic@v1.6.1/mod.ts">https://deno.land/x/pagic@v1.6.1/mod.ts</a>\'</span><span class="token punctuation">;</span>\n\n<span class="highlighted-line"><span class="token keyword">import</span> <span class="token imports"><span class="token maybe-class-name">Sidebar</span></span> <span class="token keyword">from</span> <span class="token string">\'./_sidebar.tsx\'</span><span class="token punctuation">;</span></span>\n<span class="token keyword">const</span> <span class="token maybe-class-name">Layout</span><span class="token operator">:</span> <span class="token function-variable function">PagicLayout</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> title<span class="token punctuation">,</span> content <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>title<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charSet</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token plain-text"></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n<span class="highlighted-line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Sidebar</span></span> <span class="token punctuation">/></span></span><span class="token plain-text"></span></span>      <span class="token punctuation">{</span>content<span class="token punctuation">}</span><span class="token plain-text"></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token maybe-class-name">Layout</span><span class="token punctuation">;</span>\n</code></pre><h2 id="props"><code>props</code><a class="anchor" href="#props">§</a></h2>\n<p>注意到上面的例子中我们取用了 <code>props</code> 中的 <code>title</code> 和 <code>content</code>，那么除了这两个之外 <code>props</code> 中还有哪些属性可以使用呢？</p>\n<p>请参考下面的表格：</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>属性</th>\n<th>类型</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>title</code></td>\n<td><code>string</code></td>\n<td>页面的标题，一般会放到 <code>&lt;head&gt;&lt;title&gt;</code> 中</td>\n</tr>\n<tr>\n<td><code>content</code></td>\n<td><code>ReactElement</code></td>\n<td>页面的内容，一般会放到 <code>&lt;body&gt;</code> 中</td>\n</tr>\n<tr>\n<td><code>contentTitle</code></td>\n<td><code>ReactElement</code></td>\n<td><code>content</code> 中的标题，和 <code>contentBody</code> 配合使用可以在标题和正文之间插入内容</td>\n</tr>\n<tr>\n<td><code>contentBody</code></td>\n<td><code>ReactElement</code></td>\n<td><code>content</code> 中的正文，和 <code>contentTitle</code> 配合使用可以在标题和正文之间插入内容</td>\n</tr>\n<tr>\n<td><code>toc</code></td>\n<td><code>ReactElement</code></td>\n<td>页面的目录（Table of Content）</td>\n</tr>\n<tr>\n<td><code>author</code></td>\n<td><code>string</code></td>\n<td>该文件的第一个提交者</td>\n</tr>\n<tr>\n<td><code>contributors</code></td>\n<td><code>string[]</code></td>\n<td>该文件的所有提交者（包括第一个提交者），以第一次提交的时间排序（先提交的排在前面）</td>\n</tr>\n<tr>\n<td><code>date</code></td>\n<td><code>Date</code></td>\n<td>该文件第一次提交时的日期</td>\n</tr>\n<tr>\n<td><code>updated</code></td>\n<td><code>Date</code></td>\n<td>该文件最后一次提交的日期</td>\n</tr>\n<tr>\n<td><code>excerpt</code></td>\n<td><code>string</code></td>\n<td>文章的摘要，默认为文章的前 210 个字符</td>\n</tr>\n<tr>\n<td><code>cover</code></td>\n<td><code>string</code></td>\n<td>文章的头图（第一张图片）</td>\n</tr>\n<tr>\n<td><code>tags</code></td>\n<td><code>string[]</code></td>\n<td>文章的标签</td>\n</tr>\n<tr>\n<td><code>categories</code></td>\n<td><code>string[]</code></td>\n<td>文章的分类</td>\n</tr>\n<tr>\n<td><code>config</code></td>\n<td><code>PagicConfig</code></td>\n<td>Pagic <em>运行时</em><sup><a href="#sup-1">[1]</a></sup>的配置</td>\n</tr>\n<tr>\n<td><code>pagePath</code></td>\n<td><code>string</code></td>\n<td>页面路径，如 <code>docs/README.md</code></td>\n</tr>\n<tr>\n<td><code>layoutPath</code></td>\n<td><code>string</code></td>\n<td>页面的模版路径，如 <code>docs/_layout.tsx</code></td>\n</tr>\n<tr>\n<td><code>outputPath</code></td>\n<td><code>string</code></td>\n<td>页面的输出路径，如 <code>docs/index.html</code></td>\n</tr>\n<tr>\n<td><code>head</code></td>\n<td><code>ReactElement</code></td>\n<td>需要插入到 <code>&lt;head&gt;</code> 标签中的内容</td>\n</tr>\n<tr>\n<td><code>script</code></td>\n<td><code>ReactElement</code></td>\n<td>由 <code>script</code> 插件生成的 <code>ReactElement</code></td>\n</tr>\n<tr>\n<td><code>loading</code></td>\n<td><code>boolean</code></td>\n<td>页面是否在加载中</td>\n</tr>\n<tr>\n<td><code>sidebar</code></td>\n<td><code>PagePropsSidebar</code></td>\n<td>经 <code>sidebar</code> 插件解析后的对象</td>\n</tr>\n<tr>\n<td><code>prev</code></td>\n<td><code>PagePropsSidebar[0]</code></td>\n<td>上一页的详细信息</td>\n</tr>\n<tr>\n<td><code>next</code></td>\n<td><code>PagePropsSidebar[0]</code></td>\n<td>下一页的详细信息</td>\n</tr>\n<tr>\n<td><code>gitalk</code></td>\n<td><code>ReactElement</code></td>\n<td>由 <code>gitalk</code> 插件生成的 <code>ReactElement</code></td>\n</tr>\n<tr>\n<td><code>blog</code></td>\n<td>见<a href="./blog.html#props">博客</a>章节</td>\n<td>当前页面的博客信息</td>\n</tr>\n<tr>\n<td><code>language</code></td>\n<td>见<a href="./i18n.html#props">国际化</a>章节</td>\n<td>当前页面的语言</td>\n</tr>\n<tr>\n<td>其他</td>\n<td><code>any</code></td>\n<td>第三方插件也可能扩充 <code>props</code></td>\n</tr>\n</tbody>\n</table></div>\n<h2 id="%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90">静态资源<a class="anchor" href="#%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90">§</a></h2>\n<p>除了以上提到的特殊文件之外的其他文件均会被视为静态资源，直接复制到 <code>dist</code> 目录下。</p>\n<p>现将所有文件名约定汇总如下：</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>文件名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>以 <code>.</code> 开头</td>\n<td>隐藏文件，会被忽略</td>\n</tr>\n<tr>\n<td><code>pagic.config.ts</code> 或 <code>pagic.config.tsx</code></td>\n<td>配置文件</td>\n</tr>\n<tr>\n<td><code>_layout.tsx</code></td>\n<td>模版文件</td>\n</tr>\n<tr>\n<td>以 <code>_</code> 开头的 <code>tsx</code> 文件</td>\n<td>子组件</td>\n</tr>\n<tr>\n<td><code>md</code> 或 <code>tsx</code> 后缀的文件</td>\n<td>页面文件</td>\n</tr>\n<tr>\n<td>其他文件</td>\n<td>静态资源，会被直接复制到 <code>dist</code> 目录下</td>\n</tr>\n</tbody>\n</table></div>\n<h2 id="%E6%B3%A8%E8%A7%A3">注解<a class="anchor" href="#%E6%B3%A8%E8%A7%A3">§</a></h2>\n<ol>\n<li><span id="sup-1"></span>Pagic <em>运行时</em>的配置与 <code>pagic.config.ts</code> 中的配置会有少许差异</li>\n</ol>'
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
    'contentTitle': React.createElement("h1", { key: "0" },
        React.createElement("code", null, "_layout.tsx")),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<blockquote>\n<p>从这一章开始的内容是提供给需要深度定制的用户的，如果你只是简单使用 Pagic，那么可以直接跳到<a href="./blog.html">博客</a>章节。</p>\n</blockquote>\n<p><code>_layout.tsx</code> 是 Pagic 的核心理念之一。</p>\n<h2 id="%E4%BB%80%E4%B9%88%E6%98%AF-_layouttsx">什么是 <code>_layout.tsx</code><a class="anchor" href="#%E4%BB%80%E4%B9%88%E6%98%AF-_layouttsx">§</a></h2>\n<p><code>_layout.tsx</code> 可以理解为 Pagic 在渲染页面时的模版文件，所有页面文件（<code>md/tsx</code>）在渲染时都会以 <code>_layout.tsx</code> 为模版。</p>\n<p>我们不妨在之前的 <code>site</code> 项目中创建一个 <code>_layout.tsx</code>：</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n<span class="highlighted-line">├── _layout<span class="token punctuation">.</span>tsx</span>├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n└── README<span class="token punctuation">.</span>md\n</code></pre><p>其中 <code>_layout.tsx</code> 的内容如下：</p>\n<pre class="language-tsx"><code class="language-tsx"><span class="token keyword">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">React</span><span class="token punctuation">,</span> <span class="token maybe-class-name">PagicLayout</span> <span class="token punctuation">}</span></span> <span class="token keyword">from</span> <span class="token string">\'<a class="token url-link" href="https://deno.land/x/pagic@v1.6.1/mod.ts">https://deno.land/x/pagic@v1.6.1/mod.ts</a>\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token maybe-class-name">Layout</span><span class="token operator">:</span> <span class="token function-variable function">PagicLayout</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> title<span class="token punctuation">,</span> content <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>title<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charSet</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token punctuation">{</span>content<span class="token punctuation">}</span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">Custom _layout.tsx</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span><span class="token plain-text">\n  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token maybe-class-name">Layout</span><span class="token punctuation">;</span>\n</code></pre>\n<p>接下来我们运行：</p>\n<pre class="language-bash"><code class="language-bash">pagic build --serve\n</code></pre>\n<p>然后打开 <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a> ，可以看到页面中除了有标题 <code>Hello world</code> 之外，还有一个段落 <code>Custom _layout.tsx</code>，这说明此页面是用 <code>_layout.tsx</code> 作为模版渲染出来的。</p>\n<p>为什么在上一章中不需要 <code>_layout.tsx</code> 也可以构建出页面呢？</p>\n<p>那是因为 Pagic 默认会使用 default 主题中的 <code>_layout.tsx</code> 文件作为模版。当我们创建一个自己的 <code>_layout.tsx</code> 时，就会覆盖掉主题中的 <code>_layout.tsx</code> 了。</p>\n<h2 id="%E5%AD%90%E9%A1%B5%E9%9D%A2%E5%92%8C%E5%AD%90%E6%A8%A1%E7%89%88">子页面和子模版<a class="anchor" href="#%E5%AD%90%E9%A1%B5%E9%9D%A2%E5%92%8C%E5%AD%90%E6%A8%A1%E7%89%88">§</a></h2>\n<p><code>_layout.tsx</code> 的设计是符合直觉的，当我们创建子目录时，其中的页面会优先使用该目录下的 <code>_layout.tsx</code>，只有当子目录下没有 <code>_layout.tsx</code> 时才会向上级目录查找，直到找到 <code>_layout.tsx</code> 为止：</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n|── dist    # 构建结果目录\n|   |── index<span class="token punctuation">.</span>html\n|   └── foo\n|       ├── index<span class="token punctuation">.</span>html\n|       └── bar\n|           └── index<span class="token punctuation">.</span>html\n<span class="highlighted-line">├── _layout<span class="token punctuation">.</span>tsx</span>├── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n|── README<span class="token punctuation">.</span>md\n└── foo\n    ├── README<span class="token punctuation">.</span>md\n    └── bar\n<span class="highlighted-line">        ├── _layout<span class="token punctuation">.</span>tsx</span>        └── README<span class="token punctuation">.</span>md\n</code></pre><p>在上面的例子中，<code>site/foo/bar/README.md</code> 会使用同级目录下的 <code>site/foo/bar/_layout.tsx</code> 作为模版，而 <code>site/foo/README.md</code> 则会使用 <code>site/_layout.tsx</code> 作为模版。</p>\n<blockquote>\n<p>通过配置页面头信息可以跳过此规则，强制指定一个模版。</p>\n</blockquote>\n<h2 id="%E7%BB%84%E4%BB%B6%E5%8C%96">组件化<a class="anchor" href="#%E7%BB%84%E4%BB%B6%E5%8C%96">§</a></h2>\n<p>组件化是 React 的重要特性之一，我们可以通过拆分 <code>_layout.tsx</code> 为一个个子组件来复用代码。不过在 Pagic 中，由于需要支持 <code>tsx</code> 文件渲染为页面，所以我们需要对子组件做一个约定——以 <code>_</code> 开头的组件为子组件：</p>\n<pre class="language-autoit"><code class="language-autoit">site<span class="token operator">/</span>\n|── dist    # 构建结果目录\n|   └── hello<span class="token punctuation">.</span>html\n├── _layout<span class="token punctuation">.</span>tsx\n<span class="highlighted-line">├── _sidebar<span class="token punctuation">.</span>tsx</span>├── hello<span class="token punctuation">.</span>tsx\n└── pagic<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts\n</code></pre><p>在上面的例子中，<code>hello.tsx</code> 会被构建为 <code>dist/hello.html</code>，而 <code>_sidebar.tsx</code> 由于是 <code>_</code> 开头，所以不会被构建为页面。这样就可以实现对 <code>_layout.tsx</code> 的拆分，将 <code>Sidebar</code> 组件拆分到 <code>_sidebar.tsx</code> 文件中，然后在 <code>_layout.tsx</code> 中引用即可：</p>\n<pre class="language-tsx"><code class="language-tsx"><span class="token keyword">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">React</span><span class="token punctuation">,</span> <span class="token maybe-class-name">PagicLayout</span> <span class="token punctuation">}</span></span> <span class="token keyword">from</span> <span class="token string">\'<a class="token url-link" href="https://deno.land/x/pagic@v1.6.1/mod.ts">https://deno.land/x/pagic@v1.6.1/mod.ts</a>\'</span><span class="token punctuation">;</span>\n\n<span class="highlighted-line"><span class="token keyword">import</span> <span class="token imports"><span class="token maybe-class-name">Sidebar</span></span> <span class="token keyword">from</span> <span class="token string">\'./_sidebar.tsx\'</span><span class="token punctuation">;</span></span>\n<span class="token keyword">const</span> <span class="token maybe-class-name">Layout</span><span class="token operator">:</span> <span class="token function-variable function">PagicLayout</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> title<span class="token punctuation">,</span> content <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>title<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charSet</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token plain-text"></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n<span class="highlighted-line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Sidebar</span></span> <span class="token punctuation">/></span></span><span class="token plain-text"></span></span>      <span class="token punctuation">{</span>content<span class="token punctuation">}</span><span class="token plain-text"></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token maybe-class-name">Layout</span><span class="token punctuation">;</span>\n</code></pre><h2 id="props"><code>props</code><a class="anchor" href="#props">§</a></h2>\n<p>注意到上面的例子中我们取用了 <code>props</code> 中的 <code>title</code> 和 <code>content</code>，那么除了这两个之外 <code>props</code> 中还有哪些属性可以使用呢？</p>\n<p>请参考下面的表格：</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>属性</th>\n<th>类型</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>title</code></td>\n<td><code>string</code></td>\n<td>页面的标题，一般会放到 <code>&lt;head&gt;&lt;title&gt;</code> 中</td>\n</tr>\n<tr>\n<td><code>content</code></td>\n<td><code>ReactElement</code></td>\n<td>页面的内容，一般会放到 <code>&lt;body&gt;</code> 中</td>\n</tr>\n<tr>\n<td><code>contentTitle</code></td>\n<td><code>ReactElement</code></td>\n<td><code>content</code> 中的标题，和 <code>contentBody</code> 配合使用可以在标题和正文之间插入内容</td>\n</tr>\n<tr>\n<td><code>contentBody</code></td>\n<td><code>ReactElement</code></td>\n<td><code>content</code> 中的正文，和 <code>contentTitle</code> 配合使用可以在标题和正文之间插入内容</td>\n</tr>\n<tr>\n<td><code>toc</code></td>\n<td><code>ReactElement</code></td>\n<td>页面的目录（Table of Content）</td>\n</tr>\n<tr>\n<td><code>author</code></td>\n<td><code>string</code></td>\n<td>该文件的第一个提交者</td>\n</tr>\n<tr>\n<td><code>contributors</code></td>\n<td><code>string[]</code></td>\n<td>该文件的所有提交者（包括第一个提交者），以第一次提交的时间排序（先提交的排在前面）</td>\n</tr>\n<tr>\n<td><code>date</code></td>\n<td><code>Date</code></td>\n<td>该文件第一次提交时的日期</td>\n</tr>\n<tr>\n<td><code>updated</code></td>\n<td><code>Date</code></td>\n<td>该文件最后一次提交的日期</td>\n</tr>\n<tr>\n<td><code>excerpt</code></td>\n<td><code>string</code></td>\n<td>文章的摘要，默认为文章的前 210 个字符</td>\n</tr>\n<tr>\n<td><code>cover</code></td>\n<td><code>string</code></td>\n<td>文章的头图（第一张图片）</td>\n</tr>\n<tr>\n<td><code>tags</code></td>\n<td><code>string[]</code></td>\n<td>文章的标签</td>\n</tr>\n<tr>\n<td><code>categories</code></td>\n<td><code>string[]</code></td>\n<td>文章的分类</td>\n</tr>\n<tr>\n<td><code>config</code></td>\n<td><code>PagicConfig</code></td>\n<td>Pagic <em>运行时</em><sup><a href="#sup-1">[1]</a></sup>的配置</td>\n</tr>\n<tr>\n<td><code>pagePath</code></td>\n<td><code>string</code></td>\n<td>页面路径，如 <code>docs/README.md</code></td>\n</tr>\n<tr>\n<td><code>layoutPath</code></td>\n<td><code>string</code></td>\n<td>页面的模版路径，如 <code>docs/_layout.tsx</code></td>\n</tr>\n<tr>\n<td><code>outputPath</code></td>\n<td><code>string</code></td>\n<td>页面的输出路径，如 <code>docs/index.html</code></td>\n</tr>\n<tr>\n<td><code>head</code></td>\n<td><code>ReactElement</code></td>\n<td>需要插入到 <code>&lt;head&gt;</code> 标签中的内容</td>\n</tr>\n<tr>\n<td><code>script</code></td>\n<td><code>ReactElement</code></td>\n<td>由 <code>script</code> 插件生成的 <code>ReactElement</code></td>\n</tr>\n<tr>\n<td><code>loading</code></td>\n<td><code>boolean</code></td>\n<td>页面是否在加载中</td>\n</tr>\n<tr>\n<td><code>sidebar</code></td>\n<td><code>PagePropsSidebar</code></td>\n<td>经 <code>sidebar</code> 插件解析后的对象</td>\n</tr>\n<tr>\n<td><code>prev</code></td>\n<td><code>PagePropsSidebar[0]</code></td>\n<td>上一页的详细信息</td>\n</tr>\n<tr>\n<td><code>next</code></td>\n<td><code>PagePropsSidebar[0]</code></td>\n<td>下一页的详细信息</td>\n</tr>\n<tr>\n<td><code>gitalk</code></td>\n<td><code>ReactElement</code></td>\n<td>由 <code>gitalk</code> 插件生成的 <code>ReactElement</code></td>\n</tr>\n<tr>\n<td><code>blog</code></td>\n<td>见<a href="./blog.html#props">博客</a>章节</td>\n<td>当前页面的博客信息</td>\n</tr>\n<tr>\n<td><code>language</code></td>\n<td>见<a href="./i18n.html#props">国际化</a>章节</td>\n<td>当前页面的语言</td>\n</tr>\n<tr>\n<td>其他</td>\n<td><code>any</code></td>\n<td>第三方插件也可能扩充 <code>props</code></td>\n</tr>\n</tbody>\n</table></div>\n<h2 id="%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90">静态资源<a class="anchor" href="#%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90">§</a></h2>\n<p>除了以上提到的特殊文件之外的其他文件均会被视为静态资源，直接复制到 <code>dist</code> 目录下。</p>\n<p>现将所有文件名约定汇总如下：</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>文件名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>以 <code>.</code> 开头</td>\n<td>隐藏文件，会被忽略</td>\n</tr>\n<tr>\n<td><code>pagic.config.ts</code> 或 <code>pagic.config.tsx</code></td>\n<td>配置文件</td>\n</tr>\n<tr>\n<td><code>_layout.tsx</code></td>\n<td>模版文件</td>\n</tr>\n<tr>\n<td>以 <code>_</code> 开头的 <code>tsx</code> 文件</td>\n<td>子组件</td>\n</tr>\n<tr>\n<td><code>md</code> 或 <code>tsx</code> 后缀的文件</td>\n<td>页面文件</td>\n</tr>\n<tr>\n<td>其他文件</td>\n<td>静态资源，会被直接复制到 <code>dist</code> 目录下</td>\n</tr>\n</tbody>\n</table></div>\n<h2 id="%E6%B3%A8%E8%A7%A3">注解<a class="anchor" href="#%E6%B3%A8%E8%A7%A3">§</a></h2>\n<ol>\n<li><span id="sup-1"></span>Pagic <em>运行时</em>的配置与 <code>pagic.config.ts</code> 中的配置会有少许差异</li>\n</ol>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E4%BB%80%E4%B9%88%E6%98%AF-_layouttsx" }, "\u4EC0\u4E48\u662F _layout.tsx")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%AD%90%E9%A1%B5%E9%9D%A2%E5%92%8C%E5%AD%90%E6%A8%A1%E7%89%88" }, "\u5B50\u9875\u9762\u548C\u5B50\u6A21\u7248")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E7%BB%84%E4%BB%B6%E5%8C%96" }, "\u7EC4\u4EF6\u5316")),
            React.createElement("li", null,
                React.createElement("a", { href: "#props" }, "props")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90" }, "\u9759\u6001\u8D44\u6E90")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E6%B3%A8%E8%A7%A3" }, "\u6CE8\u89E3")))),
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'date': "2020-08-10T04:25:19.000Z",
    'updated': "2023-03-03T07:28:55.000Z",
    'excerpt': "_layout.tsx 是 Pagic 的核心理念之一。 什么是 _layout.tsx _layout.tsx 可以理解为 Pagic 在渲染页面时的模版文件，所有页面文件（md/tsx）在渲染时都会以 _layout.tsx 为模版。 我们不妨在之前的 site 项目中创建一个 _layo...",
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
