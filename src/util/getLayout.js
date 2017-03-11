/* eslint global-require:0 */

const path = require('path');
const findParentDir = require('find-parent-dir');

module.exports = function getLayout(currentPath) {
  const layoutDir = findParentDir.sync(currentPath, '_layout.js');

  if (!layoutDir) {
    return null;
  }

  const requirePath = path.resolve(layoutDir, '_layout.js');
  const layout = require(requirePath);

  delete require.cache[require.resolve(requirePath)];

  return layout;
};
