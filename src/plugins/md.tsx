import * as path from 'https://deno.land/std@0.54.0/path/mod.ts';
import * as fs from 'https://deno.land/std@0.54.0/fs/mod.ts';

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
const mdRenderer = new window.markdownit({
  html: true,
  highlight: (str: string, lang = 'autoit') => {
    if (typeof window.Prism.languages[lang] === 'undefined') {
      // eslint-disable-next-line no-param-reassign
      lang = 'autoit';
    }
    const grammar = window.Prism.languages[lang];
    window.Prism.hooks.run('before-highlight', { grammar });
    return `<pre class="language-${lang}"><code class="language-${lang}">${window.Prism.highlight(
      str,
      grammar,
      lang
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
const md: PagicPlugin = async (pagic) => {
  for (const pagePath of pagic.pagePaths) {
    if (!pagePath.endsWith('.md')) continue;
    const pageProps = pagic.pagePropsMap[pagePath];

    let content = await fs.readFileStr(path.resolve(pagic.config.srcDir, pagePath));
    const fmResult = fm(content);
    const frontMatter = fmResult.attributes;
    content = fmResult.body;

    /**
     * Use markdown-it-title to get the title of the page
     * https://github.com/valeriangalliat/markdown-it-title
     */
    const env: any = {};
    const htmlContent = mdRenderer.render(content, env);
    pagic.pagePropsMap[pagePath] = {
      ...pageProps,
      outputPath: pageProps.outputPath.replace(/README\.html$/, 'index.html'),
      title: env.title,
      content: <article dangerouslySetInnerHTML={{ __html: htmlContent }} />,
      ...frontMatter
    };
  }
};

export default md;
