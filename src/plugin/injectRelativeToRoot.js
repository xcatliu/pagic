const path = require('path');

module.exports = function injectRelativeToRoot(context) {
  const relativeToRoot = path.relative(
    path.resolve(context.config.src_dir, context.path, '..'),
    path.resolve(context.config.src_dir)
  ).split(path.sep).join('/') || '.';

  return Object.assign({}, context, {
    relativeToRoot,
  });
};
