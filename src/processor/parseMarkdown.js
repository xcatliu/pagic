const md = require('markdown-it')({
  html: true,
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
