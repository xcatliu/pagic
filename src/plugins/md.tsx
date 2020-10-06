import { path, React, frontMatter, MarkdownIt } from '../../deps.ts';
import markdownItTitle from '../vendors/markdown-it-title/index.js';
import markdownItAnchor from '../vendors/markdown-it-anchor/index.js';
import markdownitTocDoneRight from '../vendors/markdown-it-toc-done-right/index.js';
import markdownitReplaceLink from '../vendors/markdown-it-replace-link/index.js';
import markdownitHighlightLines from '../vendors/markdown-it-highlight-lines/index.js';

import Prism from '../vendors/prism/mod.ts';
import { replaceLink } from '../utils/mod.ts';

import type { PagicPlugin } from '../Pagic.ts';

/** Same with GitHub */
const slugify = (s: string) =>
  encodeURIComponent(
    s
      .trim()
      .toLowerCase()
      // whitespace
      .replace(/ /g, '-')
      // Special symbol
      .replace(/[　`~!@#$%^&*()=+\[{\]}\\|;:'",<.>/?·～！¥…（）—【「】」、；：‘“’”，《。》？]/g, '')
      // 全角符号
      .replace(/[\uff00-\uffff]/g, '')
  );

const md: PagicPlugin = {
  name: 'md',
  fn: async (pagic) => {
    /** tocHTML is set in the markdownitTocDoneRight callback, and is used later */
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
        level: pagic.config.md?.anchorLevel ?? [2, 3, 4, 5, 6],
        slugify,
        permalink: true,
        permalinkSpace: false,
        permalinkClass: 'anchor',
        permalinkSymbol: '§'
      })
      .use(markdownitTocDoneRight, {
        containerClass: 'toc',
        level: pagic.config.md?.tocLevel ?? [2, 3],
        slugify,
        callback: (html: string) => {
          tocHTML = html;
        }
      })
      .use(markdownitReplaceLink)
      .use(markdownitHighlightLines);

    for (const pagePath of pagic.pagePaths.filter((pagePath) => pagePath.endsWith('.md'))) {
      const pageProps = pagic.pagePropsMap[pagePath];

      let content = await Deno.readTextFile(path.resolve(pagic.config.srcDir, pagePath));
      const frontMatterResult = frontMatter(content);
      const frontMatterProps = frontMatterResult.attributes;
      content = frontMatterResult.body;

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
        ...frontMatterProps
      };

      tocHTML = '';
    }
  }
};

export default md;
