# 主题

本章会介绍如何使用主题，以及如何开发主题。

如果你想查看所有主题的列表及其支持的特性，请访问[主题列表](/themes/)。

## 使用方式

### 官方主题

Pagic 拥有官方的 default, docs, blog 等主题，在 `pagic.config.ts` 中配置 `theme` 即可使用。默认会使用 `default` 主题：

```ts
export default {
  theme: 'default'
};
```

### 第三方主题

当使用第三方主题时，`theme` 的取值应为一个完整的入口文件链接：

```ts
export default {
  theme: 'https://raw.githubusercontent.com/xcatliu/pagic_theme_custom/master/mod.ts'
};
```

### 主题支持的插件

主题决定了页面如何展示，插件决定了页面支持的特性。

选择了主题后，我们可以添加插件来扩展网页的特性，但前提是主题支持此插件。

以 `sidebar` 插件为例，`sidebar` 插件会在页面左侧展示一个配置好的侧边栏，但是并不是所有主题都支持此插件，比如说 `default` 主题是一个非常基础的主题，只支持最基本的功能，所以不支持 `sidebar` 插件。不过 `docs` 主题和 `blog` 主题均支持 `sidebar` 插件。

一般可以在主题的文档中查看其支持的插件列表。

### 主题的配置

在 `pagic.config.ts` 中可以配置主题相关的选项，常见的选项包括 `title`, `description`, `head` 等。它们的含义和用法可以参考[配置文件](./config.md#页面内容)章节。

#### 网站的配置？主题的配置？插件的配置？

你可能已经发现了，不像一些其他的静态网站生成器对于网站、主题和插件拥有不同的配置文件（或配置项），Pagic 只拥有一个配置文件 `pagic.config.ts`。

你也许会有一些疑惑：这不会很混乱吗？主题和插件之间的配置不会冲突吗？

但其实 Pagic 这么设计是有其道理的：

##### 1. 一个配置项可能需要同时被主题和插件读取

以 `sidebar` 为例，如果我们在 `pagic.config.ts` 中配置了这样的 `sidebar`：

```ts
export default {
  sidebar: {
    '/docs/': [
      'docs/introduction.md',
      'docs/usage.md',
      'docs/config.md',
      'docs/content.md',
      'docs/layout.md',
      'docs/themes.md',
      'docs/plugins.md',
      'docs/deployment.md',
      'docs/demos.md',
      'docs/limitations.md'
    ]
  }
};
```

那么：

- `sidebar` 插件需要解析它，并将其转化为 `React.ReactElement`
- `docs` 主题需要支持渲染 `sidebar`，并提供折叠、SPA 跳转等功能

可见将 `sidebar` 的配置归属于主题的配置是不合适的，归属于插件的配置也是不合适的，需要有一个地方统一管理这个配置。

##### 2. 插件和插件之间可能有依赖关系

以 `prev_next` 插件为例，它支持在页面底部自动插入上一页下一页的链接。但是它需要依赖 `sidebar` 的配置才能知道上一页下一页的链接是什么。

所以 `prev_next` 插件需要能够读取到 `sidebar` 的配置，故将配置统一放到 `pagic.config.ts` 中更合适。

##### 3. 这样可以降低用户的理解成本

用户不用再思考一个配置到底是属于主题还是插件了，统一在 `pagic.config.ts` 中配置即可。

##### 可是如何保证各种第三方主题和插件之间的配置不会有冲突呢？

首先，插件的配置项一般与插件名一致（比如 `sidebar` 插件就提供了 `sidebar` 配置项），这保证了不同插件之间一般不会冲突。

其次，我们将一些通用的配置项整理成文档，第三方主题和插件的开发者应尽可能参考[此文档](./config.md)，避免产生冲突。

最后，这种设计其实约束了第三方主题和插件的开发者，使得大家需要按照同样的标准来设计配置项，意味着 Pagic 的第三方主题和插件拥有了更高的质量和兼容性。

## 如何开发主题

恭喜你即将成为 Pagic 主题的开发者！

只要理解了 Pagic 主题的运行机制，就可以轻松的开发出一个 Pagic 主题了。

### 主题的运行机制

Pagic 主题的运行机制很容易理解，甚至用一句话就可以解释清楚：

> Pagic 构建时会先把主题中的文件全部「复制」到用户的项目目录下，然后再运行 `pagic build` 脚本。

比如一个主题若包含以下文件：

```
pagic_theme_custom/
|── assets
|   └── index.css
└── _layout.tsx
```

用户的项目的目录结构如下：

```
site/
|── pagic.config.ts
└── README.tsx
```

那么当用户使用此主题后，用户的项目的目录结构就会「变成这样」：

```
site/
|── assets
|   └── index.css
|── _layout.tsx
|── pagic.config.ts
└── README.tsx
```

此时执行 `pagic build` 时，`assets/index.css` 会被复制到 `dist/assets/index.css` 中，`README.md` 会以 `_layout.tsx` 为模版来渲染，生成 `dist/index.html`：

```
site/
|── dist    # 构建结果目录
|   |── assets
|   |   └── index.css
|   └── index.html
|── assets
|   └── index.css
|── _layout.tsx
|── pagic.config.ts
└── README.tsx
```

Pagic 构建时每个页面文件（`md/tsx`）均会遵循 [\_layout.tsx](./layout.md) 章节中描述的规则来查找它对应的模版文件。

一个典型的应用是在主题中编写一个子模版，然后要求使用此主题的项目的目录结构符合此约定。

比如主题可以创建一个 `blog/_layout.tsx` 文件：

```
pagic_theme_custom/
|── assets
|   └── index.css
|── blog
|   └── _layout.tsx
└── _layout.tsx
```

这样用户的 `blog` 目录下的页面就会以 `blog/_layout.tsx` 作为模版来渲染了：

```
site/
|── blog
|   └── hello.md    # 此页面会以主题中的 blog/_layout.tsx 作为模版来渲染
|── pagic.config.ts
└── README.tsx
```

需要注意的是，主题中的文件并不会真的「复制」到用户的项目目录中，我们把这个「复制」看作是一种虚拟的执行即可。

另外，如果用户的项目中有文件路径和主题中的一样，那么以用户的项目中的文件为准——即允许用户覆盖主题的文件。

### 入口文件

之前提到过，当使用第三方主题时，`theme` 的取值应为一个完整的入口文件链接：

```ts
export default {
  theme: 'https://raw.githubusercontent.com/xcatliu/pagic_theme_custom/master/mod.ts'
};
```

下面列出一个典型的 `mod.ts` 入口文件：

```ts
export default {
  files: [
    'assets/index.css',
    'assets/prism_tomorrow.css',
    'assets/reset.css',
    'assets/variables.css',
    '_layout.tsx',
    'favicon.ico'
  ]
};
```

此入口文件中包含以下信息：

#### `files`

`files` 列出了主题的所有文件，它们都会被「复制」到用户的项目目录下。

为什么要这么设计呢？为什么不能自动遍历主题目录下的所有文件呢？

因为 Pagic 需要支持通过一个 url 来配置主题，而仅有一个 url 是无法遍历到该路径下有哪些文件的——试想你如何去遍历 `https://raw.githubusercontent.com/xcatliu/pagic_theme_custom/master/` 下的所有文件呢？

综上所述，虽然麻烦了点，但是列出主题的所有文件是必要的。

### `props`

主题中最核心的文件就是 `_layout.tsx`，而编写 `_layout.tsx` 最重要的就是使用它的 `props`。

前一章已经介绍过了 `props`，如果需要了解所有的 `props`，可以直接查看 [\_layout.tsx 中的 props](./layout.md#props)。

### 参考官方主题

开发一个主题最佳的参考就是官方主题，你可以直接[查看官方主题的源码](https://github.com/xcatliu/pagic/tree/master/src/themes)。
