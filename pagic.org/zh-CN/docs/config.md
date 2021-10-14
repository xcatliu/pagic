# 配置文件

Pagic 提供了丰富的配置，大部分用户通过配置文件就可以构建出一个具有丰富功能的静态网站了。

Pagic 的配置文件名称为 `pagic.config.ts` 或 `pagic.config.tsx`（如果你的配置文件中使用了 jsx 语法）。

> 以下列出的是官方提供的配置字段，一些第三方主题或插件可能会包含额外的配置字段，需要参考其说明文档。

## 输入和输出

### `srcDir`

- 类型：`string`
- 默认值：`.`

执行 Pagic 构建过程的源目录，默认为 `pagic.config.ts` 所在的当前目录 `.`：

```ts
export default {
  srcDir: '.',
};
```

```
site/
|── dist    # 构建结果目录
|   └── index.html
├── pagic.config.ts
└── README.md
```

通常在给一个已有的项目写文档时，可以通过配置 `srcDir` 在子目录下写文档：

```ts {2}
export default {
  srcDir: 'docs',
};
```

```{5,6}
site/
|── dist    # 构建结果目录
|   └── index.html
├── pagic.config.ts
└── docs    # 构建源目录
    └── README.md
```

### `outDir`

- 类型：`string`
- 默认值：`dist`

Pagic 构建的结果目录，配合 `srcDir` 可以同时自定义输入和输出目录：

```ts {3}
export default {
  srcDir: 'docs',
  outDir: 'public',
};
```

```{2,3}
site/
|── public  # 构建结果目录
|   └── index.html
├── pagic.config.ts
└── docs    # 构建源目录
    └── README.md
```

### `include`

- 类型：`glob[]`
- 默认值：`undefined`

`include` 限制了 `srcDir` 中会被扫描到的文件。它常用于当 `srcDir` 配置为 `.` 时，指定部分文件或目录：

```ts {4}
export default {
  srcDir: '.',
  outDir: 'public',
  include: ['README.md', 'docs'],
};
```

```{10-12}
site/
|── public  # 构建结果目录
|   |── index.html
|   └── docs
|       └── index.html
├── src
├── dist
├── test
├── pagic.config.ts
├── README.md
└── docs    # 构建源目录
    └── README.md
```

在上面的例子中，`src`, `dist`, `test` 均为不相关的目录，Pagic 只关心 `include` 指定的 `README.md` 文件和 `docs` 目录。

> `include` 中允许配置 [glob 格式][]的字符串，如 `docs/**/*.md` 就只会匹配到 `docs` 目录下的所有 `md` 文件。

### `exclude`

