# `_layout.tsx`

`_layout.tsx` 是 Pagic 的核心理念之一。

## 什么是 `_layout.tsx`？

`_layout.tsx` 可以理解为 Pagic 在运行时的模版文件，所有页面文件（`md/tsx`）在渲染时都会以 `_layout.tsx` 为模版。

我们在上一章的 `site` 项目中创建一个 `_layout.tsx`：

```
site/
├── _layout.tsx
├── pagic.config.ts
└── README.md
```

其中 `_layout.tsx` 的内容如下：

```tsx
// @deno-types="https://deno.land/x/pagic/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { PagicLayout } from 'https://deno.land/x/pagic/mod.ts';

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
