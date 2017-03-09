const fm = require('front-matter');

module.exports = function parseFrontMatter(context) {
  const fmResult = fm(context.content);

  return Object.assign({}, context, {
    frontMatter: fmResult.attributes,
    content: fmResult.body,
  });
};
