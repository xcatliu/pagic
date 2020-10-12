---
date: 2020-07-12
---

# 设计 pagic.config.ts

> 本文部分内容可能已经过时，访问[配置文件](../docs/config.md)查看最新的配置字段。

作为一名<del>高级 Markdown 工程师</del>资深博客爱好者，我热衷于<del>写博客</del>折腾各种博客系统，写过多个博客主题。

终于，写主题也无法得到满足，我开始写博客系统了。

或者说是更广义的，静态网站生成器。

如今 [Pagic](https://github.com/xcatliu/pagic) 已经完成了一个雏形，我也邀请了一些朋友试用，经过一些迭代，我决定来重新设计一下 `pagic.config.ts`，毕竟作为一个静态网站生成器，大部分用户只需要配置一下 `pagic.config.ts` 就可以构建网站了，所以配置文件的设计是至关重要的。

## 设计原则

1. [约定优于配置](https://zh.wikipedia.org/wiki/%E7%BA%A6%E5%AE%9A%E4%BC%98%E4%BA%8E%E9%85%8D%E7%BD%AE)
2. 尽可能语义话，一目了然
3. 类型统一，不要有选项既能传字符串又能传函数
4. 参考：[Deno](https://deno.land/manual/contributing/style_guide), [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), [webpack](https://webpack.js.org/configuration/), [Hexo](https://hexo.io/zh-cn/docs/configuration), [VuePress](https://vuepress.vuejs.org/config/), [Hugo](https://gohugo.io/getting-started/configuration/)

## 命名约定

### 文件名、目录名

使用下划线命名法 `foo_bar/baz_v2.md`。

依据：[Deno 的建议](https://deno.land/manual/contributing/style_guide#use-underscores-not-dashes-in-filenames)

### 变量名、参数名

使用驼峰命名法 `fooBar`。

依据：[Deno 的实际做法](https://deno.land/manual/contributing/style_guide#exported-functions-max-2-args-put-the-rest-into-an-options-object)

### 配置文件名称

`pagic.config.tsx` 或 `pagic.config.ts`。

- 其中 `pagic.config.tsx` 优先级更高（依据：[webpack 的默认加载顺序](https://webpack.js.org/configuration/resolve/#resolveextensions)）
- 为什么要提供 `tsx` 和 `ts` 两种？为什么不统一为 `ts`？因为一旦使用了 jsx 语法，则必须命名为 `tsx`，这是 TypeScript 的限制
- 为什么不统一为 `tsx`？因为大部分情况下用 `ts` 足够了
- 只查找当前运行目录下的配置文件，**不提供** `--config` 的方式指定配置文件（约定优于配置）
- `json` 格式和 `yaml` 格式有诸多限制，故使用 `ts` 来书写配置文件，**不提供**其他选择（约定优于配置）
- 其他静态网站生成器的配置文件中，最让人困惑的就是将主题的配置单独抽离出来了，使得我经常需要犹豫，一个配置项到底是属于主配置文件还是属于主题的配置文件。所以，在 Pagic 中只存在一个配置文件

命名依据：

- `tsconfig.json`（ts）
- `webpack.config.js`（webpack）
- `.vuepress/config.js`（VuePress）
- `_config.yml`（Hexo）
- `config.json`（Hugo）

## 文件相关的配置

文件相关的配置大多参考的 `tsconfig.json`。

| 配置项    | 类型     | 默认值             | 描述                                                                                                                                                      |
| --------- | -------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `srcDir`  | `string` | `'.'`              | 构建的源目录。其中的页面都会以相同的目录结构被构建到 `outDir` 中。默认为当前目录，此时当前目录下的 `README.md` 会被构建到 `${outDir}/index.html` 中       |
| `outDir`  | `string` | `'dist'`           | 构建的目标目录                                                                                                                                            |
| `include` | `glob[]` | `undefined`        | `include` 限制了 `srcDir` 中会被扫描到的文件。它常用于当 `srcDir` 配置为 `.` 时，指定部分文件或目录。glob 语法[见此](https://github.com/isaacs/minimatch) |
| `exclude` | `glob[]` | 较长，后续详细介绍 | `exclude` 与 `include` 类似，用于在 `srcDir` 中排除指定的文件                                                                                             |
| `root`    | `string` | `'/'`              | 部署站点的基础路径，如果网站部署在一个子路径下，比如 `https://xcatliu.github.io/pagic/`，那么 `root` 应该被设置为 `'/pagic/'`                             |

### `exclude`

`exclude` 的默认值较长：

```ts
[
  // Dot files
  '**/.*',
  // Node common files
  '**/package.json',
  '**/package-lock.json',
  '**/node_modules',
  'pagic.config.ts',
  'pagic.config.tsx',
  // https://docs.npmjs.com/using-npm/developers.html#keeping-files-out-of-your-package
  '**/config.gypi',
  '**/CVS',
  '**/npm-debug.log'

  // ${config.outDir} will be added later
];
```

注意这里的每一项都可以匹配到文件或目录，以 `**/node_modules` 为例，它：

- 不仅能匹配到 `${srcDir}` 下的 `node_modules` 目录（以及此目录下的所有文件）
- 也能匹配到 `${srcDir}` 下的 `node_modules` 文件
- 当然也能匹配到 `${srcDir}` 下的任意多级子目录下的 `node_modules` 目录或文件

实际上，`**/node_modules` 会被转化为 `**/node_modules{,/**}`，这样就能匹配到以上所有情况了。

需要注意的是：

- 匹配时以 `srcDir` 为根目录开始匹配。比如 `pagic.config.{ts,tsx}` 就只能匹配到 `srcDir` 下的文件，而不能匹配到 `srcDir` 的子目录下的文件，若要匹配上子目录，需要加上前缀 `*/`，若要匹配上任意多级子目录，需要加上前缀 `**/`
- `include` 的匹配策略和 `exclude` 一致
- 用户配置的 `exclude` 会 append 到 Default 数组中，而不是替换它

通过这些配置，Pagic 可以灵活的运用于各种场景：

### 场景一：纯网站，独立的目录存放源文件

如果仅仅是想搭建一个网站，那么最方便的方式是使用这样的目录结构，将源文件与构建好的文件分开：

```bash
website/
├── dist/
|   └── index.html
├── src/
|   ├── _layout.tsx
|   └── README.md
└── pagic.config.ts
```

此时 `pagic.config.ts` 的配置很简单：

```ts
export default {
  srcDir: 'src',
  outDir: 'dist'
};
```

### 场景二：纯网站，根目录存放源文件

项目的根目录下一般都有个 `README.md`，有时我们希望这个文件也被构建为一个页面，此时我们可以将 `srcDir` 设置为 `'.'`，比如参考 GitBook 的目录结构组织的话，就是这样的：

```bash
book/
├── dist/
|   ├── basics/
|   |   └── index.html
|   ├── advenced/
|   |   └── index.html
|   └── index.html
├── basics/
|   └── README.md
├── advenced/
|   └── README.md
├── _layout.tsx
├── README.md
└── pagic.config.ts
```

此时 `pagic.config.ts` 的配置也很简单：

```ts
export default {
  srcDir: '.',
  outDir: 'dist'
};
```

注意如果有需要排除的文件，可以使用 `exclude` 排除掉，比如：

```ts
export default {
  srcDir: '.',
  outDir: 'dist',
  exclude: ['examples']
};
```

### 场景三：项目 + 网站

如果是在一个项目中要搭建网站，又不想重新建一个仓库，那么前两种方式都可以满足需求：

1. 网站源文件放到 `docs` 目录下，`srcDir` 配置为 `'docs'` 即可。优点是配置简单，不用配置 `include` 和 `exclude`
2. 直接在根目录下构建网站，`srcDir` 配置为 `'.'`，再配置 `include` 包含网站的存放目录即可。优点是包含了根目录下的 `README.md`

### 场景四：仅展示 README.md

有的项目很简单，只需要一个 `README.md` 即可，不需要其他页面了，此时可以配置 `include` 仅包含 `README.md`：

```ts
export default {
  srcDir: '.',
  outDir: 'dist',
  include: ['README.md']
};
```

## 插件

插件是 Pagic 中最核心的功能，Pagic 甚至将最基本的构建流程也拆分为了插件——内置插件。插件分为三种：

1. 内置插件：最基本的构建流程，一定会运行
2. 官方插件：由 Pagic 实现的插件，可选，如：`sidebar`，`ga` 等
3. 第三方插件：由第三方实现的插件，可选。遵循 Deno 的设计，入口为一个 url，如：`https://github.com/xcatliu/pagic_plugin_example/blob/master/mod.ts`

| 配置项    | 类型       | 默认值                                                      | 描述                                                                       |
| --------- | ---------- | ----------------------------------------------------------- | -------------------------------------------------------------------------- |
| `plugins` | `string[]` | `['clean', 'init', 'md', 'tsx', 'script', 'layout', 'out']` | 插件列表，内置插件和官方插件的取值均为插件名，第三方插件的取值为其入口 url |

插件执行的顺序按照其配置顺序，除非该插件在实现时配置了一个 `insert` 属性：

```ts
export default {
  name: 'customPlugin',
  insert: 'before:script',
  // fn 的设计参考了 Deno https://deno.land/manual/testing#writing-tests
  fn: (pagic) => {
    // balabala
  }
};
```

`name` 是插件的唯一标识，会被用于 `insert` 中的插件排序。

`insert` 的语法是 `before:${pluginName}` 或 `after:${pluginName}`。这种方式比其他静态网站生成器中需要注册各种各样的生命周期钩子更方便也更灵活。

`fn` 是一个函数，仅接受一个参数，`pagic` 实例，它可以访问到 Pagic 在运行中的所有配置、上下文。如果插件需要一些额外的配置，可以约定在 `pagic.config.ts` 中新增一条配置项 `customPlugin`，然后在 `fn` 中可以通过 `pagic.config.customPlugin` 获取到配置。

需要注意的是：

- 用户配置的 `plugins` 会 append 到默认数组中，而不是替换它
- 插件在运行时会根据其 `insert` 排序再运行
- 可以使用 `-` 前缀删除掉某个内置插件，这个特性不常用，只有在以下两种情况下需要使用：
  1. 仅仅将 React 作为一个模版引擎，想构建出不加载 React 的 html 页面时，可以使用 `-script` 去掉构建 js 脚本的插件，注意此时 React 中的脚本比如 `useState` 就不会在客户端执行了
  2. 想要自己替换掉一些内置插件，比如使用 `-md` 去掉解析 markdown 文件的插件，然后再添加一个自定义插件 `https://github.com/xcatliu/pagic_plugin_custom_md/blob/master/mod.ts` 这样可以修改 Pagic 核心的构建流程，实现更高自由度的个性化
- 第三方插件一般都需要 `insert` 属性，不然就会在 `write` 之后运行了，很少有插件需要在构建完成写入文件后再执行

## 主题

主题是 Pagic 中的核心功能之一，有官方主题和第三方主题两种

| 配置项  | 类型     | 默认值    | 描述                                                 |
| ------- | -------- | --------- | ---------------------------------------------------- |
| `theme` | `string` | `default` | 官方主题的取值为主题名，第三方插件的取值为其入口 url |

主题的运行机制很容易理解——当运行 `pagic build` 时，会将主题中的所有文件都「复制」到 `srcDir` 下，然后按照正常的模式运行 `build`。

当然，这个「复制」并不会真的复制文件。而且遇到冲突的文件时，也是以用户的文件为准。

为什么主题需要一个入口文件呢？

因为 Deno 的设计中，模块调用是以 url 为基础的，想象一个网址表示一个主题，我们没有办法像 node 一样用 `fs.readdir` 来找到此主题目录下的所有文件，所以必须有一个入口文件来表示此主题包含了哪些文件：

```ts
export default {
  files: ['assets/index.css', 'assets/reset.css', 'assets/variables.css', '_layout.tsx', 'favicon.ico']
};
```

其中 `files` 表示需要被「复制」到 `srcDir` 下的文件。

## 网站配置

这里列出一些约定好的配置，它们通常由插件或主题来实现。

| 配置项        | 类型                 | 默认值      | 描述                                                                                                                                         |
| ------------- | -------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | `string`             | `undefined` | 网站标题，通常会放到页面的标题后面，如：`函数的类型 · TypeScript 入门教程`，若该页面不存在页面标题，则只会展示网站标题 `TypeScript 入门教程` |
| `description` | `string`             | `undefined` | 网站描述，通常会放到 `<head><meta name="description">` 中展示，也有可能展示在页面中                                                          |
| `head`        | `React.ReactElement` | `undefined` | 额外被注入到 `<head>` 中的内容，可以写 jsx。注意此时需要将配置文件 `pagic.config.tsx`                                                        |
| `sidebar`     |                      | `undefined` | 侧边栏                                                                                                                                       |
| `nav`         |                      | `undefined` | 顶部导航                                                                                                                                     |
| `github`      | `string`             | `undefined` | 网站的 GitHub 地址，通常会展示在网页的右上角                                                                                                 |
| `ga`          |                      | `undefined` | Google Analytics 配置                                                                                                                        |
| `gitalk`      |                      | `undefined` | Gitalk 配置                                                                                                                                  |
| `tocAd`       | `React.ReactNode`    | `undefined` | 展示在 toc 上方的广告                                                                                                                        |
| `tools`       |                      | `undefined` | 一些额外的功能                                                                                                                               |

## 开发环境配置

| 配置项  | 类型      | 默认值  | 描述                                     |
| ------- | --------- | ------- | ---------------------------------------- |
| `watch` | `boolean` | `false` | 是否观察 `srcDir` 目录，有变化后重新构建 |
| `serve` | `boolean` | `false` | 是否启动一个静态服务                     |
| `port`  | `number`  | `8000`  | 静态服务端口号                           |
