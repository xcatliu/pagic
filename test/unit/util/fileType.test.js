const assert = require('chai').assert;
const fileType = require('../../../src/util/fileType');

describe('fileType', () => {
  describe('isLayout()', () => {
    it('should return true if filePath is path/to/_layout.js', () => {
      assert.isTrue(fileType.isLayout('path/to/_layout.js'));
    });
    it('should return false if filePath is path/to/layout.js', () => {
      assert.isFalse(fileType.isLayout('path/to/layout.js'));
    });
  });
  describe('isMarkdown()', () => {
    it('should return true if filePath is path/to/file.md', () => {
      assert.isTrue(fileType.isMarkdown('path/to/file.md'));
    });
    it('should return false if filePath is path/to/file.js', () => {
      assert.isFalse(fileType.isMarkdown('path/to/file.js'));
    });
  });
  describe('isStaticFile()', () => {
    it('should return false if filePath is path/to/file.md', () => {
      assert.isFalse(fileType.isStaticFile('path/to/file.md'));
    });
    it('should return false if filePath is path/to/_file.js', () => {
      assert.isFalse(fileType.isStaticFile('path/to/_file.js'));
    });
    it('should return true if filePath is path/to/file.js', () => {
      assert.isTrue(fileType.isStaticFile('path/to/file.js'));
    });
  });
});
