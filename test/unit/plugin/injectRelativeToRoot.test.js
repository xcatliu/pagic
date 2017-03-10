const assert = require('chai').assert;
const injectRelativeToRoot = require('../../../src/plugin/injectRelativeToRoot');

describe('injectRelativeToRoot', () => {
  it('should keep other properties on context', () => {
    assert.equal(injectRelativeToRoot({
      config: {
        src_dir: 'src',
        public_dir: 'public',
      },
      path: 'path/to/file',
      otherKey: 'otherValue',
    }).otherKey, 'otherValue');
  });
  it('should return `../..` if path is `path/to/file`', () => {
    assert.equal(injectRelativeToRoot({
      config: {
        src_dir: 'src',
        public_dir: 'public',
      },
      path: 'path/to/file',
    }).relativeToRoot, '../..');
  });
  it('should return `..` if path is `path/to`', () => {
    assert.equal(injectRelativeToRoot({
      config: {
        src_dir: 'src',
        public_dir: 'public',
      },
      path: 'path/to',
    }).relativeToRoot, '..');
  });
  // it('should return `../..` if path is `path\\to\\file`', () => {
  //   assert.equal(injectRelativeToRoot({
  //     config: {
  //       src_dir: 'src',
  //       public_dir: 'public',
  //     },
  //     path: 'path\\to\\file',
  //   }).relativeToRoot, '../..');
  // });
  it('should return `.` if path is `path`', () => {
    assert.equal(injectRelativeToRoot({
      config: {
        src_dir: 'src',
        public_dir: 'public',
      },
      path: 'path',
    }).relativeToRoot, '.');
  });
});
