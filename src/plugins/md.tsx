import * as path from 'https://deno.land/std@0.51.0/path/mod.ts';
import * as fs from 'https://deno.land/std@0.51.0/fs/mod.ts';

// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

declare global {
  interface Window {
    markdownit: any;
    Prism: any;
  }
}

import fm from '../vendors/front-matter.js';
// window.markdownit
import 'https://unpkg.com/markdown-it@10.0.0/dist/markdown-it.js';
// window.Prism
import '../vendors/prism.js';
import anchor from '../vendors/markdown-it-anchor.js';
import title from '../vendors/markdown-it-title.js';
import replaceLink from '../vendors/markdown-it-replace-link.js';
// eslint-disable-next-line new-cap
const md = new window.markdownit({
  html: true,
  highlight: (str: string, lang = 'autoit') => {
    if (typeof window.Prism.languages[lang] === 'undefined') {
      // eslint-disable-next-line no-param-reassign
      lang = 'autoit';
    }
    return `<pre class="language-${lang}"><code class="language-${lang}">${window.Prism.highlight(
      str,
      window.Prism.languages[lang]
    )}</code></pre>`;
  },
  replaceLink: (link: string) => {
    if (/^https?:\/\//.test(link)) {
      return link;
    }
    if (/README\.md$/.test(link)) {
      return link.replace(/README\.md$/, 'index.html');
    }
    return link.replace(/\.md$/, '.html');
  }
})
  .use(anchor)
  .use(title)
  .use(replaceLink);

import { PagicPlugin } from '../Pagic.ts';

// @ts-ignore
const mdPlugin: PagicPlugin = async (ctx) => {
  if (!ctx.pagePath.endsWith('.md')) {
    return ctx;
  }

  let content = await fs.readFileStr(path.resolve(ctx.config.srcDir, ctx.pagePath));
  const fmResult = fm(content);
  const frontMatter = fmResult.attributes;
  content = fmResult.body;

  /**
   * Use markdown-it-title to get the title of the page
   * https://github.com/valeriangalliat/markdown-it-title
   */
  const env: any = {};
  const htmlContent = md.render(content, env);
  return {
    ...ctx,
    layoutPath: ctx.layoutPath,
    outputPath: ctx.outputPath.replace(/README\.html$/, 'index.html'),
    title: env.title,
    ...frontMatter,
    content: <article dangerouslySetInnerHTML={{ __html: htmlContent }} />
  };
};

export default mdPlugin;
