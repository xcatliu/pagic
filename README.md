# Pagic

The easiest way to generate static html page from markdown, built with Deno! 🦕

## Features

- [Markdown + Layout => HTML](#markdown--layout--html)
- [React component as a page](#react-component-as-a-page)
- [Copy static files](#copy-static-files)
- [Sub pages and layouts](#sub-pages-and-layouts)
- [Front matter](#front-matter)
- [Configuration](#configuration)
- [Plugins and themes](#plugins-and-themes)

## Getting started

### Installation

**WARNING**: there are some bugs when using deno `v1.0.1`, please use deno `v1.0.0` instead until we solve the issue.

```bash
# Install deno https://deno.land/#installation
curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.0.0
# Install pagic
deno install --unstable --allow-read --allow-write --allow-net https://deno.land/x/pagic/pagic.ts
```

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
// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { PagicLayout } from 'https://raw.githubusercontent.com/xcatliu/pagic/master/pagic.ts';

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
// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

const Hello = () => <h1>Hello World</h1>;

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
    <h1>Hello World</h1>
  </body>
</html>
```

### Copy static files

If there are other static files which are not ended with `.{md|tsx}` or start with `_`, we will simply copy them:

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
    ├── _partial.tsx
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
    ├── _partial.tsx
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
// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { PagicLayout } from 'https://raw.githubusercontent.com/xcatliu/pagic/master/pagic.ts';

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
// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

const Hello = () => <h1>Hello World</h1>;

export default Hello;

export const frontMatter = {
  title: 'Hello World',
  author: 'xcatliu',
  published: '2020-05-20'
};
```

### Configuration

It's able to configurate pagic by adding a `pagic.config.ts` file. The default configuration is:

```ts
export default {
  srcDir: 'src',
  publicDir: 'public',
  plugins: ['md', 'tsx', 'layout'],
  watch: false,
  port: 8000,
  serve: false
};
```

### Plugins and themes

As you see there are three built-in plugins: `md`, `tsx` and `layout`.

We can add our own plugin by changing the plugins config in the `pagic.config.ts` file:

```ts
import myPlugin from './myPlugin.ts';

export default {
  srcDir: 'site',
  plugins: ['md', 'tsx', 'layout', myPlugin]
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
