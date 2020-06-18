import * as path from 'https://deno.land/std@0.54.0/path/mod.ts';
import * as fs from 'https://deno.land/std@0.54.0/fs/mod.ts';

// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

import fm from 'https://dev.jspm.io/front-matter@4.0.2';
import MarkdownIt from 'https://dev.jspm.io/markdown-it@11.0.0';
import markdownItTitle from 'https://dev.jspm.io/markdown-it-title@3.0.0';
import markdownItAnchor from 'https://dev.jspm.io/markdown-it-anchor@5.3.0';
import markdownitTocDoneRight from 'https://dev.jspm.io/markdown-it-toc-done-right@4.1.0';
import replaceLink from 'https://dev.jspm.io/markdown-it-replace-link@1.0.1';

import Prism from '../vendors/prism/mod.ts';

let tocHTML = '';

const mdRenderer = new MarkdownIt({
  html: true,
  highlight: (str: string, lang = 'autoit') => {
    if (typeof Prism.languages[lang] === 'undefined') {
      // eslint-disable-next-line no-param-reassign
      lang = 'autoit';
    }
    const grammar = Prism.languages[lang];
    // https://github.com/PrismJS/prism/issues/1171#issuecomment-631470253
    Prism.hooks.run('before-highlight', { grammar });
    return `<pre class="language-${lang}"><code class="language-${lang}">${Prism.highlight(
      str,
      grammar,
      lang
    )}</code></pre>`;
  },
  replaceLink: (link: string) => {
    if (/^https?:\/\//.test(link)) {
      return link;
    }
    if (/README\.md(\?|#|$)/.test(link)) {
      return link.replace(/README\.md(\?|#|$)/, 'index.html$1');
    }
    return link.replace(/\.md(\?|#|$)/, '.html$1');
  }
})
  .use(markdownItTitle)
  .use(markdownItAnchor, {
    level: [2, 3, 4, 5, 6],
    permalink: true,
    permalinkSpace: false,
    permalinkClass: 'anchor',
    permalinkSymbol: '§'
  })
  .use(markdownitTocDoneRight, {
    containerClass: 'toc',
    level: [2, 3],
    callback: (html: string) => {
      tocHTML = html;
    }
  })
  .use(replaceLink);

import { PagicPlugin } from '../Pagic.ts';

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
    const contentHTML = mdRenderer.render(content, env);

    pagic.pagePropsMap[pagePath] = {
      ...pageProps,
      title: env.title,
      ...frontMatter,
      content: <article dangerouslySetInnerHTML={{ __html: contentHTML }} />,
      toc: <aside dangerouslySetInnerHTML={{ __html: tocHTML }} />
    };

    tocHTML = '';
  }
};

export default md;
