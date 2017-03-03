const path = require('path');

module.exports = function injectRelativeToRoot(context) {
  const relativeToRoot = path.relative(
    path.resolve(context.options.srcDir, context.path, '..'),
    path.resolve(context.options.srcDir)
  ).split(path.sep).join('/') || '.';

  return Object.assign({}, context, {
    relativeToRoot,
  });
};
