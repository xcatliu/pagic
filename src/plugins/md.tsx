import { path, React } from '../../deps.ts';
import fm from 'https://dev.jspm.io/front-matter@4.0.2';
import MarkdownIt from 'https://dev.jspm.io/markdown-it@11.0.0';
import markdownItTitle from 'https://dev.jspm.io/markdown-it-title@3.0.0';
import markdownItAnchor from 'https://dev.jspm.io/markdown-it-anchor@5.3.0';
import markdownitTocDoneRight from 'https://dev.jspm.io/markdown-it-toc-done-right@4.1.0';
import markdownitReplaceLink from 'https://dev.jspm.io/markdown-it-replace-link@1.0.1';
import markdownitHighlightLines from '../vendors/markdown-it-highlight-lines/index.js';

import Prism from '../vendors/prism/mod.ts';
import { replaceLink } from '../utils/mod.ts';

/**
 * tocHTML is set in the markdownitTocDoneRight callback, and is used later
 * So tocHTML need to be a global variable
 */
let tocHTML = '';

const mdRenderer = new MarkdownIt({
  html: true,
  linkify: true,
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
  replaceLink
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
  .use(markdownitReplaceLink)
  .use(markdownitHighlightLines);

import { PagicPlugin } from '../Pagic.ts';

const md: PagicPlugin = {
  name: 'md',
  fn: async (pagic) => {
    for (const pagePath of pagic.pagePaths.filter((pagePath) => pagePath.endsWith('.md'))) {
      const pageProps = pagic.pagePropsMap[pagePath];

      let content = await Deno.readTextFile(path.resolve(pagic.config.srcDir, pagePath));
      const fmResult = fm(content);
      const frontMatter = fmResult.attributes;
      content = fmResult.body;

      /**
       * Use markdown-it-title to get the title of the page
       * https://github.com/valeriangalliat/markdown-it-title
       */
      const env: any = {};
      const contentHTML = mdRenderer.render(content, env).trim();
      const title = env.title;

      pagic.pagePropsMap[pagePath] = {
        ...pageProps,
        title,
        content: <article dangerouslySetInnerHTML={{ __html: contentHTML }} />,
        // Set to null if toc is empty
        toc:
          tocHTML === '<nav class="toc"></nav>' || tocHTML === '<nav class="toc"><ol></ol></nav>' ? null : (
            <aside dangerouslySetInnerHTML={{ __html: tocHTML }} />
          ),
        ...frontMatter
      };

      tocHTML = '';
    }
  }
};

export default md;
