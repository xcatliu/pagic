# Plugins

This chapter will introduce how to use plugins and how to develop plugins.

If you want to see a list of all plugins and their documentation, please visit [plugins list](/plugins/).

## How to use

The plugin is configured in `pagic.config.ts` through `plugins`, its type is `string[]`.

According to the level of the plugin, plugins can be divided into built-in plugins, official plugins and third-party plugins.

### Built-in plugins

Built-in plugins (also called default plugins) are the most important plugins, they make up the entire Pagic build process, in other words, the entire Pagic build process is split into built-in plugins.

The built-in plugins include `['clean','init','md','tsx','script','layout','out']`, the construction process of Pagic also follows this order:

1. `clean`: Empty the `dist` directory
2. `init`: Initialize intermediate variables (`pagePropsMap`)
3. `md`: Parse the `md` file and update the intermediate variables
4. `tsx`: Parse `tsx` files and update intermediate variables
5. `script`: Compile `tsx` files to generate `pagic.config.js`, `index.js`, `*_props.js`, `*_content.js` and other files
6. `layout`: Parse the `_layout.tsx` file and use the `Layout` component to render
7. `out`: Generate HTML files, copy static resources

> In fact, there are some steps before step 1: parsing `pagic.config.ts`, scanning the project directory, finding page files and template files. However, due to some operating mechanisms, they cannot be split into plugins.

The built-in plugin is enabled by default, you don't need to add configuration to enable it.

By configuring items beginning with `-`, you can delete the default plugins, such as:

```ts
export default {
  plugins: ['-script'],
};
```

This configuration will delete the `script` plugin in the default `plugins`, so that the generated website does not have the React-related `<script>` tag, and it also loses the SPA ability when jumping between pages.

But for very simple websites, such as one-page-website, this configuration is very suitable.

If you delete the default plugin and then add a third-party plugin, we can even completely change Pagic's build process. For example, we can delete the `md` plugin, and then add a third-party plugin that parses markdown to replace the process of parsing markdown files.

### Official plugins

In addition to built-in plugins, we also provide some commonly used official plugins, including:

- `sidebar`: Used to parse the `sidebar` configured in `pagic.config.ts`, the theme will render sidebar after the parse is completed
- `prev_next`: Will get the link of previous page and the next page according to the configuration of `sidebar`, the theme will render it to the bottom of the article
- `ga`: Google Analytics plugin, the plugin will generate a `ReactElement`, the theme will inserted it into the page's `<head>`
- `gitalk`: Add comment function to the page, the plugin will generate a `ReactElement`, the theme will insert it into the bottom of the page
- `blog`: Parse the `md/tsx` file as a post in the specified directory
- `i18n`: Internationalization plugin, which make the website support multiple languages

