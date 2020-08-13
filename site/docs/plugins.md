# 插件

本章会介绍如何使用插件，以及如何开发插件。

如果你想查看所有插件的列表及其说明文档，请访问[插件列表](/plugins/)。

## 使用方式

在 `pagic.config.ts` 中通过 `plugins` 来配置插件，它的类型是 `string[]`。

按照插件的级别可以将插件分为内置插件、官方插件以及第三方插件。

### 内置插件

内置插件（也可称为默认插件）是最重要的插件，它们组成了 Pagic 的整个构建过程——换句话说，Pagic 的整个构建过程被拆分为了内置插件。

内置插件包括：`['clean', 'init', 'md', 'tsx', 'script', 'layout', 'out']`，Pagic 的构建过程也是按照这个次序来的：

1. `clean`: 清空输出目录
2. `init`: 初始化中间变量（`pagePropsMap`）
3. `md`: 解析 `md` 文件，更新中间变量
4. `tsx`: 解析 `tsx` 文件，更新中间变量
5. `script`: 编译 `tsx` 文件，生成 `pagic.config.js`, `index.js`, `*_props.js`, `*_content.js` 等文件
6. `layout`: 解析 `_layout.tsx` 文件，使用 `Layout` 组件来渲染
7. `out`: 生成 HTML 文件，复制静态资源

> 其实第 1 步之前还有一些步骤：解析 `pagic.config.ts`，扫描项目目录，找出页面文件和模版文件。但是由于一些运行机制的原因，它们无法被拆分为插件。

内置插件默认就是开启的，你不需要添加配置来启用。

通过配置以 `-` 开头的项，可以删除掉默认的插件，比如配置：

```ts
export default {
  plugins: ['-script']
};
```

此配置会删除掉默认的 `plugins` 中的 `script` 插件，这样生成的网站是没有 React 相关的 `<script>` 标签的，也失去了页面间跳转时的 SPA 能力。

但是对于非常简单的网站——比如只有一个页面——采用此配置是非常合适的。

删除掉默认插件后再添加第三方插件的话，我们甚至可以完全的更改 Pagic 的构建过程。比如我们可以删除掉 `md` 插件，然后添加一个第三方的解析 Markdown 的插件，来替换 Markdown 文件的解析过程。

### 官方插件

除了内置插件之外，我们还提供了一些常用的官方插件，它们包括：

- `sidebar`: 侧边栏插件，用于解析 `pagic.config.ts` 中配置的 `sidebar`，解析完成后由主题来渲染
- `prev_next`: 上一页下一页插件，会根据 `sidebar` 的配置决定链接，由主题渲染到页面的文章底部
- `ga`: 谷歌分析插件，该插件会生成一个 `ReactElement`，由主题插入到页面的 `<head>` 中
- `gitalk`: Gitalk 插件，给页面添加评论功能，该插件会生成一个 `ReactElement`，由主题插入到页面的文章底部

这些插件的配置可以在[配置文件](./config.md#页面内容)章节中查看。

通过配置 `plugins` 可以添加官方插件。

需要注意的是，用户配置的 `plugins` 不会替换掉默认的 `plugins`，而是以一种规则插入到默认的 `plugins` 中。

以 [`pagic.org` 的配置](https://github.com/xcatliu/pagic/blob/master/pagic.config.tsx)为例：

```ts
export default {
  plugins: ['sidebar', 'prev_next', 'ga']
};
```

插入后的 `plugins` 为：

```ts
export default {
  plugins: ['clean', 'init', 'md', 'tsx', 'sidebar', 'prev_next', 'ga', 'script', 'layout', 'out']
};
```

#### 那么这里是以什么规则插入的呢？

原来每一个**非内置**插件都会有一个 `insert` 属性，它描述了插入时的位置，它的取值为 `before:xxx` 或 `after:xxx`，其中 `xxx` 为一个插件名。比如：

- `sidebar` 的 `insert` 属性为 `after:tsx`，所以它会被插入到 `tsx` 后面
- `prev_next` 的 `insert` 属性为 `after:sidebar`，所以它会被插入到 `sidebar` 后面
- `ga` 的 `insert` 属性为 `before:script`，所以它会被插入到 `script` 前面

得益于 Pagic 将构建过程拆分为了一个个内置插件，非内置插件可以很灵活的插入到构建的任何位置。这种设计比创建一些「钩子函数」来得更方便也更容易理解。

### 第三方插件

当使用第三方插件时，数组中的项应为一个完整的入口文件链接：

```ts
export default {
  plugins: ['https://raw.githubusercontent.com/xcatliu/pagic_plugin_custom/master/mod.ts']
};
```

## 如何开发插件

### 参考官方插件

开发一个插件最佳的参考就是官方插件，你可以直接[查看官方插件的源码](https://github.com/xcatliu/pagic/tree/master/src/plugins)。
