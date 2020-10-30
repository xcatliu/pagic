# Config

Pagic provides a wealth of configurations, and most users can build a static website with rich functions through config files.

Pagic's config file name is `pagic.config.ts` or `pagic.config.tsx` (if you use jsx syntax in your config file).

> Listed below are the official config options. Some third-party themes or plugins may contain additional config options. Please refer to their documentation.

## Input and output

### `srcDir`

- Type: `string`
- Default: `.`

The source directory to execute the Pagic build process, the default is the current directory `.` where `pagic.config.ts` is located:

```ts
export default {
  srcDir: '.'
};
```

```
site/
|── dist    # Output directory
|   └── index.html
├── pagic.config.ts
└── README.md
```

Usually when writing a document for an existing project, you can write the document in a subdirectory by setting `srcDir` option:

```ts {2}
export default {
  srcDir: 'docs'
};
```

```{5,6}
site/
|── dist    # Output directory
|   └── index.html
├── pagic.config.ts
└── docs    # Source directory
    └── README.md
```

### `outDir`

- Type: `string`
- Default: `dist`

The output directory constructed by Pagic can be used with `srcDir` to customize the input and output directories at the same time:

```ts {3}
export default {
  srcDir: 'docs',
  outDir: 'public'
};
```

```{2,3}
site/
|── public  # Output directory
|   └── index.html
├── pagic.config.ts
└── docs    # Source directory
    └── README.md
```

### `include`

- Type: `glob[]`
- Default: `undefined`

`include` limits the files that will be scanned in `srcDir`. It is often used to specify some files or directories when `srcDir` is configured as `.`:

```ts {4}
export default {
  srcDir: '.',
  outDir: 'public',
  include: ['README.md', 'docs']
};
```

```{10-12}
site/
|── public  # Output directory
|   |── index.html
|   └── docs
|       └── index.html
├── src
├── dist
├── test
├── pagic.config.ts
├── README.md
└── docs    # Source directory
    └── README.md
```

In the above example, `src`, `dist`, and `test` are irrelevant directories. Pagic only cares about the `README.md` file and `docs` directory specified by `include`.

> `include` allows to configure a string in the format of `glob`, such as `docs/**/*.md` will only match all `md` files in the `docs` directory.

### `exclude`

- Type: `glob[]`
- Default:

  ```ts
  [
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
  ];
  ```

`exclude` is similar to `include` and is used to exclude specified files in `srcDir`.

By default, `exclude` will exclude some files that are obviously not needed by Pagic to build, such as hidden files starting with `.`, `package.json`, `node_modules`, etc. It should be noted that the user configured `outDir` will also default be ruled out.

When we configure the `exclude` field in `pagic.config.ts`, it will not overwrite the default value, but will `concat` to the default value, for example, when we configure as follows:

```ts {2}
export default {
  exclude: ['test']
};
```

The final runtime `exclude` will be:

```ts {18}
export default {
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
    '**/npm-debug.log',

    // ${config.outDir} will be added later

    'test'
  ]
};
```

> Similar to `include`, `exclude` also allows configuration of strings in `glob` format.

### `root`

- Type: `string`
- Default: `／`

The root path the site will be deployed at. You will need to set this if you plan to deploy your site under a sub path, for example, GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/, then you should set `root` to `'/bar/'`. It should always start and end with a slash.

## Themes and plugins

### `theme`

- Type: `string`
- Default: `'default'`
  When using the official theme, the value should be `'default' |'docs' |'blog'`.

When using a third-party theme, the value should be an URL like this:

```
https://raw.githubusercontent.com/xcatliu/pagic_theme_custom/master/mod.ts
```

### `plugins`

- Type: `string[]`
- Default: `['clean', 'init', 'md', 'tsx', 'script', 'layout', 'out']`

When using official plugins, the items in the array should be the names of official plugins, see [Official Plugins List](../plugins/) for details.

When using a third-party plugin, the items in the array should be an URL like this:

```
https://raw.githubusercontent.com/xcatliu/pagic_plugin_custom/master/mod.ts
```

