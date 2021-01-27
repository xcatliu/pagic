# `_layout.tsx`

> The content starting from this chapter is for users who need deep customization. If you simply use Pagic, you can skip directly to the [Blog](./blog.md) chapter.

`_layout.tsx` is one of Pagic's core concepts.

## What is `_layout.tsx`

`_layout.tsx` can be understood as Pagic's template file when rendering the page. All page files (`md/tsx`) will use `_layout.tsx` as the template when rendering.

We might as well create a `_layout.tsx` in the previous `site` project:

```{2}
site/
├── _layout.tsx
├── pagic.config.ts
└── README.md
```

The content of `_layout.tsx` is as follows:

```tsx
import { React, PagicLayout } from 'https://deno.land/x/pagic@v1.2.0/mod.ts';

const Layout: PagicLayout = ({ title, content }) => (
  <html>
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
    </head>
    <body>
      {content}
      <p>Custom _layout.tsx</p>
    </body>
  </html>
);

export default Layout;
```

Next we run:

```bash
pagic build --serve
```

Then open http://127.0.0.1:8000/, you can see that in addition to the title `Hello world`, there is also a paragraph `Custom _layout.tsx`, which shows that this page uses `_layout.tsx` rendered as a template.

Why can we build a page without `_layout.tsx` in the previous chapter?

That's because Pagic will use the `_layout.tsx` file in the default theme as a template by default. When we create our own `_layout.tsx`, it will overwrite the `_layout.tsx` in the theme.

## Sub-pages and sub-templates

The design of `_layout.tsx` is intuitive. When we create a subdirectory, the pages in it will give priority to the use of `_layout.tsx` in that directory. Only when there is no `_layout.tsx` in the subdirectory, will the page look in the upper-level directory until you find `_layout.tsx`:

```{8,14}
site/
|── dist    # Output directory
|   |── index.html
|   └── foo
|       ├── index.html
|       └── bar
|           └── index.html
├── _layout.tsx
├── pagic.config.ts
|── README.md
└── foo
    ├── README.md
    └── bar
        ├── _layout.tsx
        └── README.md
```

In the above example, `site/foo/bar/README.md` will use `site/foo/bar/_layout.tsx` in the same directory as the template, and `site/foo/README.md` will Use `site/_layout.tsx` as a template.

> By configuring the frontMatter of page, you can skip this rule and force a template to be specified.

## Componentization

Componentization is one of the important features of React. We can reuse code by splitting `_layout.tsx` into sub-components. However, in Pagic, due to the need to support rendering of `tsx` files as pages, we need to make a convention for sub-components, that is, starting with `_` are sub-components:

```{5}
site/
|── dist    # Output directory
|   └── hello.html
├── _layout.tsx
├── _sidebar.tsx
├── hello.tsx
└── pagic.config.ts
```

In the above example, `hello.tsx` will be constructed as `dist/hello.html`, and `_sidebar.tsx` will not be constructed as a page because it starts with `_`. In this way, you can split the `Sidebar` component into the `_sidebar.tsx` file, and then import it in `_layout.tsx`:

```tsx {3,12}
import { React, PagicLayout } from 'https://deno.land/x/pagic@v1.2.0/mod.ts';

import Sidebar from './_sidebar.tsx';

const Layout: PagicLayout = ({ title, content }) => (
  <html>
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
    </head>
    <body>
      <Sidebar />
      {content}
    </body>
  </html>
);

export default Layout;
```

## `props`

Note that in the above example, we used the `title` and `content` in `props`, so besides these two, what other `props` can be used?

Please refer to the following table:

| Properties     | Type                                             | Description                                                                                                                    |
| -------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `title`        | `string`                                         | The title of the page, usually put in `<head><title>`                                                                          |
| `content`      | `string`                                         | The content of the page, usually put in `<body>`                                                                               |
| `contentTitle` | `ReactElement`                                   | The title of `content`, can be used with `contentBody` to insert content between title and body                                |
| `contentBody`  | `ReactElement`                                   | The body of `content`, can be used with `contentTitle` to insert content between title and body                                |
| `toc`          | `ReactElement`                                   | Table of content                                                                                                               |
| `author`       | `string`                                         | The first committer of the file                                                                                                |
| `contributors` | `string[]`                                       | All submitters of the file (including the first submitter), sorted by the time of the first submission (first submitted first) |
| `date`         | `Date`                                           | The date when the file was first submitted                                                                                     |
| `updated`      | `Date`                                           | The date when the file was last submitted                                                                                      |
| `excerpt`      | `string`                                         | The excerpt of article, default to the first 210 characters of the content                                                     |
| `cover`        | `string`                                         | The cover of article (first image of content)                                                                                  |
| `tags`         | `string[]`                                       | The tags of the article                                                                                                        |
| `categories`   | `string[]`                                       | The categories of the article                                                                                                  |
| `config`       | `PagicConfig`                                    | Pagic _runtime_<sup><a href="#sup-1">[1]</a></sup> configuration                                                               |
| `pagePath`     | `string`                                         | Page path, such as `docs/README.md`                                                                                            |
| `layoutPath`   | `string`                                         | The template path of the page, such as `docs/_layout.tsx`                                                                      |
| `outputPath`   | `string`                                         | The output path of the page, such as `docs/index.html`                                                                         |
| `head`         | `ReactElement`                                   | The content that needs to be inserted into `<head>`                                                                            |
| `script`       | `ReactElement`                                   | `ReactElement` generated by the `script` plugin                                                                                |
| `loading`      | `boolean`                                        | Whether the page loading                                                                                                       |
| `sidebar`      | `PagePropsSidebar`                               | An object generated by the `sidebar` plugin                                                                                    |
| `prev`         | `PagePropsSidebar[0]`                            | Details of the previous page                                                                                                   |
| `next`         | `PagePropsSidebar[0]`                            | Details of the next page                                                                                                       |
| `gitalk`       | `ReactElement`                                   | `ReactElement` generated by the `gitalk` plugin                                                                                |
| `blog`         | Checkout [Blog](./blog.md#props)                 | Blog information of the current page                                                                                           |
| `language`     | Checkout [Internationalization](./i18n.md#props) | Language of the current page                                                                                                   |
| Others         | `any`                                            | Third-party plugins may also expand `props`                                                                                    |

## Static resources

Except for the special files mentioned above, other files will be regarded as static resources and copied directly to the `dist` directory.

All file name conventions are summarized as follows:

| File name                               | Description                                                      |
| --------------------------------------- | ---------------------------------------------------------------- |
| Start with `.`                          | Hidden files, will be ignored                                    |
| `pagic.config.ts` or `pagic.config.tsx` | Config file                                                      |
| `_layout.tsx`                           | Template file                                                    |
| `tsx` file starting with `_`            | Subcomponent                                                     |
| file ends with `md` or `tsx`            | Page file                                                        |
| Other files                             | Static resources will be copied directly to the `dist` directory |

## Annotations

1. <span id="sup-1"></span> The _runtime_ configuration of Pagic is slightly different from the configuration in `pagic.config.ts`
