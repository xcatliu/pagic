/* eslint max-len:0 */

const Prism = require('node-prismjs');

const md = require('markdown-it')({
  html: true,
  highlight: (str, lang) => {
    const prismLang = Prism.languages[lang] || Prism.languages.autoit;
    const classNameLang = lang || 'autoit';
    return `<pre class="language-${classNameLang}"><code class="language-${classNameLang}">${Prism.highlight(str, prismLang)}</code></pre>`;
  },
})
.use(require('markdown-it-anchor'))
.use(require('markdown-it-title'));

module.exports = function parseMarkdown(context) {
  /**
   * Use markdown-it-title to get the title of the page
   * https://github.com/valeriangalliat/markdown-it-title
   */
  const env = {};
  const htmlContent = md.render(context.content, env);

  return Object.assign({}, context, {
    title: env.title,
    content: htmlContent,
  });
};
