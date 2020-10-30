# 页面内容

Pagic 支持将 `md/tsx` 文件渲染成静态页面，下面将分别介绍这两种文件支持的特性。

## `md` 文件

Pagic 使用 [markdown-it](https://github.com/markdown-it/markdown-it) 来编译 Markdown 文件，它支持通过添加第三方插件来扩展原有的功能。

Pagic 支持了以下特性：

### `title`

文章中的第一个 `<h1>` 标签将会被提取出来作为整个页面的 `title`（再加上 `pagic.config.ts` 中的 `title` 作为后缀）。

若文章中没有 `<h1>` 标签，则会使用 `pagic.config.ts` 中的 `title` 作为页面的 `title`。

### `toc`

文章中所有的 `<h2>` 和 `<h3>` 标签会被提取出来作为页面的目录。

若文章中没有 `<h2>` 或 `<h3>`，则 `toc` 为 `undefined`。

可以通过[配置 `md.tocLevel`](./config.md#md) 来修改提取的标题等级。

### 标题中的锚点

文章中所有的 `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` 标签会被插入一个可点击的锚点 `§`。

可以通过[配置 `md.anchorLevel`](./config.md#md) 来修改会被插入锚点的标题等级。

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

不妨在[本页面的 GitHub 版](https://github.com/xcatliu/pagic/blob/master/zh-CN/pagic.org/docs/content.md#链接替换)试试吧。

需要注意的是，链接中的 `README.md` 不仅后缀会被替换为 `.html`，路径也会被替换为 `index`：

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

Markdown 文件的顶部允许设置一些头信息（frontMatter），它们将会作为 `props` 传递到 `_layout.tsx` 中，注意它的优先级是最高的，会覆盖掉任何插件添加的 `props`，比如：

设置 `outputPath` 可以指定输出页面的路径（默认情况下输出路径是文件路径）：

```md {2}
---
outputPath: foo/bar.html
---

# 页面内容

...
```

设置 `layoutPath` 可以指定本页面使用的模版文件：

```md {2}
---
layoutPath: blog/_layout.tsx
---

# 页面内容

...
```

设置 `toc` 为 `null` 可以禁用本页的目录：

```md {2}
---
toc: null
---

# 页面内容

...
```

设置 `prev` 或 `next` 可以指定上一页下一页的路径（需要配合 `prev_next` 插件）：

```md {2}
---
prev: README.md
---

# 页面内容

...
```

头信息的设置很灵活，搭配各种插件，或者自定义的 `_layout.tsx`，可以实现各种各样的效果。

### 科学公式 TeX (KaTeX)

行内公式：$E=mc^2$

```md
行内公式：$E=mc^2$
```

多行公式：

$$
\frac{1}{
  \Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{
  \frac25 \pi}} = 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {
    1+\frac{e^{-6\pi}}
    {1+\frac{e^{-8\pi}}{1+\cdots}}
  }
}
$$

```md
$$
\frac{1}{
  \Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{
  \frac25 \pi}} = 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {
    1+\frac{e^{-6\pi}}
    {1+\frac{e^{-8\pi}}{1+\cdots}}
  }
}
$$
```

### 通过 `git log` 获取 `author` 等信息

解析 Markdown 文件时，Pagic 会运行脚本来获取它的 `git log` 并提取其中的有用信息，它们包括：

- `author`: 该文件的第一个提交者
- `contributors`: 该文件的所有提交者（包括第一个提交者），以第一次提交的时间排序（先提交的排在前面）
- `date`: 该文件第一次提交时日期
- `updated`: 该文件最后一次提交的日期

这些信息都会写入到页面的 `props` 中。

### 局限性

目前 Pagic 的 Markdown 解析还存在一些局限性，这也是将来的改进方向：

- 不支持配置 `markdown-it` 的选项
- 不支持流程图等高级语法
- 不支持内嵌 jsx

## `tsx` 文件

`tsx` 文件渲染成静态页面是 Pagic 的特色之一，借助 React 组件的可编程性，极大的扩展了静态网站的能力。

### 基本用法

任何不以 `_` 开头的 `tsx` 文件都会被视为一个 `tsx` 页面文件。

我们不妨在之前的 `site` 项目中创建一个 `hello.tsx` 文件：

```{3}
site/
├── pagic.config.ts
├── hello.tsx
└── README.md
```

它的内容是：

```tsx
import { React } from 'https://deno.land/x/pagic/mod.ts';

const Hello = () => <h1>Hello world</h1>;

export default Hello;
```

接下来我们运行：

```bash
pagic build --serve
```

然后打开 http://127.0.0.1:8000/hello.html ，可以看到页面中显示出了 `Hello world`。

同时 `dist` 目录下多了一个 `hello.html` 文件：

```{3,6}
site/
|── dist    # 构建结果目录
|   |── hello.html
|   └── index.html
├── pagic.config.ts
├── hello.tsx
└── README.md
```

> `hello.tsx` 中的**默认导出**（`export default`）会被视为页面的内容。

### 逻辑脚本

Pagic 不仅会在渲染页面时执行 `tsx` 文件中的逻辑，而且其中的逻辑在浏览器中也会运行。

比如，我们可以使用 `React.setState` 实现一个计数器页面：

```tsx {4,9}
import { React } from 'https://deno.land/x/pagic/mod.ts';

const Hello = () => {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <h1>Hello world</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Count +1</button>
    </>
  );
};

export default Hello;
```

访问 [/hello.html](/hello.html) 可以查看其真实的渲染结果。

> 由于 `react.d.ts` 的限制，使用 `React` 的子方法时必须用 `React.xxx`，而不能在导入时将子方法直接导入（`import React, { useState } ...`）。

### 组件化

组件化是 React 的重要特性之一，我们可以通过拆分 `tsx` 页面为一个个子组件来复用代码。不过在 Pagic 中，由于需要支持 `tsx` 文件渲染为页面，所以我们需要对子组件做一个约定——以 `_` 开头的组件为子组件：

```{4}
site/
|── dist    # 构建结果目录
|   └── hello.html
├── _count.tsx
├── hello.tsx
└── pagic.config.ts
```

在上面的例子中，`hello.tsx` 会被构建为 `dist/hello.html`，而 `_count.tsx` 由于是 `_` 开头，所以不会被构建为页面。这样就可以实现对 `hello.tsx` 的拆分，将 `Count` 组件拆分到 `_count.tsx` 文件中，然后在 `hello.tsx` 中引用即可：

```tsx {3,8}
import { React } from 'https://deno.land/x/pagic/mod.ts';

import Count from './_count.tsx';

const Hello = () => (
  <>
    <h1>Hello world</h1>
    <Count />
  </>
);

export default Hello;
```

### 头信息

与 `md` 文件类似，`tsx` 文件也支持头信息，它是通过导出一个 `frontMatter` 对象实现的：

```tsx {7-9}
import { React } from 'https://deno.land/x/pagic/mod.ts';

const Hello = () => <h1>Hello world</h1>;

export default Hello;

export const frontMatter = {
  outputPath: 'foo/bar.html'
};
```

### 通过 `git log` 获取 `author` 等信息

同 `md` 文件一样，`tsx` 文件也会获取 `author`, `contributors`, `date`, `updated` 等信息并写入到页面的 `props` 中。

### 局限性

使用 `tsx` 文件同样存在一些局限性，这也是将来的改进方向：

- 不支持代码高亮
- 不支持内嵌 Markdown
- 不支持自动生成目录
