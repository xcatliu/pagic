const Prism = require('prismjs');

const md = require('markdown-it')({
  html: true,
  highlight: (str, lang) => {
    return `<pre class="language-${lang}"><code class="language-${lang}">${Prism.highlight(str, Prism.languages[lang])}</code></pre>`;
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
