# Pagic

[![ci](https://github.com/xcatliu/pagic/workflows/ci/badge.svg)](https://github.com/xcatliu/pagic/actions)

The easiest way to generate static html page from markdown, built with Deno! 🦕

## Features

- [Markdown + Layout => HTML](#markdown--layout--html)
- [React component as a page](#react-component-as-a-page)
- [Copy static files](#copy-static-files)
- [Sub pages and layouts](#sub-pages-and-layouts)
- [Front matter](#front-matter)
- [Configuration](#configuration)
- [Plugins and themes](#plugins-and-themes)

WARNING: This project is under development so api would changes without announce. The stable version will some soon when [v1.0.0](https://github.com/xcatliu/pagic/projects/3) finished.

## Live demo

- [Deno X ranking](https://yoshixmk.github.io/deno-x-ranking/) ([GitHub](https://github.com/yoshixmk/deno-x-ranking))
- [TypeScript 入门教程](https://ts.xcatliu.com/) ([GitHub](https://github.com/xcatliu/typescript-tutorial/))
- [Deno 钻研之术](https://deno-tutorial.js.org/) ([GitHub](https://github.com/hylerrix/deno-tutorial))
- [Deno 中文手册](https://manual.deno.js.cn/) ([GitHub](https://github.com/denocn/deno_manual))
- [Add my site as a demo](https://github.com/xcatliu/pagic/issues/new?assignees=xcatliu&labels=demo&template=add-a-demo.md&title=Add+my+site+as+a+demo+https%3A%2F%2Fexample.com) 😝

## Getting started

### Installation

```bash
# Install deno https://deno.land/#installation
curl -fsSL https://deno.land/x/install/install.sh | sh
# Install pagic
deno install --unstable --allow-read --allow-write --allow-net --name=pagic https://deno.land/x/pagic/mod.ts
```

#### Docker

`alias pagic='docker run -it --rm -v $PWD:/pagic yardenshoham/pagic'`

### Markdown + Layout => HTML

Let's say we have a project like this:

```
docs/
├── public/
└── src/
    ├── _layout.tsx
    └── index.md
```

The `src/_layout.tsx` is a simple react component:

```tsx
import { React, PagicLayout } from 'https://deno.land/x/pagic/mod.ts';

const Layout: PagicLayout = ({ title, content }) => (
  <html>
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
    </head>
    <body>{content}</body>
  </html>
);

export default Layout;
```

The `src/index.md` is a simple markdown file:

```md
# Pagic

The easiest way to generate static html page from markdown, built with Deno! 🦕
```

Then run:

```bash
pagic build
```

We'll get an `index.html` file in `public` directory:

```
docs/
├── public/
|   └── index.html
└── src/
    ├── _layout.tsx
    └── index.md
```

The content should be:

```html
<html>
  <head>
    <title>Pagic</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <article>
      <h1 id="pagic">Pagic</h1>
      <p>The easiest way to generate static html page from markdown, built with Deno! 🦕</p>
    </article>
  </body>
</html>
```

### React component as a page

A react component can also be built to html:

```
docs/
├── public/
|   ├── index.html
|   └── hello.html
└── src/
    ├── _layout.tsx
    ├── index.md
    └── hello.tsx
```

Here we build `src/hello.tsx` to `public/hello.html`, using `src/_layout.tsx` as the layout.

`src/hello.tsx` is a simple react component:

```tsx
import { React } from 'https://deno.land/x/pagic/mod.ts';

const Hello = () => <h1>Hello world</h1>;

export default Hello;
```

And `public/hello.html` would be:

```tsx
<html>
  <head>
    <title></title>
    <meta charset="utf-8" />
  </head>
  <body>
    <h1>Hello world</h1>
  </body>
</html>
```

### Copy static files

If there are other static files which are not end with `.{md,tsx}` or (start with `_` and end with `.tsx`), we will simply copy them:

```
docs/
├── public/
|   ├── assets
|   |   └── index.css
|   ├── index.html
|   └── hello.html
└── src/
    ├── assets
    |   └── index.css
    ├── _layout.tsx
    ├── _sidebar.tsx
    ├── index.md
    └── hello.tsx
```

### Sub pages and layouts

We can have sub directory which contains markdown or component.

Sub directory can also have a `_layout.tsx` file.

For each markdown or react component, it will walk your file system looking for the nearest `_layout.tsx`. It starts from the current directory and then moves to the parent directory until it finds the `_layout.tsx`.

```
docs/
├── public/
|   ├── assets
|   |   └── index.css
|   ├── index.html
|   └── hello.html
|   └── sub
|       └── index.html
└── src/
    ├── assets
    |   └── index.css
    ├── _layout.tsx
    ├── _sidebar.tsx
    |── index.md
    └── sub
        ├── _layout.tsx
        └── index.md
```

### Front matter

Front matter allows us add extra meta data to markdown:

```markdown
---
author: xcatliu
published: 2020-05-20
---

# Pagic

The easiest way to generate static html page from markdown, built with Deno! 🦕
```

Every item in the front matter will pass to the `_layout.tsx` as the props:

```tsx
import { React, PagicLayout } from 'https://deno.land/x/pagic/mod.ts';

const Layout: PagicLayout = ({ title, content, author, published }) => (
  <html>
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
    </head>
    <body>
      {content}
      <footer>
        Author: ${author}, Published: ${published}
      </footer>
    </body>
  </html>
);

export default Layout;
```

#### Front matter in react component

In react component we can export a `frontMatter` variable:

```tsx
import { React } from 'https://deno.land/x/pagic/mod.ts';

const Hello = () => <h1>Hello world</h1>;

export default Hello;

export const frontMatter = {
  title: 'Hello world',
  author: 'xcatliu',
  published: '2020-05-20'
};
```

### Configuration

It's able to configurate pagic by adding a `pagic.config.ts` file. The default configuration is:

```ts
export default {
  srcDir: '.',
  outDir: 'dist',
  include: undefined,
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
    '**/npm-debug.log'

    // ${config.outDir} will be added later
  ],
  root: '/',
  theme: 'default',
  plugins: ['clean', 'init', 'md', 'tsx', 'script', 'layout', 'out'],
  watch: false,
  serve: false,
  port: 8000
};
```

Your `pagic.config.ts` will be **deep-merge** to the default config, that is, your `exclude` and `plugins` will be appended to default, not replace it.

### Plugins and themes

As you see default plugins are set to `['init', 'md', 'tsx', 'script', 'layout', 'write']`.

We can add the optional plugins by setting the `plugins` in the `pagic.config.ts` file:

```ts
export default {
  srcDir: 'site',
  plugins: ['sidebar']
};
```

`sidebar` plugin will add a `sidebar` properity to the props.

We can also add our own plugin like this:

```ts
import myPlugin from './myPlugin.tsx';

export default {
  srcDir: 'site',
  plugins: [myPlugin]
};
```

To develop a `myPlugin` please checkout the [built-in plugins](https://github.com/xcatliu/pagic/tree/master/src/plugins).

Themes is under development, please come back later!

## Use pagic as cli

### `pagic build`

We can use `pagic build` to build static pages, there are some options while using `build` command:

```bash
pagic build [options]

# --watch  watch src dir change
# --serve  serve public dir
# --port   override default port
```

## LICENSE

[MIT](./LICENSE)

---

Have fun with pagic!