It should be noted that the `plugins` configured by the user will not replace the default `plugins`, but will be inserted into the default `plugins` according to a rule. For details, please refer to [How to develop a plugin](./plugins.md#how-to-develop-a-plugin).

Take [`pagic.org` config file](https://github.com/xcatliu/pagic/blob/master/pagic.config.tsx) as an example:

```ts
export default {
  plugins: ['sidebar', 'prev_next', 'ga']
};
```

The inserted `plugins` are:

```ts
export default {
  plugins: ['clean', 'init', 'md', 'tsx', 'sidebar', 'prev_next', 'ga', 'script', 'layout', 'out']
};
```

In addition, you can delete the default plugins by setting items beginning with `-`, such as this:

```ts
export default {
  plugins: ['-script']
};
```

This configuration will delete the `script` plugin in the default `plugins`, so that the generated website does not have the React-related `<script>` tag, and it also loses the SPA ability when jumping between pages.

But for very simple websites, such as one-page-website, this configuration is very suitable.

## Page content

The option related to the page content will be processed in the plugin, and then [passed as `props` to `_layout.tsx`](./layout.md#props).

How to use `props` in the end depends on the theme, so not every theme supports any option.

In short, when configuring the page content, you need to ensure that you are using the theme supported by the option, and add the plugins that the option depends on.

The support status of official themes is listed below. If you are using a third-party theme, please check its documentation to confirm.

### `title`

- Type: `string`
- Default: `undefined` (The default value of the page content option is always `undefined`)
- Supported themes: all
- Dependent plugins: none

The title of the website, it will be used as the suffix of all page titles.

### `description`

- Type: `string`
- Supported themes: all
- Dependent plugins: none

The description of the website, it will be rendered into the HTML of the current page with the `<meta>` tag.

### `head`

- Type: `React.ReactElement`
- Supported themes: all
- Dependent plugins: none

Additional elements that need to be injected into the HTML `<head>` of the current page. Due to the use of jsx syntax, the config file needs to be renamed to `pagic.config.tsx` and make sure `React` is imported.

For example, add a custom favicon:

```tsx
import { React } from 'https://deno.land/x/pagic/mod.ts';

export default {
  head: <link rel="icon" type="image/png" href="/favicon.png" />
};
```

If you need to inject multiple elements, you need to wrap it with `<>` tags:

```tsx {5,8}
import { React } from 'https://deno.land/x/pagic/mod.ts';

export default {
  head: (
    <>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <script src="/assets/custom.js" />
    </>
  )
};
```

### `nav`

- Type: complex, please see below
- Supported themes: `docs`, `blog`
- Dependent plugins: none

Navigation configuration, an examples is as follows:

```tsx
import { React } from 'https://deno.land/x/pagic/mod.ts';

export default {
  nav: [
    {
      text: 'Docs',
      link: '/docs/'
    },
    {
      text: 'Buy me a coffee',
      link: 'https://github.com/xcatliu/buy-me-a-coffee',
      target: '_blank',
      popover: (
        <>
          <img src="/assets/wechat.jpg" width="256" style={{ marginRight: '1rem', verticalAlign: 'top' }} />
          <img src="/assets/alipay.jpg" width="256" style={{ verticalAlign: 'top' }} />
        </>
      )
    },
    {
      text: 'About',
      link: '/about/',
      align: 'right'
    }
  ]
};
```

### `github`

- Type: `string`
- Supported themes: all
- Dependent plugins: none

Configure your github account, usually a link will be displayed in the upper right corner.

### `sidebar`

- Type: complex, please see below
- Supported themes: `docs`, `blog`
- Dependent plugins: `sidebar`

Sidebar configuration, an example is as follows:

```ts
export default {
  sidebar: {
    '/docs/': ['docs/introduction.md', 'docs/usage.md', 'docs/config.md'],
    '/about/': [
      'about/README.md',
      {
        link: 'about/team.md',
        children: ['about/xcatliu.md']
      },
      {
        title: 'Who is using Pagic?',
        link: 'about/usage.md'
      }
    ],
    '/': ['docs/introduction.md', 'about/README.md']
  }
};
```

In the above example, the page starting with `/docs/` will display the docs sidebar, the page starting with `/about/` will display the about sidebar, and other pages will hit `/` to display the default sidebar.

### `md`

- Type: complex, please see below
- Supported themes: all
- Dependent plugins: `md`

The configuration of how to parse markdown files, an example is as follows:

```ts
export default {
   md: {
     anchorLevel: [1, 2, 3, 4, 5, 6],
     tocLevel: [1, 2, 3, 4]
};
```

In the above example:

- `AnchorLevel` is used to configure which levels of titles need to render an anchor link when markdown is converted to HTML. `[1, 2, 3, 4, 5, 6]` means that the anchor link must be displayed from `h1` to `h6`. Its default value is `[2, 3, 4, 5, 6]`.
- `tocLevel` is used to configure which levels of titles need to be included in toc (table of content). `[1, 2, 3, 4]` means that titles from `h1` to `h4` will be included in toc. Its default value is `[2, 3]`.

### `tocAd`

- Type: `React.ReactElement`
- Supported themes: `docs`, `blog`
- Dependent plugins: none

Ads displayed at the top of the table of content, an example is as follows:

```tsx
import { React } from 'https://deno.land/x/pagic/mod.ts';

export default {
  tocAd: (
    <div
      dangerouslySetInnerHTML={{
        __html: `
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- 192*128 -->
<ins
  class="adsbygoogle"
  style="display:inline-block;width:192px;height:128px"
  data-ad-client="ca-pub-8483371329009107"
  data-ad-slot="6487368873"
></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>`
      }}
    />
  )
};
```

### `tools`

- Type: `{ [key:string]:any }`
- Supported themes: `docs`, `blog`
- Dependent plugins: none

Some small tools, such as `editOnGithub`, `backToTop`, etc. an examples is as follows:

```ts
export default {
  tools: {
    editOnGithub: true,
    backToTop: true
  }
};
```

### `ga`

- Type: `{ id:string }`
- Supported themes: all
- Dependent plugins: `ga`

[Google analytics](https://analytics.google.com/) configuration, an examples is as follows:

```ts
export default {
  ga: {
    id: 'UA-45256157-14'
  }
};
```

### `gitalk`

- Type: complex, please see below
- Supported themes: `docs`, `blog`
- Dependent plugins: `gitalk`

[Gitalk](https://github.com/gitalk/gitalk) can add comments to the page, an example is as follows:

```ts
export default {
  gitalk: {
    clientID: '29aa4941759fc887ed4f',
    clientSecret: '33e355efdf3a1959624506a5d88311145208471b',
    repo: 'typescript-tutorial',
    owner: 'xcatliu',
    admin: ['xcatliu'],
    pagerDirection: 'first'
  }
};
```

### `blog`

- Type: `{ root:string; }`
- Supported themes: `docs`, `blog`
- Dependent plugins: `blog`

Blog configuration, an examples is as follows:

```ts
export default {
  blog: {
    root: '/blog/'
  }
};
```

In the above example, `root` means the root directory where blog posts are stored, and its default value is `/blog/`, which means all pages under the `${srcDir}/blog/` directory (except `README.md`) will be recognized as blog posts. Note that its value should always start and end with a slash.

### `i18n`

- Type: complex, please see below
- Supported topics: `docs`
- Dependent plugin: `i18n`

Internationalized configuration, an examples is as follows:

```ts
export default {
  i18n: {
    languages: [
      { code: 'en', name: 'English', root: '/' },
      { code: 'zh-CN', name: 'Simplified Chinese', root: '/zh-CN/' }
    ],
    overrides: {
      'zh-CN': {
        sidebar: {
          '/zh-CN/docs/': [
            'zh-CN/docs/introduction.md',
            'zh-CN/docs/usage.md',
            'zh-CN/docs/config.md',
            'zh-CN/docs/content.md',
            'zh-CN/docs/layout.md',
            'zh-CN/docs/themes.md',
            'zh-CN/docs/plugins.md',
            'zh-CN/docs/deployment.md',
            'zh-CN/docs/demos.md',
            'zh-CN/docs/limitations.md'
          ]
        },
        blog: {
          root: '/zh-CN/blog/'
        }
      }
    },
    resources: {
      'zh-CN': {
        translation: {
          'A static site generator powered by Deno + React': 'Deno + React driven static website generator',
          'Get Started': 'Get Started',
          Demos: 'Sample website',
          'Render <1>md/tsx</1> to static HTML page': 'Support rendering <1>md/tsx</1> files into static HTML page'
        }
      }
    }
  }
};
```

#### `i18n.language`

`i18n.language` represents an array of language lists supported by your website. Each item in the array must match `{ code:string, name:string, root:string }`, where:

- `code` is the _ISO Language Code_, you can refer to [this website](http://www.lingoes.net/en/translator/langcode.htm)
- `name` is the option displayed in the language switch component
- `root` is the root directory where the language is located, and its value should always start and end with a slash

Note that the first item of `i18n.language` is the default language of the website, and its `root` must be `/`.

#### `i18n.overrides`

`i18n.overrides` is a special configuration item, which allows to override the fields in `pagic.config.ts` in a specific language. Its type is `{ [key:string]:PagicConfig }`, where the key must be one of the `code` field in `i18n.language`, the value type is the type of the entire `pagic.config.ts`. When visiting a page in this language, `pagic.config` will be the result of the merge.

#### `i18n.resources`

`i18n.resources` describes the translation of each language, `t('Get Started')` and `<Trans>Render <code>md/tsx</code> to static HTML page</ Trans>` in `tsx` file will use the translation resources configured here. For the specific syntax of `t()` and `<Trans>`, please refer to [react-i18next](https://react.i18next.com/getting-started#simple-content).

## Cli options

The command line options can also be configured in `pagic.config.ts`, and this options will be overwritten if the parameters are passed in the runtime.

### `watch`

- Type: `boolean`
- Default: `false`

Watch file changes to rebuild.

### `serve`

- Type: `boolean`
- Default: `false`

Start local service, preview static website.

### `port`

- Type: `number`
- Default: `8000`

Specify the port of the local service.
