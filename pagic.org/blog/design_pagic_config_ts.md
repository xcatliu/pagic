---
date: 2020-07-12
---

# Design pagic.config.ts

> Part of the content in this article may be out of date. Visit [Config](../docs/config.md) to view the latest configuration fields.

As a <del>senior markdown engineer</del> senior blogger, I am passionate about <del>blogging</del> to develop blog systems and have written many blog themes.

Finally, I couldn't be satisfied with writing themes, and I started writing a blog system.

Or in a more general sense, a static website generator.

Now [Pagic](https://github.com/xcatliu/pagic) has completed a prototype, I also invited some friends to try it out, after some iterations, I decided to redesign `pagic.config.ts`, after all, as a static website generator, most users only need to configure the `pagic.config.ts` to build a website, so the design of the configuration file is very important.

## Design principles

1. [Convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)
2. As semantically as possible, clear at a glance
3. The type is uniform, no options can pass both strings and functions
4. Reference: [Deno](https://deno.land/manual/contributing/style_guide), [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), [webpack](https://webpack.js.org/configuration/), [Hexo](https://hexo.io/zh-cn/docs/configuration), [VuePress](https://vuepress.vuejs.org/config/), [Hugo](https://gohugo.io/getting-started/configuration/)

## Naming convention

### File name and directory name

Use underscore naming convention `foo_bar/baz_v2.md`。

In accordance with: [Deno style guide](https://deno.land/manual/contributing/style_guide#use-underscores-not-dashes-in-filenames)

### Variables and parameters

Use camel case naming convention `fooBar`。

In accordance with: [Deno style guide](https://deno.land/manual/contributing/style_guide#exported-functions-max-2-args-put-the-rest-into-an-options-object)

### Config file name

`pagic.config.tsx` or `pagic.config.ts`.

- The priority of `pagic.config.tsx` is higher (In accordance with: [webpack default loading order](https://webpack.js.org/configuration/resolve/#resolveextensions))
- Why provide `tsx` and `ts`? Why not unified into `ts`? Because once the jsx syntax is used, it must be named `tsx`, which is a limitation of TypeScript
- Why not unified into `tsx`? Because in most cases, using `ts` is sufficient
- Only find the configuration file in the current running directory, **does not provide** `--config` to specify the configuration file (convention over configuration)
- `json` format and `yaml` format have many restrictions, so use `ts` to write configuration files, **not provide** other options (convention over configuration)
- Among the configuration files of other static website generators, the most confusing thing is that the theme configuration is separated out, which makes me often need to hesitate whether a config item belongs to the main configuration file or the theme config file. So, there is only one config file in Pagic

In accordance with:

- `tsconfig.json`（ts）
- `webpack.config.js`（webpack）
- `.vuepress/config.js`（VuePress）
- `_config.yml`（Hexo）
- `config.json`（Hugo）

## File related configuration

For file related configuration, refer to `tsconfig.json`.

| Config item | Type     | Default             | Description                                                                                                                                                                                                                                              |
| ----------- | -------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `srcDir`    | `string` | `'.'`               | The source directory of the build. All of the pages will be built into `outDir` with the same directory structure. The default is the current directory, at this time the `README.md` in the current directory will be built into `${outDir}/index.html` |
| `outDir`    | `string` | `'dist'`            | Output directory                                                                                                                                                                                                                                         |
| `include`   | `glob[]` | `undefined`         | `include` limits the files that will be scanned in `srcDir`. It is often used to specify some files or directories when `srcDir` is configured as `.`. glob syntax [see here](https://github.com/isaacs/minimatch)                                       |
| `exclude`   | `glob[]` | Follow up in detail | `exclude` is similar to `include`, used to exclude the specified file in `srcDir`                                                                                                                                                                        |
| `root`      | `string` | `'/'`               | The base path of the deployment site. If the website is deployed in a sub-path, such as `https://xcatliu.github.io/pagic/`, then `root` should be set to `'/pagic/'`                                                                                     |

### `exclude`

The default value for `exclude` is long:

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

Note that each item here can be matched to a file or directory. Taking `**/node_modules` as an example, it:

- Not only can it match the `node_modules` directory under `${srcDir}` (and all files in this directory)
- It can also match the `node_modules` file under `${srcDir}`
- Of course, it can also match the `node_modules` directory or file in any multi-level subdirectory under `${srcDir}`

In fact, `**/node_modules` will be converted to `**/node_modules{,/**}`, so that all the above situations can be matched.

have to be aware of is:

- When matching, start with `srcDir` as the root directory. For example, `pagic.config.{ts,tsx}` can only match the files under `srcDir`, but not the files under the subdirectories of `srcDir`. To match the subdirectories, you need to add the prefix ` */`, if you want to match any multi-level subdirectory, you need to add the prefix `**/`
- The matching strategy of `include` is the same as that of `exclude`
- User-configured `exclude` will append to the default value array instead of replacing it

Through these configurations, Pagic can be flexibly used in various scenarios:

### Scenario 1: Pure website, separate directory to store source files

If you just want to build a website, then the most convenient way is to use this directory structure to separate the source files from the built files:

```bash
website/
├── dist/
|   └── index.html
├── src/
|   ├── _layout.tsx
|   └── README.md
└── pagic.config.ts
```

At this time, the configuration of `pagic.config.ts` is very simple:

```ts
export default {
  srcDir: 'src',
  outDir: 'dist'
};
```

### Scenario 2: Pure website, the root directory stores the source files

There is usually a `README.md` in the root directory of the project. Sometimes we want this file to be constructed as a page. At this time, we can set `srcDir` to `'.'`, for example, refer to the directory structure of GitBook Is like this:

```bash
book/
├── dist/
|   ├── basics/
|   |   └── index.html
|   ├── advenced/
|   |   └── index.html
|   └── index.html
├── basics/
|   └── README.md
├── advenced/
|   └── README.md
├── _layout.tsx
├── README.md
└── pagic.config.ts
```

At this time, the configuration of `pagic.config.ts` is also very simple:

```ts
export default {
  srcDir: '.',
  outDir: 'dist'
};
```

Note that if there are files that need to be excluded, you can use `exclude` to exclude them, for example:

```ts
export default {
  srcDir: '.',
  outDir: 'dist',
  exclude: ['examples']
};
```

### Scene 3: Project + Website

If you want to build a website in a project and you don't want to create another repo, then these two methods can meet the needs:

1. Place the website source files in the `docs` directory, and configure `srcDir` as `'docs'`. The advantage is simple configuration, no need to configure `include` and `exclude`
2. Build the website directly under the root directory, configure `srcDir` as `'.'`, and then configure `include` to include the storage directory of the website. The advantage is that it contains `README.md` in the root directory

### Scene 4: Only show README.md

Some projects are very simple. You only need a `README.md` and no other pages are needed. At this time, you can configure `include` to include only `README.md`:

```ts
export default {
  srcDir: '.',
  outDir: 'dist',
  include: ['README.md']
};
```

## Plugin

Plugins are the core function of Pagic, and Pagic even splits the most basic build process into built-in plugins. There are three types of plugins:

1. Built-in plugin: the most basic build process, it will run by default
2. Official plugin: plugin implemented by Pagic, optional, such as: `sidebar`, `ga`, etc.
3. Third-party plugins: plugins implemented by third parties, optional. Following Deno's design, the entrance is a url, such as: `https://github.com/xcatliu/pagic_plugin_example/blob/master/mod.ts`

| Config item | Type       | Default                                                     | Description                                                                                                                                                |
| ----------- | ---------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins`   | `string[]` | `['clean', 'init', 'md', 'tsx', 'script', 'layout', 'out']` | The plugin list, the value of the built-in plugin and the official plugin are the plugin name, and the value of the third-party plugin is its entrance url |

The order in which the plugins are executed is in the order of their configuration, unless the plugin is implemented with an insert attribute:

```ts
export default {
  name: 'customPlugin',
  insert: 'before:script',
  // The design of fn refers to Deno https://deno.land/manual/testing#writing-tests
  fn: (pagic) => {
    // balabala
  }
};
```

`name` is the unique identifier of the plugin, and it will be used to sort the plugins in `insert`.

The syntax of `insert` is `before:${pluginName}` or `after:${pluginName}`. This method is more convenient and more flexible than other static website generators that need to register various life cycle hooks.

`fn` is a function that only accepts one parameter, an instance of `pagic`, which can access all the configurations and contexts of Pagic in operation. If the plugin requires some additional configuration, you can add a config item `customPlugin` in `pagic.config.ts`, and then you can get the configuration through `pagic.config.customPlugin` in `fn`.

Have to be aware of is:

- User-configured `plugins` will be appended to the default array instead of replacing it
- When the plugin is running, it will be sorted according to its `insert` before running
- You can use the `-` prefix to delete a built-in plugin. This feature is not commonly used, and only needs to be used in the following two situations:
  1. Just use React as a template engine. When you want to build an html page that does not load React, you can use `-script` to remove the plugin that builds js scripts. Note that scripts in React such as `useState` will not be available to execute on the client.
  2. Want to replace some built-in plugins by yourself, such as using `-md` to remove the plugin that parses the markdown file, and then add a custom plugin `https://github.com/xcatliu/pagic_plugin_custom_md/blob/master/mod.ts` This can modify Pagic's core construction process to achieve a higher degree of freedom of personalization
- Third-party plugins generally require the `insert` attribute, otherwise it will run after `write`. Few plugins need to be executed after the build is completed and the file is written

## Themes

Theme is one of the core functions in Pagic, there are two official themes and lots of third-party themes.

| Config item | Type     | Default   | Description                                                                                                    |
| ----------- | -------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| `theme`     | `string` | `default` | The value of the official theme is the theme name, and the value of the third-party plugin is its entrance url |

The operating mechanism of the theme is easy to understand: when you run `pagic build`, all files in the theme will be "copied" to `srcDir`, and then run `build` in the normal mode.

Of course, this "copy" does not actually copy the file. And when conflicting files are encountered, the user's files shall prevail.

Why does the theme need an entry file?

Because in Deno’s design, module are based on urls. Imagine a URL represents a theme. We can’t use `fs.readdir` to find all files in this theme directory like node, so there must be an entry file to indicate which files are included in this topic:

```ts
export default {
  files: ['assets/index.css', 'assets/reset.css', 'assets/variables.css', '_layout.tsx', 'favicon.ico']
};
```

Among them, `files` means files that need to be "copied" to `srcDir`.

## Website configuration

Here are some convential configurations, which are usually implemented by plugins or themes.

| Config item   | Type           | Default     | Description                                                                                                                                                            |
| ------------- | -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | `string`       | `undefined` | The title of the website, usually placed after the title of the page, such as: `Config · Pagic`, if there is no page title on the page, only the website title `Pagic` |
| `description` | `string`       | `undefined` | Website Description, usually displayed in `<head><meta name="description">`, and may also be displayed on the page                                                     |
| `head`        | `ReactElement` | `undefined` | Additional content injected into `<head>`, can be written in jsx. Note that you need to change the configuration file to `pagic.config.tsx`                            |
| `sidebar`     |                | `undefined` | Sidebar                                                                                                                                                                |
| `nav`         |                | `undefined` | Navigation on the top                                                                                                                                                  |
| `github`      | `string`       | `undefined` | The GitHub address of the website, usually displayed in the upper right corner of the page                                                                             |
| `ga`          |                | `undefined` | Google Analytics configuration                                                                                                                                         |
| `gitalk`      |                | `undefined` | Gitalk configuration                                                                                                                                                   |
| `tocAd`       | `ReactNode`    | `undefined` | Ads displayed above toc                                                                                                                                                |
| `tools`       |                | `undefined` | Some extra features                                                                                                                                                    |

## Development environment config

| Config item | Type      | Default | Description                                  |
| ----------- | --------- | ------- | -------------------------------------------- |
| `watch`     | `boolean` | `false` | Watch file changes to rebuild.               |
| `serve`     | `boolean` | `false` | Start local service, preview static website. |
| `port`      | `number`  | `8000`  | Specify the port of the local service.       |
