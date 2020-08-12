# 插件

本章会介绍如何使用插件，以及如何开发插件。

如果你想查看所有插件的列表及其说明文档，请访问[插件列表](/plugins/)。

## 使用方式

按照插件的级别可以将插件分为内置插件、官方插件以及第三方插件。

### 内置插件

内置插件是最重要的插件，它们组成了 Pagic 的整个构建过程——换一句话说，Pagic 的整个构建过程被拆分为了内置插件。

内置插件包括：`['clean', 'init', 'md', 'tsx', 'script', 'layout', 'out']`，Pagic 的构建过程也是按照这个次序来的：

1. `clean`: 清空输出目录
2. `init`: 初始化中间变量（`pagePropsMap`）
3. `md`: 解析 `md` 文件，更新中间变量
4. `tsx`: 解析 `tsx` 文件，更新中间变量
5. `script`: 编译 `tsx` 文件，生成 `pagic.config.js`, `index.js`, `*_props.js`, `*_content.js` 等文件
6. `layout`: 解析 `_layout.tsx` 文件，使用 `Layout` 组件来渲染
7. `out`: 生成 html 文件，复制静态文件

> 其实第 1 步之前还有一些步骤：解析 `pagic.config.ts`，扫描项目目录，找出页面文件和模版文件。但是由于一些运行机制的原因，它们无法被拆分为插件。

### 官方插件

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