- 类型：`glob[]`
- 默认值：如下

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
    '**/npm-debug.log',

    // ${config.outDir} will be added later
  ];
  ```

`exclude` 与 `include` 类似，用于在 `srcDir` 中排除指定的文件。

`exclude` 默认会排除一些显然不是 Pagic 构建需要的文件，如以 `.` 开头的隐藏文件、`package.json`、`node_modules` 等，需要注意的是，用户配置的 `outDir` 也会默认被排除掉。

当我们在 `pagic.config.ts` 中配置了 `exclude` 字段时，它不会覆盖掉默认值，而是会 `concat` 到默认值中，比如当我们按如下配置时：

```ts {2}
export default {
  exclude: ['test'],
};
```

最终运行时的 `exclude` 会是：

```ts {18}
export default {
  exclude: [
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
    '**/npm-debug.log',

    // ${config.outDir} will be added later

    'test',
  ],
};
```

> 与 `include` 类似，`exclude` 也允许配置 [glob 格式][] 格式的字符串。

### `root`

- 类型：`string`
- 默认值：`／`

部署站点的根路径，常用于需要将网站部署到一个子路径下。比如在 GitHub Pages 中，我们可以将网站部署到 https://foo.github.io/bar/ ，那么 `root` 应该被设置成 `'/bar/'`，它的值应当总是以斜杠开始，并以斜杠结束。

## 主题和插件

### `theme`

- 类型：`string`
- 默认值：`'default'`

当使用官方主题时，取值应为 `'default' | 'docs' | 'blog'`。

当使用第三方主题时，取值应为完整的链接：

```
https://raw.githubusercontent.com/xcatliu/pagic_theme_custom/master/mod.ts
```

### `plugins`

- 类型：`string[]`
- 默认值：`['clean', 'init', 'md', 'tsx', 'script', 'layout', 'out']`

当使用官方插件时，数组中的项应为官方插件的名称，详见[官方插件列表](../plugins/)。

当使用第三方插件时，数组中的项应为完整的链接：

```
https://raw.githubusercontent.com/xcatliu/pagic_plugin_custom/master/mod.ts
```

需要注意的是，用户配置的 `plugins` 不会替换掉默认的 `plugins`，而是以一种规则插入到默认的 `plugins` 中，详见[如何开发插件](./plugins.md#如何开发插件)。

以 [`pagic.org` 的配置](https://github.com/xcatliu/pagic/blob/master/pagic.config.tsx)为例：

```ts
export default {
  plugins: ['sidebar', 'prev_next', 'ga'],
};
```

插入后的 `plugins` 为：

```ts
export default {
  plugins: ['clean', 'init', 'md', 'tsx', 'sidebar', 'prev_next', 'ga', 'script', 'layout', 'out'],
};
```

另外，通过配置以 `-` 开头的项，可以删除掉默认的插件，比如配置：

```ts
export default {
  plugins: ['-script'],
};
```

此配置会删除掉默认的 `plugins` 中的 `script` 插件，这样生成的网站是没有 React 相关的 `<script>` 标签的，也失去了页面间跳转时的 SPA 能力。

但是对于非常简单的网站——比如只有一个页面——采用此配置是非常合适的。

## 页面内容

页面内容相关的配置会在插件中做一些处理，然后[作为 `props` 传递到 `_layout.tsx` 中](./layout.md#props)。

最终如何使用 `props` 取决于主题，所以并不是任一主题都支持了任一配置。

总之，进行页面内容的配置时，需要确保使用的是该配置支持的主题，同时添加了该配置依赖的插件。

以下会列出官方主题的支持情况，若使用的是第三方主题，请查看其文档确认。

### `title`

- 类型：`string`
- 默认值：`undefined`（若没有特殊说明，默认值均为 `undefined`，以下不再赘述）
- 支持的主题：全部
- 依赖的插件：无

网站的标题，它将会被用作所有页面标题的后缀。

### `description`

- 类型：`string`
- 支持的主题：全部
- 依赖的插件：无

网站的描述，它将会以 `<meta>` 标签渲染到当前页面的 HTML 中。

### `head`

- 类型：`ReactElement`
- 支持的主题：全部
- 依赖的插件：无

额外的需要被注入到当前页面的 HTML `<head>` 中的标签。由于用到了 jsx 语法，需要将配置文件重命名为 `pagic.config.tsx`，并且引入 `React`。

举个例子，增加一个自定义的 favicon：

```tsx
import { React } from 'https://deno.land/x/pagic@v1.5.1/mod.ts';

export default {
  head: <link rel="icon" type="image/png" href="/favicon.png" />,
};
```

如果需要引入多个标签，则需要用 `<>` 标签包裹：

```tsx {5,8}
import { React } from 'https://deno.land/x/pagic@v1.5.1/mod.ts';

export default {
  head: (
    <>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <script src="/assets/custom.js" />
    </>
  ),
};
```

### `nav`

- 类型：较复杂，见示例
- 支持的主题：`docs`, `blog`
- 依赖的插件：无

导航栏配置，示例如下：

```tsx
import { React } from 'https://deno.land/x/pagic@v1.5.1/mod.ts';

