# Themes

This chapter will introduce how to use themes and how to develop them.

If you want to see a list of all themes and their supported features, please visit [theme list](/themes/).

## How to use

### Official theme

Pagic has official themes default/docs/blog, which can be used by configuring `theme` in `pagic.config.ts`. The `default` theme will be used by default:

```ts
export default {
  theme: 'default'
};
```

### Third party theme

When using a third-party theme, the value of `theme` should be a complete URL:

```ts
export default {
  theme: 'https://raw.githubusercontent.com/xcatliu/pagic_theme_custom/master/mod.ts'
};
```

### Theme supported plugins

The theme determines how the page is displayed, and the plugin determines the features supported by the page.

After selecting the theme, we can add plugins to extend the features of the webpage, but only if the theme supports this plugin.

Take the `sidebar` plugin as an example. The `sidebar` plugin will display a configured sidebar on the left side of the page, but not all themes support this plugin. For example, the `default` theme is a very basic theme. It supports the most basic functions, so the `sidebar` plugin is not supported. However, both the `docs` theme and the `blog` theme support the `sidebar` plugin.

Generally, you can view the list of plugins supported by the theme's documentation.

### Theme configuration

Theme-related options can be configured in `pagic.config.ts`, common options include `title`, `description`, `head`, etc. For their meaning and usage, please refer to the [Config](./config.md#page-content) chapter.

#### Website configuration? Theme configuration? Plugin configuration?

You may have discovered that unlike some other static site generators that have different config files (or config items) for websites, themes and plugins, Pagic only has one config file `pagic.config.ts`.

You may have some doubts: Isn't this confusing? Will the configuration between the theme and the plugin conflict?

But in fact, Pagic’s design is justified:

##### 1. A configuration item may need to be read by the theme and plugin at the same time

Take `sidebar` as an example, if we configure this `sidebar` in `pagic.config.ts`:

```ts
export default {
  sidebar: {
    '/docs/': [
      'docs/introduction.md',
      'docs/usage.md',
      'docs/config.md',
      'docs/content.md',
      'docs/layout.md',
      'docs/themes.md',
      'docs/plugins.md',
      'docs/deployment.md',
      'docs/demos.md',
      'docs/limitations.md'
    ]
  }
};
```

Then:

- The `sidebar` plugin needs to parse it and convert it to `React.ReactElement`
- `docs` theme needs to support rendering `sidebar`, and provide functions such as folding, SPA jump, etc.

It can be seen that it is inappropriate to attribute the configuration of `sidebar` to the configuration of the theme, and it is also inappropriate to attribute the configuration of the plugin. There needs to be one place to manage this configuration.

##### 2. There may be dependencies between plugins and plugins

Take the `prev_next` plugin as an example, it supports automatic insertion of links to the previous page and the next page at the bottom of the page. But it needs to rely on the configuration of `sidebar` to know what the link to the previous page is.

Therefore, the `prev_next` plugin needs to be able to read the configuration of the `sidebar`, so it is more appropriate to put the configuration in the `pagic.config.ts`.

##### 3. This can reduce the user's understanding cost

Users don't need to think about whether a configuration belongs to a theme or a plugin. It can be configured in `pagic.config.ts`.

##### But how to ensure that the configuration between various third-party themes and plugins will not conflict?

First of all, the configuration items of the plugin are generally the same as the plugin name (for example, the `sidebar` plugin provides the `sidebar` configuration item), which ensures that there is generally no conflict between different plugins.

Second, we organize some common configuration items into documents. Developers of third-party themes and plugins should refer to [this document](./config.md) as much as possible to avoid conflicts.

Finally, this design actually constrains the developers of third-party themes and plug-ins, so that everyone needs to design configuration items according to the same standard, which means that Pagic's third-party themes and plugins have higher quality and compatibility.

## How to develop a theme

Congratulations, you are about to become a developer of Pagic theme!

As long as you understand the operating mechanism of Pagic theme, you can easily develop a Pagic theme.

### Theme operating mechanism

The operating mechanism of Pagic theme is easy to understand, and can even be explained clearly in one sentence:

> When Pagic builds, it will first "copy" all the files in the theme to the user's project directory, and then run the `pagic build` script.

For example, if a theme contains the following files:

```{2-4}
pagic_theme_custom/
|── assets
|   └── index.css
└── _layout.tsx
```

The directory structure of the user's project is as follows:

```
site/
|── pagic.config.ts
└── README.tsx
```

Then when the user uses this theme, the directory structure of the user's project will "become like this":

```{2-4}
site/
|── assets
|   └── index.css
|── _layout.tsx
|── pagic.config.ts
└── README.tsx
```

At this time, when executing `pagic build`, `assets/index.css` will be copied to `dist/assets/index.css`, and `README.md` will be rendered with `_layout.tsx` as a template, and generate `dist/index.html`:

```{4,7}
site/
|── dist    # Output directory
|   |── assets
|   |   └── index.css
|   └── index.html
|── assets
|   └── index.css
|── _layout.tsx
|── pagic.config.ts
└── README.tsx
```

When Pagic builds, each page file (`md/tsx`) will follow the rules described in the [\_layout.tsx](./layout.md) chapter to find its corresponding template file.

A typical application is to write a sub-template in a theme, and then require the directory structure of the project using this theme to conform to this convention.

For example, the theme can create a `blog/_layout.tsx` file:

```{4,5}
pagic_theme_custom/
|── assets
|   └── index.css
|── blog
|   └── _layout.tsx
└── _layout.tsx
```

In this way, the pages under the user's `blog` directory will be rendered with `blog/_layout.tsx` as a template:

```{2,3}
site/
|── blog
|   └── hello.md # This page will be rendered with blog/_layout.tsx in the theme as a template
|── pagic.config.ts
└── README.tsx
```

It should be noted that the files in the theme will not be "copied" to the user's project directory. We can regard this "copy" as a virtual execution.

In addition, if there is a file path in the user's project that is the same as that in the theme, the file in the user's project shall prevail, that is, the file that allows the user to overwrite the theme.

### Entry file

As mentioned before, when using a third-party theme, the value of `theme` should be an entry file URL:

```ts
export default {
  theme: 'https://raw.githubusercontent.com/xcatliu/pagic_theme_custom/master/mod.ts'
};
```

A typical `mod.ts` entry file is listed below:

```ts
export default {
  files: [
    'assets/index.css',
    'assets/prism_tomorrow.css',
    'assets/reset.css',
    'assets/variables.css',
    '_layout.tsx',
    'favicon.ico'
  ]
};
```

This entry file contains the following information:

#### `files`

`files` lists all the files of the theme, they will be "copied" to the user's project directory.

Why is it designed like this? Why can't it traverse all the files in the theme directory automatically?

Because Pagic needs to support an URL to configure the theme, and only one URL cannot traverse to which files are in the path. Just imagine how you can traverse `https://raw.githubusercontent.com/xcatliu/pagic_theme_custom/master`?

To sum up, although it is a bit troublesome, it is necessary to list all the files of the subject.

### `props`

The core file in the theme is `_layout.tsx`, and the most important thing to write `_layout.tsx` is to use its `props`.

The previous chapter has introduced `props`, if you need to know all the `props`, you can directly view [\_layout.tsx props](./layout.md#props).

### Reference official theme

The best reference for developing a theme is the official theme. You can directly [view the source code of the official theme](https://github.com/xcatliu/pagic/tree/master/src/themes).
