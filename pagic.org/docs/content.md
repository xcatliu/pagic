# Content

Pagic supports rendering `md/tsx` files into static HTML pages. The features supported by these two kind of files will be introduced below.

## `md` file

Pagic uses [markdown-it](https://github.com/markdown-it/markdown-it) to compile markdown files. It supports adding third-party plugins to extend the original functions.

Pagic supports the following features:

### `title`

The first `<h1>` tag in the article will be extracted as the `title` of the entire page (plus the `title` in `pagic.config.ts` as the suffix).

If there is no `<h1>` tag in the article, the `title` in `pagic.config.ts` will be used as the `title` of the page.

### `toc`

All the `<h2>` and `<h3>` tags in the article will be extracted as the table of contents of the page.

If there is no `<h2>` or `<h3>` in the article, then `toc` is `undefined`.

You can modify the extracted title level through the [config `md.tocLevel`](./config.md#md).

### Anchor in title

All the `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags in the article will be inserted into a clickable anchor `§`.

You can modify the level of the title that will insert anchor through the [config `md.anchorLevel`](./config.md#md).

### Link replacement

If the link in the article ends with `.md`, it will be replaced with `.html` during the build process, for example:

```md
[Config](./config.md)
```

Will be constructed as:

```html
<a href="./config.html">Config</a>
```

The actual build result: [Config](./config.md), you might as well click to see the jump effect.

Why is it designed like this?

Because such a link not only supports click to jump in the generated page, but also supports click to jump in the markdown preview of GitHub, but also supports `cmd/ctrl + click` jump in VSCode (or other editors).

Try it in [GitHub version of this page](https://github.com/xcatliu/pagic/blob/master/pagic.org/docs/content.md#link-replacement).

It should be noted that not only the suffix of `README.md` in the link will be replaced with `.html`, the path will also be replaced with `index`:

```md
[Homepage](/README.md)
```

Will be constructed as:

```html
<a href="/index.html">Homepage</a>
```

The actual build result: [Homepage](/README.md), you might as well click to see the jump effect.

In addition, if the link starts with `http://` or `https://`, it means that it is an external link, and no matter what the suffix is, it will not be replaced.

### Front matter

frontMatter is allowed to be set at the top of the markdown file, which will be passed as `props` to `_layout.tsx`. Note that it has the highest priority and will override any `props` added by plugins, such as:

Set `outputPath` to specify the path of the output page (the output path is the file path by default):

```md {2}
---
outputPath: foo/bar.html
---

# Content

...
```

Set `layoutPath` to specify the template file used on this page:

```md {2}
---
layoutPath: blog/_layout.tsx
---

# Content

...
```

Set `toc` to `null` to disable the table of content of this page:

```md {2}
---
toc: null
---

# Content

...
```

Set `prev` or `next` to specify the path of the previous page and the next page (need to cooperate with the `prev_next` plugin):

```md {2}
---
prev: README.md
---

# Content

...
```

The setting of the frontMatter is very flexible, with various plugins or custom `_layout.tsx`, various effects can be achieved.

### TeX (KaTeX)

Inline: $E=mc^2$

```md
Inline: $E=mc^2$
```

Block:

$$
\frac{1}{
  \Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{
  \frac25 \pi}} = 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {
    1+\frac{e^{-6\pi}}
    {1+\frac{e^{-8\pi}}{1+\cdots}}
  }
}
$$

```md
$$
\frac{1}{
  \Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{
  \frac25 \pi}} = 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {
    1+\frac{e^{-6\pi}}
    {1+\frac{e^{-8\pi}}{1+\cdots}}
  }
}
$$
```

### Get information from `git log`, such as `author`

When parsing a Markdown file, Pagic will run a script to get its `git log` and extract useful information from it. They include:

- `author`: The first committer of the file
- `contributors`: All submitters of the file (including the first submitter), sorted by the time of the first submission (first submitted first)
- `date`: The date when the file was first submitted
- `updated`: the date the file was last submitted

These information will be written into the `props` of the page.

### Limitations

At present, Pagic's markdown parsing still has some limitations, which is also the direction for future improvement:

- The option to configure `markdown-it` is not supported
- Does not support advanced grammar such as flowcharts
- Does not support embedded jsx

## `tsx` file

Rendering `tsx` files into static HTML pages is one of Pagic's features. With the programmability of React components, the capabilities of static websites are greatly expanded.

### Basic usage

Any `tsx` file that does not start with `_` will be treated as a `tsx` page file.

Let's create a `hello.tsx` file in the previous `site` project:

```{3}
site/
├── pagic.config.ts
├── hello.tsx
└── README.md
```

Its content is:

```tsx
import { React } from 'https://deno.land/x/pagic/mod.ts';

const Hello = () => <h1>Hello world</h1>;

export default Hello;
```

Next we run:

```bash
pagic build --serve
```

Then open http://127.0.0.1:8000/hello.html and you can see that `Hello world` is displayed on the page.

At the same time, there is an additional file `hello.html` in the `dist` directory:

```{3,6}
site/
|── dist    # Output directory
| |── hello.html
| └── index.html
├── pagic.config.ts
├── hello.tsx
└── README.md
```

> The **default export** (`export default`) in `hello.tsx` will be regarded as the content of the page.

### Logic script

Pagic will not only execute the logic in the `tsx` file when building the page, but also run in the browser.

For example, we can use `React.setState` to implement a counter page:

```tsx {4,9}
import { React } from 'https://deno.land/x/pagic/mod.ts';

const Hello = () => {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <h1>Hello world</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Count +1</button>
    </>
  );
};

export default Hello;
```

Visit [/hello.html](/hello.html) to view the actual rendering results.

> Due to the limitation of `react.d.ts`, you must use `React.xxx` when using the sub-methods of `React`, instead of directly `import React, {useState} ...`.

### Componentization

Componentization is one of the important features of React. We can reuse code by splitting the `tsx` page into sub-components. However, in Pagic, due to the need to support rendering of `tsx` files as pages, we need to make a convention for sub-components, that is, starting with `_` are sub-components:

```{4}
site/
|── dist    # Output directory
| └── hello.html
├── _count.tsx
├── hello.tsx
└── pagic.config.ts
```

In the above example, `hello.tsx` will be constructed as `dist/hello.html`, and `_count.tsx` will not be constructed as a page because it starts with `_`. In this way, we can split the `Count` component into the `_count.tsx` file, and then import it in `hello.tsx`:

```tsx {3,8}
import { React } from 'https://deno.land/x/pagic/mod.ts';

import Count from './_count.tsx';

const Hello = () => (
  <>
    <h1>Hello world</h1>
    <Count />
  </>
);

export default Hello;
```

### Front matter

Similar to `md` files, `tsx` files also support frontMatter, which is achieved by exporting a `frontMatter` object:

```tsx {7-9}
import { React } from 'https://deno.land/x/pagic/mod.ts';

const Hello = () => <h1>Hello world</h1>;

export default Hello;

export const frontMatter = {
  outputPath: 'foo/bar.html'
};
```

### Get information from `git log`, such as `author`

Like the `md` file, the `tsx` file will also get information such as `author`, `contributors`, `date`, `updated`, and they will be written into the `props` of the page.

### Limitations

There are also some limitations when using `tsx` files, which are also the direction for future improvements:

- Does not support code highlighting
- Does not support embedded markdown
- Does not support automatic directory generation
