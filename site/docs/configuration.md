# 配置

Pagic 提供了丰富的配置，大部分用户通过配置文件就可以构建出一个具有丰富功能的静态网站了。

Pagic 的配置文件名称为 `pagic.config.ts` 或 `pagic.config.tsx`（如果你的配置文件中使用了 jsx 语法）。

> 以下列出的是官方提供的配置字段，一些第三方主题或插件可能会包含额外的配置字段，需要参考其说明文档。

## 输入和输出

### `srcDir`

执行 Pagic 构建过程的源目录，默认为 `pagic.config.ts` 所在的当前目录 `.`：

```ts
export default {
  srcDir: '.'
};
```

```
site/
├── pagic.config.ts
|── dist    # 构建结果目录
|   └── index.html
└── README.md
```

通常在给一个已有的项目写文档时，可以通过配置 `srcDir` 在子目录下写文档：

```ts
export default {
  srcDir: 'docs'
};
```

```
site/
├── pagic.config.ts
|── dist    # 构建结果目录
|   └── index.html
└── docs    # 构建源目录
    └── README.md
```

### `outDir`

Pagic 构建的结果目录，默认值为 `dist`。配合 `srcDir` 可以同时自定义输入和输出目录：

```ts
export default {
  srcDir: 'docs',
  outDir: 'public'
};
```

```
site/
├── pagic.config.ts
|── public  # 构建结果目录
|   └── index.html
└── docs    # 构建源目录
    └── README.md
```

### `include`

### `exclude`

### `root`

## 主题和插件

### `theme`

### `plugins`

## 页面属性

### `title`

### `description`

### `head`

### `nav`

### `sidebar`

### `github`

### `tools`

### `tocAd`

### `gitalk`

### `ga`

## 命令行选项

### `watch`

### `serve`

### `port`
