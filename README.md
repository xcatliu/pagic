<h1 align="center">
  <a href="https://pagic.org">
    <img alt="P" src="./pagic.org/assets/pagic_logo.png" width="64" align="center" />agic
  </a>
</h1>

<h3 align="center">
  A static site generator powered by Deno + React
</h3>
<p align="center">
  <a href="https://pagic.org/zh-CN/">简体中文</a> | <a href="https://pagic.org">Website</a> | <a href="https://pagic.org/docs/introduction.html">Docs</a> | <a href="https://pagic.org/docs/config.html">Config</a> | <a href="#demos">Demos</a> | <a href="https://pagic.org/themes/">Themes</a> | <a href="https://pagic.org/plugins/">Plugins</a> | <a href="https://pagic.org/blog/">Blog</a>
</p>
<p align="center">
  <a href="https://deno.land">
    <img src="https://img.shields.io/badge/Deno-1.34.1-brightgreen.svg?logo=deno" alt="deno" />
  </a>
  <a href="https://pagic.org">
    <img src="https://img.shields.io/badge/Pagic-v1.6.2-orange.svg" alt="pagic" />
  </a>
  <a href="https://discord.gg/vn3VvdUycW">
    <img src="https://img.shields.io/discord/785366263823335424" alt="discord" />
  </a>
  <a href="https://github.com/xcatliu/pagic/actions">
    <img src="https://github.com/xcatliu/pagic/workflows/ci/badge.svg" alt="ci" />
  </a>
</p>

## Features

### Easy to configure

- Convention over configuration
- Single config file `pagic.config.ts`
- Intuitive design

### Support md and tsx

- Render `md/tsx` to static HTML page
- Support React Hooks
- Pre-render to static HTML, run as an SPA once loaded

### Themes and plugins

- Official themes default/docs/blog with dark mode
- Combine plugins to build process
- Import third-party themes or plugins through URL

## Demos

- Templates: [docs](https://github.com/xcatliu/pagic_template_docs)
- [TypeScript 入门教程](https://ts.xcatliu.com/) ([GitHub](https://github.com/xcatliu/typescript-tutorial))
- [流浪小猫的博客](https://blog.xcatliu.com/) ([GitHub](https://github.com/xcatliu/blog))
- [Deno X ranking](https://yoshixmk.github.io/deno-x-ranking/) ([GitHub](https://github.com/yoshixmk/deno-x-ranking))
- [Deno 钻研之术](https://deno-tutorial.js.org/) ([GitHub](https://github.com/hylerrix/deno-tutorial))
- [Deno 中文手册](https://manual.deno.js.cn/) ([GitHub](https://github.com/denocn/deno_manual))
- [JavaScript 20 年](https://cn.history.js.org/) ([GitHub](https://github.com/doodlewind/jshistory-cn))
- [ECMAScript+ 面试宝典](https://es-interview.js.org/) ([GitHub](https://github.com/hylerrix/es-interview))
- [Blitz.js + React 全栈开发手册](https://blitzjs-tutorial.js.org/) ([GitHub](https://github.com/hylerrix/blitzjs-tutorial))
- [自然醒的博客](https://blog.shenfq.com/)（[GitHub](https://github.com/Shenfq/blog)）
- [Viktor's Docs](https://docs.itdongdong.com/)（[GitHub](https://github.com/ViktorWong/my-docs)）
- [0xzhang 的博客](https://blog.0xzhang.com/)（[GitHub](https://github.com/0xzhang)）
- [Add my site as a demo](https://github.com/xcatliu/pagic/issues/new?assignees=xcatliu&labels=demo&template=add-a-demo.md&title=Add+my+site+as+a+demo+https%3A%2F%2Fexample.com) 😝

## Get started

### Installation

```bash
# Install deno https://deno.land/#installation
curl -fsSL https://deno.land/x/install/install.sh | sh
# Install Pagic
deno install --unstable --allow-read --allow-write --allow-net --allow-env --allow-run --name=pagic https://deno.land/x/pagic@1.6.2/mod.ts
```

### Initialize the project

To use `pagic` to build a static website, the project must include at least one `pagic.config.ts` config file and one `md/tsx` page file:

```
site/
├── pagic.config.ts
└── README.md
```

You can create the above `site` project by running the following command:

```bash
mkdir site && cd site && echo "export default {};" > pagic.config.ts && echo "# Hello world" > README.md
```

### Run `pagic`

```bash
pagic build --watch --serve
```

## More information

- Visit the [official website](https://pagic.org)
- Read the [documentation](https://pagic.org/docs/introduction.html)
- [Configure](https://pagic.org/docs/config.html) your site
- Checkout the [theme list](https://pagic.org/themes/) and the [plugin list](https://pagic.org/plugins/)
- Read the [blog](https://pagic.org/blog/) of Pagic
- Join our [discord channel](https://discord.com/channels/785366263823335424)

## Special thanks

- [StrawBerry Icon](http://chuangzaoshi.com/icon/): A free and open iconic font library for developer and creator

## Backers

[![Backers](https://opencollective.com/pagic/tiers/backers.svg?avatarHeight=114&width=838)](https://opencollective.com/pagic)

## Contributors

[![Contributors](https://opencollective.com/pagic/contributors.svg?avatarHeight=44&width=838&button=false)](https://github.com/xcatliu/pagic/graphs/contributors)

## LICENSE

[MIT](./LICENSE)

---

Have fun with Pagic!
