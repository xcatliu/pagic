import { path, React, frontMatter, htmlToText, MarkdownIt, reactHtmlParser } from '../../deps.ts';
import markdownItTitle from '../vendors/markdown-it-title/index.js';
import markdownItAnchor from '../vendors/markdown-it-anchor/index.js';
import markdownitTocDoneRight from '../vendors/markdown-it-toc-done-right/index.js';
import markdownitReplaceLink from '../vendors/markdown-it-replace-link/index.js';
import markdownitHighlightLines from '../vendors/markdown-it-highlight-lines/index.js';
import markdownItKatex from '../vendors/markdown-it-katex/index.js';

import Prism from '../vendors/prism/mod.ts';
import { replaceLink, getGitLog, substring } from '../utils/mod.ts';

import type { PagicPlugin } from '../Pagic.ts';

/** Same with GitHub */
const slugify = (hash: string) =>
  encodeURIComponent(
    hash
      .trim()
      .toLowerCase()
      // whitespace
      .replace(/ /g, '-')
      // Special symbol
      .replace(/[　`~!@#$%^&*()=+\[{\]}\\|;:'",<.>/?·～！¥…（）—【「】」、；：‘“’”，《。》？]/g, '')
      // 全角符号
      .replace(/[\uff00-\uffff]/g, ''),
  );

const md: PagicPlugin = {
  name: 'md',
  fn: async (pagic) => {
    /** tocHTML is set in the markdownitTocDoneRight callback, and is used later */
    let tocHTML = '';
    const tocEnabled = pagic.config.md?.tocEnabled ?? true;

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
          lang,
        )}</code></pre>`;
      },
      replaceLink,
    })
      .use(markdownItTitle)
      .use(markdownItAnchor, {
        level: pagic.config.md?.anchorLevel ?? [2, 3, 4, 5, 6],
        slugify,
        permalink: true,
        permalinkSpace: false,
        permalinkClass: 'anchor',
        permalinkSymbol: '§',
      })
      .use(tocEnabled ? markdownitTocDoneRight : () => {}, {
        containerClass: 'toc',
        level: pagic.config.md?.tocLevel ?? [2, 3],
        slugify,
        callback: (html: string) => {
          tocHTML = html;
        },
      })
      .use(markdownitReplaceLink)
      .use(markdownitHighlightLines)
      .use(markdownItKatex);

    // If one of the content has KaTeX, then set contentHasKaTeX to true
    let contentHasKaTeX = false;

    for (const pagePath of pagic.pagePaths.filter((pagePath) => pagePath.endsWith('.md'))) {
      const pageProps = pagic.pagePropsMap[pagePath];

      let content = await Deno.readTextFile(path.resolve(pagic.config.srcDir, pagePath));
      const frontMatterResult = frontMatter(content);
      const frontMatterProps = frontMatterResult.attributes;
      content = frontMatterResult.body;
      const cover = content.match(/!\[.*?\]\((.*?)\)/)?.[1];

      /**
       * Use markdown-it-title to get the title of the page
       * https://github.com/valeriangalliat/markdown-it-title
       */
      const env: any = {
        katexMacros: Object.assign({}, pagic.config.md?.katexMacros)
      };
      const contentHTML = mdRenderer
        .render(content, env)
        .replace(/<table[\s\S]*?<\/table>/g, '<div class="table_wrapper">$&</div>')
        .trim();
      const contentTitleHTML = contentHTML.match(/^<h1[ >].*?<\/h1>/)?.[0];
      const contentBodyHTML = contentHTML.replace(/^<h1[ >].*?<\/h1>/, '').trim();
      const title = env.title;
      const excerpt = substring(
        htmlToText(contentBodyHTML.replace(/§/g, ''), {
          wordwrap: 420,
          tags: {
            a: { options: { ignoreHref: true } },
            img: { format: 'skip' },
            blockquote: { format: 'skip' },
            del: { format: 'skip' },
            ul: { options: { itemPrefix: ' - ' } },
            h1: { options: { uppercase: false } },
            h2: { options: { uppercase: false } },
            h3: { options: { uppercase: false } },
            h4: { options: { uppercase: false } },
            h5: { options: { uppercase: false } },
            h6: { options: { uppercase: false } },
            table: { options: { uppercaseHeaderCells: false } },
          },
        }).replace(/\s+/g, ' '),
        210,
        '...',
      );
      const { author, contributors, date, updated } = await getGitLog(`${pagic.config.srcDir}/${pagePath}`);
      if (!contentHasKaTeX && /class="katex"/.test(contentHTML)) {
        contentHasKaTeX = true;
      }

      pagic.pagePropsMap[pagePath] = {
        ...pageProps,
        title,
        content: <article dangerouslySetInnerHTML={{ __html: contentHTML }} />,
        contentTitle: reactHtmlParser(contentTitleHTML)[0],
        contentBody: <article dangerouslySetInnerHTML={{ __html: contentBodyHTML }} />,
        // Set to null if toc is empty
        toc:
          tocHTML === '' || tocHTML === '<nav class="toc"></nav>' || tocHTML === '<nav class="toc"><ol></ol></nav>'
            ? null
            : reactHtmlParser(tocHTML)[0],
        author,
        contributors,
        date,
        updated,
        excerpt,
        cover,
        ...frontMatterProps,
      };

      tocHTML = '';
    }

    if (contentHasKaTeX) {
      for (const pagePath of pagic.pagePaths.filter((pagePath) => pagePath.endsWith('.md'))) {
        const pageProps = pagic.pagePropsMap[pagePath];
        pagic.pagePropsMap[pagePath] = {
          ...pageProps,
          head: (
            <>
              {pageProps.head}
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
                integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
                crossOrigin="anonymous"
              />
            </>
          ),
        };
      }
    }
  },
};

export default md;
