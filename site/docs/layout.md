# `_layout.tsx`

`_layout.tsx` 是 Pagic 的核心理念之一。

## 什么是 `_layout.tsx`？

`_layout.tsx` 可以理解为 Pagic 在渲染时的模版文件，所有页面文件（`md/tsx`）在渲染时都会以 `_layout.tsx` 为模版。

我们在上一章的 `site` 项目中创建一个 `_layout.tsx`：

```
site/
├── _layout.tsx
├── pagic.config.ts
└── README.md
```

其中 `_layout.tsx` 的内容如下：

```tsx
// @deno-types="https://deno.land/x/pagic@v0.8.6/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { PagicLayout } from 'https://deno.land/x/pagic@v0.8.6/mod.ts';

const Layout: PagicLayout = ({ title, content }) => (
  <html>
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
    </head>
    <body>
      {content}
      <p>Custom _layout.tsx</p>
    </body>
  </html>
);

export default Layout;
```

接下来我们运行：

```bash
pagic build --serve
```

然后打开 http://127.0.0.1:8000/，可以看到页面中除了有标题 `Hello world` 之外，还有一个段落 `Custom _layout.tsx`，这说明此页面是用 `_layout.tsx` 作为模版渲染出来的。

为什么在上一章中不需要 `_layout.tsx` 也可以构建出页面呢？

那是因为 Pagic 默认会使用 default 主题中的 `_layout.tsx` 文件作为模版。当我们创建一个自己的 `_layout.tsx` 时，就会覆盖掉主题中的 `_layout.tsx` 了。

## 子页面和子模版

`_layout.tsx` 的设计是符合直觉的，当我们创建子目录时，其中的页面会优先使用该目录下的 `_layout.tsx`，只有当子目录下没有 `_layout.tsx` 时才会向上级目录查找，直到找到 `_layout.tsx` 为止：

```
site/
├── _layout.tsx
├── pagic.config.ts
|── README.md
└── foo
    ├── README.md
    └── bar
        ├── _layout.tsx
        └── README.md
```

在上面的例子中，`site/foo/bar/README.md` 会使用同级目录下的 `site/foo/bar/_layout.tsx` 作为模版，而 `site/foo/README.md` 则会使用 `site/_layout.tsx` 作为模版。

> 通过 frontMatter 可以跳过此规则，强制指定一个模版。

## 模版组件

组件化是 React 的重要特性之一，我们当然可以通过拆分 `_layout.tsx` 为一个个小组件来复用代码。不过在 Pagic 中，由于需要支持 `tsx` 文件渲染为页面，所以我们需要对模版组件做一个约定——以 `_` 开头的组件为模版组件：

```
site/
├── _layout.tsx
├── _sidebar.tsx
├── hello.tsx
└── pagic.config.ts
```

在上面的例子中，`hello.tsx` 会被构建为 `dist/hello.html`，而 `_sidebar.tsx` 由于是 `_` 开头，所以不会被构建为页面。这样就可以实现对 `_layout.tsx` 的拆分，将 `Sidebar` 组件拆分到 `_sidebar.tsx` 文件中，然后在 `_layout.tsx` 中引用即可：

```tsx
// @deno-types="https://deno.land/x/pagic@v0.8.6/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { PagicLayout } from 'https://deno.land/x/pagic@v0.8.6/mod.ts';

import Sidebar from './_sidebar.tsx';

const Layout: PagicLayout = ({ title, content }) => (
  <html>
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
    </head>
    <body>
      <Sidebar />
      {content}
    </body>
  </html>
);

export default Layout;
```

## 文件名约定

除了模版文件（`_layout.tsx`）和页面文件（`md/tsx`）之外的其他文件会被视为静态资源，直接复制到 `dist` 目录下。

现将所有文件名约定汇总如下：

| 文件名                   | 描述                            |
| ------------------------ | ------------------------------- |
| 以 `.` 开头              | 隐藏文件，会被忽略              |
| `_layout.tsx`            | 模版文件                        |
| 以 `_` 开头的 `tsx` 文件 | 模版组件                        |
| 以 `md` 或 `tsx` 结尾    | 页面文件                        |
| 其他文件                 | 静态资源，会被直接复制到 `dist` |
