# 插件

## 内置插件

### `clean`

清空 `dist` 目录

### `init`

初始化中间变量（`pagePropsMap`）

### `md`

解析 `md` 文件，更新中间变量

### `tsx`

解析 `tsx` 文件，更新中间变量

### `script`

编译 `tsx` 文件，生成 `pagic.config.js`, `index.js`, `*_props.js`, `*_content.js` 等文件

### `layout`

解析 `_layout.tsx` 文件，使用 `Layout` 组件来渲染

### `out`

生成 HTML 文件，复制静态资源

## 官方插件

### `sidebar`

侧边栏插件，用于解析 `pagic.config.ts` 中配置的 `sidebar`，解析完成后由主题来渲染

### `prev_next`

上一页下一页插件，会根据 `sidebar` 的配置决定链接，由主题渲染到页面的文章底部

### `ga`

谷歌分析插件，该插件会生成一个 `ReactElement`，由主题插入到页面的 `<head>` 中

### `gitalk`

Gitalk 插件，给页面添加评论功能，该插件会生成一个 `ReactElement`，由主题插入到页面的文章底部

### `blog`

博客插件，将指定目录下的 `md/tsx` 文件解析为博客文章

### `i18n`

国际化插件，使网站支持多语言能力

## 第三方插件

敬请期待