export default {
  nav: [
    {
      text: '文档',
      link: '/docs/index.html',
    },
    {
      text: '赞助作者',
      link: 'https://github.com/xcatliu/buy-me-a-coffee',
      target: '_blank',
      popover: (
        <>
          <img src="/assets/wechat.jpg" width="256" style={{ marginRight: '1rem', verticalAlign: 'top' }} />
          <img src="/assets/alipay.jpg" width="256" style={{ verticalAlign: 'top' }} />
        </>
      ),
    },
    {
      text: '关于',
      link: '/about/index.html',
      align: 'right',
    },
  ],
};
```

### `github`

- 类型：`string`
- 支持的主题：全部
- 依赖的插件：无

配置项目的 GitHub 链接，一般会展示一个链接在右上角，也会用于 [editOnGitHub 按钮](#tools)的链接。

### `branch`

- 类型：`string`
- 默认值：构建时的 git 分支
- 支持的主题：`docs`, `blog`
- 依赖的插件：无

配置项目的 GitHub 分支，用于 [editOnGitHub 按钮](#tools)的链接，若没有配置的话，会使用构建时的 git 分支，若没能获取到 git 分支，则使用 `main`。

### `sidebar`

- 类型：较复杂，见示例
- 支持的主题：`docs`
- 依赖的插件：`sidebar`

侧边栏配置，示例如下：

```ts
export default {
  sidebar: {
    '/docs/': ['docs/introduction.md', 'docs/usage.md', 'docs/config.md'],
    '/about/': [
      'about/README.md',
      {
        link: 'about/team.md',
        expanded: false,
        children: ['about/xcatliu.md'],
      },
      {
        text: 'Who is using Pagic?',
        link: 'about/usage.md',
      },
      {
        text: 'Foldable item without link',
        children: ['about/join_us.md'],
      },
    ],
    '/': ['docs/introduction.md', 'about/README.md'],
  },
};
```

在上面的例子中，以 `/docs/` 开头的页面会展示 docs 侧边栏，以 `/about/` 开头的页面会展示 about 侧边栏，其他页面会命中 `/`，展示默认的侧边栏。

侧边栏默认会全部展开，除非配置了 `expanded: false`。

### `md`

- 类型：较复杂，见示例
- 支持的主题：全部
- 依赖的插件：`md`

解析 Markdown 文件的配置，示例如下：

```ts
export default {
  md: {
    anchorLevel: [1, 2, 3, 4, 5, 6],
    tocEnabled: true,
    tocLevel: [1, 2, 3, 4]
};
```

在上面的例子中：

- `anchorLevel` 用来配置 Markdown 转成 HTML 时，各级标题是否需要渲染一个锚点链接。`[1, 2, 3, 4, 5, 6]` 表示 `h1` 到 `h6` 都得展示锚点链接。它的默认值是 `[2, 3, 4, 5, 6]`。
- `tocEnabled` 用来配置是否展示页面中的目录（Table of Content）
- `tocLevel` 用来配置页面中的目录需要包含的标题级别。`[1, 2, 3, 4]` 表示 `h1` 到 `h4` 的标题都会展示在目录中。它的默认值是 `[2, 3]`。

### `tocAd`

- 类型：`ReactElement`
- 支持的主题：`docs`
- 依赖的插件：无

展示在目录上方的广告，示例如下：

```tsx
import { React } from 'https://deno.land/x/pagic@v1.5.1/mod.ts';

export default {
  tocAd: (
    <div
      dangerouslySetInnerHTML={{
        __html: `
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- 192*128 -->
<ins
  class="adsbygoogle"
  style="display:inline-block;width:192px;height:128px"
  data-ad-client="ca-pub-8483371329009107"
  data-ad-slot="6487368873"
></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>`,
      }}
    />
  ),
};
```

### `tools`

- 类型：`Record<string, any>`
- 支持的主题：`docs`
- 依赖的插件：无

一些小工具，比如 `editOnGitHub`, `backToTop` 等，示例如下：

```ts
export default {
  tools: {
    editOnGitHub: true,
    backToTop: true,
  },
};
```

### `footer`

- 类型：`ReactElement`
- 支持的主题：全部
- 依赖的插件：无

页面底部，会展示在所有页面里，示例如下：

```tsx
import { React } from 'https://deno.land/x/pagic@v1.5.1/mod.ts';

export default {
  footer: (
    <footer>
      Powered by&nbsp;
      <a href="https://github.com/xcatliu/pagic" target="_blank">
        Pagic
      </a>
    </footer>
  ),
};
```

### `ga`

- 类型：`{ id:string }`
- 支持的主题：全部
- 依赖的插件：`ga`

[谷歌分析](https://analytics.google.com/)的配置，示例如下：

```ts
export default {
  ga: {
    id: 'UA-45256157-14',
  },
};
```

### `gitalk`

- 类型：较复杂，见示例
- 支持的主题：`docs`
- 依赖的插件：`gitalk`

[Gitalk](https://github.com/gitalk/gitalk) 可以给页面添加评论功能，示例如下：

```ts
export default {
  gitalk: {
    clientID: '29aa4941759fc887ed4f',
    clientSecret: '33e355efdf3a1959624506a5d88311145208471b',
    repo: 'typescript-tutorial',
    owner: 'xcatliu',
    admin: ['xcatliu'],
    pagerDirection: 'first',
  },
};
```

### `blog`

博客的配置较复杂，请参考[博客](./blog.md)章节。

### `i18n`

国际化的配置较复杂，请参考[国际化](./i18n.md)章节。

## 命令行选项

命令行选项也可以在 `pagic.config.ts` 中配置，真正运行时如果传了参数则会覆盖掉此配置。

### `watch`

- 类型：`boolean`
- 默认值：`false`

监听文件变动以重新构建。

### `serve`

- 类型：`boolean`
- 默认值：`false`

启动本地服务，预览静态网站。

### `port`

- 类型：`number`
- 默认值：`8000`

指定本地服务的端口号。

[glob 格式]: https://doc.deno.land/https/deno.land/std@0.111.0/path/glob.ts
