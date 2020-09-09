# `_layout.tsx`

> 从这一章开始的内容是提供给需要深度定制的用户的，如果你只是简单使用 Pagic，那么可以直接跳到[部署](./deployment.md)章节。

`_layout.tsx` 是 Pagic 的核心理念之一。

## 什么是 `_layout.tsx`

`_layout.tsx` 可以理解为 Pagic 在渲染页面时的模版文件，所有页面文件（`md/tsx`）在渲染时都会以 `_layout.tsx` 为模版。

我们不妨在之前的 `site` 项目中创建一个 `_layout.tsx`：

```
site/
├── _layout.tsx
├── pagic.config.ts
└── README.md
```

其中 `_layout.tsx` 的内容如下：

```tsx
import { React, PagicLayout } from 'https://deno.land/x/pagic/mod.ts';

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

然后打开 http://127.0.0.1:8000/ ，可以看到页面中除了有标题 `Hello world` 之外，还有一个段落 `Custom _layout.tsx`，这说明此页面是用 `_layout.tsx` 作为模版渲染出来的。

为什么在上一章中不需要 `_layout.tsx` 也可以构建出页面呢？

那是因为 Pagic 默认会使用 default 主题中的 `_layout.tsx` 文件作为模版。当我们创建一个自己的 `_layout.tsx` 时，就会覆盖掉主题中的 `_layout.tsx` 了。

## 子页面和子模版

`_layout.tsx` 的设计是符合直觉的，当我们创建子目录时，其中的页面会优先使用该目录下的 `_layout.tsx`，只有当子目录下没有 `_layout.tsx` 时才会向上级目录查找，直到找到 `_layout.tsx` 为止：

```
site/
|── dist    # 构建结果目录
|   |── index.html
|   └── foo
|       ├── index.html
|       └── bar
|           └── index.html
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

> 通过配置页面头信息可以跳过此规则，强制指定一个模版。

## 组件化

组件化是 React 的重要特性之一，我们可以通过拆分 `_layout.tsx` 为一个个子组件来复用代码。不过在 Pagic 中，由于需要支持 `tsx` 文件渲染为页面，所以我们需要对子组件做一个约定——以 `_` 开头的组件为子组件：

```
site/
|── dist    # 构建结果目录
|   └── hello.html
├── _layout.tsx
├── _sidebar.tsx
├── hello.tsx
└── pagic.config.ts
```

在上面的例子中，`hello.tsx` 会被构建为 `dist/hello.html`，而 `_sidebar.tsx` 由于是 `_` 开头，所以不会被构建为页面。这样就可以实现对 `_layout.tsx` 的拆分，将 `Sidebar` 组件拆分到 `_sidebar.tsx` 文件中，然后在 `_layout.tsx` 中引用即可：

```tsx
import { React, PagicLayout } from 'https://deno.land/x/pagic/mod.ts';

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

## `props`

注意到上面的例子中我们取用了 `props` 中的 `title` 和 `content`，那么除了这两个之外 `props` 中还有哪些属性可以使用呢？

请参考下面的表格：

| 属性         | 类型                  | 依赖的插件            | 描述                                                      |
| ------------ | --------------------- | --------------------- | --------------------------------------------------------- |
| `title`      | `string`              | `md`, `tsx`           | 页面的标题，一般会放到 `<head><title>` 中                 |
| `content`    | `string`              | `md`, `tsx`, `layout` | 页面的内容，一般会放到 `<body>` 中                        |
| `config`     | `PagicConfig`         | `init`                | Pagic **运行时**的配置<sup><a href="#sup-1">[1]</a></sup> |
| `pagePath`   | `string`              | `init`                | 页面路径，如 `docs/README.md`                             |
| `layoutPath` | `string`              | `init`                | 页面的模版路径，如 `docs/_layout.tsx`                     |
| `outputPath` | `string`              | `init`                | 页面的输出路径，如 `docs/index.html`                      |
| `sidebar`    | `ReactElement`        | `sidebar`             | 由 `sidebar` 插件生成的 `ReactElement`                    |
| `toc`        | `ReactElement`        | `md`                  | 由 `md` 插件生成的 `ReactElement`                         |
| `prev`       | `PagePropsSidebar[0]` | `prev_next`           | 上一页的详细信息                                          |
| `next`       | `PagePropsSidebar[0]` | `prev_next`           | 下一页的详细信息                                          |
| `script`     | `ReactElement`        | `script`              | 由 `script` 插件生成的 `ReactElement`                     |
| `loading`    | `boolean`             | `script`              | 页面是否在加载中                                          |
| `ga`         | `ReactElement`        | `ga`                  | 由 `ga` 插件生成的 `ReactElement`                         |
| `gitalk`     | `ReactElement`        | `gitalk`              | 由 `gitalk` 插件生成的 `ReactElement`                     |
| 其他         | `any`                 | 第三方插件            | 第三方插件也可能扩充 `props`                              |

## 静态资源

除了以上提到的特殊文件之外的其他文件均会被视为静态资源，直接复制到 `dist` 目录下。

现将所有文件名约定汇总如下：

| 文件名                                  | 描述                                   |
| --------------------------------------- | -------------------------------------- |
| 以 `.` 开头                             | 隐藏文件，会被忽略                     |
| `pagic.config.ts` 或 `pagic.config.tsx` | 配置文件                               |
| `_layout.tsx`                           | 模版文件                               |
| 以 `_` 开头的 `tsx` 文件                | 子组件                                 |
| `md` 或 `tsx` 后缀的文件                | 页面文件                               |
| 其他文件                                | 静态资源，会被直接复制到 `dist` 目录下 |

## 引用与注解

1. <span id="sup-1"></span>Pagic **运行时**的配置与 `pagic.config.ts` 中的配置会有少许差异。
