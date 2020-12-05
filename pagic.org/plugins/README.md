# Plugins

## Built-in plugins

### `clean`

Empty the `dist` directory

### `init`

Initialize intermediate variables (`pagePropsMap`)

### `md`

Parse the `md` file and update the intermediate variables

### `tsx`

Parse `tsx` files and update intermediate variables

### `script`

Compile `tsx` files to generate `pagic.config.js`, `index.js`, `*_props.js`, `*_content.js` and other files

### `layout`

Parse the `_layout.tsx` file and use the `Layout` component to render

### `out`

Generate HTML files, copy static resources

## Official plugins

### `sidebar`

Used to parse the `sidebar` configured in `pagic.config.ts`, the theme will render sidebar after the parse is completed

### `prev_next`

Will get the link of previous page and the next page according to the configuration of `sidebar`, the theme will render it to the bottom of the article

### `ga`

Google Analytics plugin, the plugin will generate a `ReactElement`, the theme will inserted it into the page's `<head>`

### `gitalk`

Add comment function to the page, the plugin will generate a `ReactElement`, the theme will insert it into the bottom of the page

### `blog`

Parse the `md/tsx` file as a post in the specified directory

### `i18n`

Internationalization plugin, which make the website support multiple languages

## Third-party plugins

Stay tuned.
