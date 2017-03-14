const path = require('path');

const fileType = {
  isLayout: filePath => path.basename(filePath) === '_layout.js',
  isMarkdown: filePath => path.extname(filePath) === '.md',
  isStaticFile: filePath => {
    if (fileType.isMarkdown(filePath)) {
      return false;
    } else if (path.basename(filePath).startsWith('_')) {
      return false;
    }
    return true;
  },
};

module.exports = fileType;