The configuration of these plugins can be viewed in the [Config](./config.md#page-content) chapter.

Official plugins can be added by configuring `plugins`.

It should be noted that the user-configured `plugins` will not replace the default `plugins`, but will be inserted into the default `plugins` according to a rule.

Take [`pagic.org` config file](https://github.com/xcatliu/pagic/blob/master/pagic.config.tsx) as an example:

```ts
export default {
  plugins: ['sidebar', 'prev_next', 'ga'],
};
```

The inserted `plugins` are:

```ts
export default {
  plugins: ['clean', 'init', 'md', 'tsx', 'sidebar', 'prev_next', 'ga', 'script', 'layout', 'out'],
};
```

#### So what is the rules?

It turns out that every **non-built-in** plugin will have an `insert` attribute, which describes the position when it is inserted, and its value is `before:xxx` or `after:xxx`, where `xxx` is one The name of the plugin. such as:

- The `insert` attribute of `sidebar` is `after:tsx`, so it will be inserted after `tsx`
- The `insert` attribute of `prev_next` is `after:sidebar`, so it will be inserted after `sidebar`
- The `insert` attribute of `ga` is `before:script`, so it will be inserted before `script`

Thanks to Pagic's splitting of the build process into built-in plugins, non-built-in plugins can be flexibly inserted into any position of the build. This design is more flexible and easier to understand than creating some "hook functions".

### Third-party plugins

When using third-party plugins, the items in the array should be an entry file URL:

```ts
export default {
  plugins: ['https://raw.githubusercontent.com/xcatliu/pagic_plugin_custom/master/mod.ts'],
};
```

## How to develop a plugin

### Plugin structure

A plugin must have a default export, the type is as follows:

```ts
interface PagicPlugin {
  name: string;
  insert?: string;
  fn: (ctx: Pagic) => Promise<void>;
}
```

Among them:

- `name` is the name of the plugin. This name will be used when other plugins need to be inserted before or after this plugin
- `insert` is the position where the plugin is inserted, the value is `before:xxx` or `after:xxx`, where `xxx` is a plugin name
- The `fn` function is the core logic of the plugin, and it accepts a parameter `pagic`, which is an instance of `Pagic`

> This naming rule refers to [Deno Testing's design](https://deno.land/manual/testing)

### `fn` function

The `fn` function is the core logic of the plugin. Since its parameter `pagic` is the currently running instance of `Pagic`, it can do almost anything, including but not limited to:

- Get configuration in `pagic.config.ts`
- Get the list of static resources
- Get page list
- Modify the `props` of the page
- Write files to the `dist` directory
- Import and run third-party modules

For example, we can create a plugin that adds a prefix to the `title` of all pages:

```ts {6-15}
import { PagicPlugin } from 'https://deno.land/x/pagic@v1.5.1/mod.ts';

const prependTitle: PagicPlugin = {
  name: 'prepend_title',
  insert: 'after:tsx',
  fn: async (pagic) => {
    for (const pagePath of pagic.pagePaths) {
      const pageProps = pagic.pagePropsMap[pagePath];

      pagic.pagePropsMap[pagePath] = {
        ...pageProps,
        title: `Prefix ${pageProps.title}`,
      };
    }
  },
};

export default prependTitle;
```

In the above example,

- `pagic.pagePaths` is the _temporary_<sup><a href="#sup-1">[1]</a></sup> path of all scanned pages
- `pagic.pagePropsMap` is the `props` of all pages

We loop through `pagic.pagePaths` through `for of`, and re-assign the `props` of each page, so that we can add a prefix to all pages.

In addition to these two attributes, `pagic` has many other attributes. The commonly used `pagic` attributes are listed below:

| Properties     | Type                     | Description                                                                                    |
| -------------- | ------------------------ | ---------------------------------------------------------------------------------------------- |
| `config`       | `PagicConfig`            | Pagic _runtime_<sup><a href="#sup-2">[2]</a></sup> configuration                               |
| `pagePaths`    | `string[]`               | _Temporary_<sup><a href="#sup-1">[1]</a></sup> all scanned page paths                          |
| `layoutPaths`  | `string[]`               | All scanned templates (including themes)                                                       |
| `staticPaths`  | `string[]`               | _Temporary_<sup><a href="#sup-1">[1]</a></sup> all scanned static resources (including themes) |
| `pagePropsMap` | `Record<string, any>`    | `props` for all pages                                                                          |
| `writeFiles`   | `Record<string, string>` | Will be written to the `dist` directory in the `out` plugin                                    |
| `rebuilding`   | `boolean`                | `true` means rebuilding, `false` means incremental building                                    |

Note that

### Reference official plugin

The best reference for developing a plugin is the official plugin, you can directly [view the source code of the official plugin](https://github.com/xcatliu/pagic/tree/master/src/plugins).

## Annotations

1. <span id="sup-1"></span> `pagePaths` and `staticPaths` are both _temporary_, that is to say, they only contain incremental during incremental builds (`--watch` mode)
2. <span id="sup-2"></span> The _runtime_ configuration of Pagic is slightly different from the configuration in `pagic.config.ts`
