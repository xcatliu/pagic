/* eslint-env mocha */

const assert = require('assert');
const injectRelativeToRoot = require('../../../src/processor/injectRelativeToRoot');

describe('injectRelativeToRoot', () => {
  it('should keep other properties on context', () => {
    assert.equal(injectRelativeToRoot({
      options: {
        srcDir: 'src/dir',
      },
      path: 'path/to/file',
      otherKey: 'otherValue',
    }).otherKey, 'otherValue');
  });
  it('should return `../..` if path is `path/to/file`', () => {
    assert.equal(injectRelativeToRoot({
      options: {
        srcDir: 'src/dir',
      },
      path: 'path/to/file',
    }).relativeToRoot, '../..');
  });
  it('should return `..` if path is `path/to`', () => {
    assert.equal(injectRelativeToRoot({
      options: {
        srcDir: 'src/dir',
      },
      path: 'path/to',
    }).relativeToRoot, '..');
  });
  it('should return `../..` if path is `path\\to\\file`', () => {
    assert.equal(injectRelativeToRoot({
      options: {
        srcDir: 'src\\dir',
      },
      path: 'path\\to\\file',
    }).relativeToRoot, '../..');
  });
  it('should return `.` if path is `path`', () => {
    assert.equal(injectRelativeToRoot({
      options: {
        srcDir: 'src/dir',
      },
      path: 'path',
    }).relativeToRoot, '.');
  });
});
