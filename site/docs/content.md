# 页面内容

Pagic 支持将 md 或 tsx 文件渲染成静态页面，下面将分别介绍这两种形式支持的特性。

## md 文件

Pagic 使用 [markdown-it](https://github.com/markdown-it/markdown-it) 来编译 Markdown 文件，它支持通过添加第三方插件来扩展原有的功能。Pagic 支持了以下特性：

### `title`

文章中的第一个 `<h1>` 标签将会被提取出来作为整个页面的 `title`（再加上 `pagic.config.ts` 中的 `title` 作为后缀）。

若文章中没有 `<h1>` 标签，则会使用 `pagic.config.ts` 中的 `title` 作为页面的 `title`。

### `toc`

文章中所有的 `<h2>` 和 `<h3>` 标签会被提取出来作为页面的 `toc`。

若文章中没有 `<h2>` 或 `<h3>`，则 `toc` 为 `undefined`。

### 标题中的锚点

文章中所有的 `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` 标签会被插入一个可点击的锚点 `§`。

### 链接替换

文章中的链接如果是以 `.md` 结尾，则会在构建过程中被替换为 `.html`，比如：

```md
[配置文件](./config.md)
```

会被构建为：

```html
<a href="./config.html">配置文件</a>
```

真实的构建结果：[配置文件](./config.md)，不妨点击看看跳转效果。

为什么要这么设计呢？

因为这样的链接不仅在生成的页面中支持点击跳转，在 GitHub 的 Markdown 预览中支持点击跳转，而且在 VSCode（或其他编辑器）中也支持 `cmd/ctrl + click` 跳转。

不妨在[本页面的 GitHub 版](https://github.com/xcatliu/pagic/blob/master/site/docs/content.md)试试吧。

需要注意的是，链接中的 `README.md` 不仅后缀会被替换为 `.html`，名字也会被替换为 `index`：

```md
[首页](/README.md)
```

会被构建为：

```html
<a href="/index.html">首页</a>
```

真实的构建结果：[首页](/README.md)，不妨点击看看跳转效果。

另外，如果链接是以 `http://` 或 `https://` 开头，则表示它是一个外部链接，那么无论后缀是什么都不会被替换了。

### 头信息

prev 为例

## tsx 文件

### 逻辑脚本

### 组件化

### 头信息

### 局限性

不支持代码高亮
