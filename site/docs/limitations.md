# 局限性

Pagic 很优秀，但也有一些缺陷。

由于 Pagic 构建的网站使用到了一些最新的 JavaScript 和 CSS 特性，所以必须使用现代浏览器（Chrome, Firefox, Safari, Edge 等）访问网站才能拥有完整的体验，如果你的目标用户使用的是 IE 浏览器，那么不建议使用 Pagic 来构建网站。

Pagic 使用到的最新特性包括：

- 通过 `<script type="module">` 加载 esm 模块（[浏览器支持性](https://caniuse.com/#feat=es6-module)）
- `import`, `export`, `export default` 等 esm 语法（[浏览器支持性](https://caniuse.com/#feat=mdn-javascript_statements_import)）
- 通过 `import()` 动态加载 esm 模块（[浏览器支持性](https://caniuse.com/#feat=es6-module-dynamic-import)）
- `async` 函数（[浏览器兼容性](https://caniuse.com/#feat=async-functions)）
- 常用的 ES6 语法，包括 `let`, `const`, `() => {}` 等
- CSS Variables（[浏览器兼容性](https://caniuse.com/#feat=css-variables)）
- CSS `calc()`（[浏览器兼容性](https://caniuse.com/#feat=calc)）
- CSS flexbox（[浏览器兼容性](https://caniuse.com/#feat=flexbox)）
