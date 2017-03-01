# Pagic

The easiest way to generate static html page from markdown

## Getting Started

### Installation

```shell
npm install pagic -g
```

### Markdown + Layout => HTML

Let's say we have a project like this:

```shell
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
  `
};
```

The `index.md` is a simple markdown file:

```markdown
# Pagic

The easiest way to generate static html page from markdown
```

Then run

```shell
pagic
```

We'll get an `index.html` file in `public` directory:

```shell
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

### Copy Other Files

If there are other files which are not ended with `.md` or start with `_`, we will simply copy them:

```shell
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

### Sub Page and Sub Layout

We can have sub directory which contains markdown files.

Sub directory can also have a `_layout.js` file.

In this case, only markdown files in sub directory will use `sub/_layout.js` as the template.

If we cannot find a `_layout.js` in the sub directory, we'll recursively find the `_layout.js` in the parent directory.

```shell
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

### relativeToRoot

The last thing, we can get the `relativeToRoot` variable in the `_layout.js`, this helps us insert the relative resources:

```js
module.exports = function ({ title, content, relativeToRoot }) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="${relativeToRoot}/css/site.css" />
      </head>
      <body>
        ${content}
      </body>
    </html>
  `
};
```

## Options

There are some options while using the cli:

- `-s <path>`, `--src-dir=<path>`: Change the src directory, default is `src`
- `-d <path>`, `--dist-dir=<path>`: Change the dist directory, default is `public`
- `-w`, `--watch`: Watch for src directory change

## Use It as a Node Module

It's also able to use it as a node module:

```shell
npm install pagic --save
```

```js
const pagic = requrie('pagic');

pagic({
  srcDir: 'src',
  distDir: 'public'
});
```
