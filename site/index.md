# Pagic

- [GitHub](https://github.com/xcatliu/pagic)

The easiest way to generate static html page from markdown

## Features

- [Markdown + Layout => HTML](#markdown-layout-html)
- [Copy static files](#copy-static-files)
- [Sub page and sub layout](#sub-page-and-sub-layout)
- [Front matter](#front-matter)
- [Yaml config file](#yaml-config-file)
- [Injected variables](#injected-variables)

## Getting started

### Installation

```bash
npm install pagic -g
```

### Markdown + Layout => HTML

Let's say we have a project like this:

```
docs/
├── public/
└── src/
    ├── _layout.js
    └── index.md
```

The `_layout.js` is a simple javascript module which contains a template string:

```js
module.exports = function ({ title, content }) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
};
```

The `index.md` is a simple markdown file:

```markdown
# Pagic

The easiest way to generate static html page from markdown
```

Then run

```bash
pagic build
```

We'll get an `index.html` file in `public` directory:

```
docs/
├── public/
|   └── index.html
└── src/
    ├── _layout.js
    └── index.md
```

The content should be:

```html
<!doctype html>
<html>
  <head>
    <title>Pagic</title>
  </head>
  <body>
    <h1 id="pagic">Pagic</h1>
    <p>The easiest way to generate static html page from markdown</p>
  </body>
</html>
```

Here we use [markdown-it](https://github.com/markdown-it/markdown-it) with plugins [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) and [markdown-it-title](https://github.com/valeriangalliat/markdown-it-title) to parse the markdown file.

### Copy static files

If there are other static files which are not ended with `.md` or start with `_`, we will simply copy them:

```
docs/
├── public/
|   ├── css
|   |   └── site.css
|   └── index.html
└── src/
    ├── css
    |   └── site.css
    ├── _layout.js
    └── index.md
```

### Sub page and sub layout

We can have sub directory which contains markdown files.

Sub directory can also have a `_layout.js` file.

For each markdown file, it will walk your file system looking for the nearest `_layout.js` as the template. It starts from the current directory of the markdown file and then moves to the parent directory until it finds the `_layout.js`

```
docs/
├── public/
|   ├── css
|   |   └── site.css
|   └── index.html
|   └── sub
|       └── index.html
└── src/
    ├── css
    |   └── site.css
    ├── _layout.js
    |── index.md
    └── sub
        ├── _layout.js
        └── index.md
```

### Front matter

Front matter allows us add extra meta data to markdown:

```markdown
---
author: xcatliu
published: 2017-03-02
---

# Pagic

The easiest way to generate static html page from markdown
```

Then in `_layout.js`, we can get a `frontMatter` object which contains the meta data:

```js
module.exports = function ({ title, content, frontMatter }) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        ${content}
        <footer>
          Author: ${frontMatter.author},
          Published: ${frontMatter.published}
        </footer>
      </body>
    </html>
  `;
};
```

### Yaml config file

We can set the configuration in `_config.yml`, the default is:

```yaml
src_dir: src
public_dir: public
```

### Injected variables

The variables which are injected to `_layout.js`:

<div class="scroll-view">
  <table class="table">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Interpretation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>title</code></td>
        <td>The title of current page, usually is the first <code># Title</code> in the markdown</td>
      </tr>
      <tr>
        <td><code>content</code></td>
        <td>The content of current page</td>
      </tr>
      <tr>
        <td><code>frontMatter</code></td>
        <td>The frontMatter object of current markdown</td>
      </tr>
      <tr>
        <td><code>relativeToRoot</code></td>
        <td>The relative path from current markdown file to root directory</td>
      </tr>
      <tr>
        <td><code>config</code></td>
        <td>The json format of <code>_config.yml</code>. You can add your custom data to it</td>
      </tr>
      <tr>
        <td><code>filePath</code></td>
        <td>The current markdown file path</td>
      </tr>
    </tbody>
  </table>
</div>

## Use Pagic as cli

### `pagic build`

We can use `pagic build` to build static page, there are some options while using build command:

```bash
pagic build [options]

# -w, --watch  watch src dir change
# -s, --serve  serve public dir
# -p, --port   override default port
```

### `pagic init`

We can use `pagic init` to create a new Pagic folder:

```bash
pagic init <dir>
```

## Use Pagic as a node module

It's also able to use it as a node module:

```bash
npm install pagic --save
```

### Common usage

```js
const Pagic = require('pagic');

const pagic = new Pagic();
pagic.build();
```

### Watch file change

```js
pagic.watch().build();

setTimeout(() => {
  pagic.unwatch();
}, 10000);
```

## Development

```bash
npm install
npm start
npm test
```

## LICENSE

[MIT](./LICENSE)

---

Have fun with pagic!
