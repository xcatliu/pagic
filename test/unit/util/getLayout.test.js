const assert = require('chai').assert;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const stub = {
  path: {
    resolve: () => 'path',
  },
  'find-parent-dir': {
    sync: () => 'path/to/layout/dir',
  },
};

const getLayout = proxyquire('../../../src/util/getLayout', stub);

describe('getLayout', () => {
  beforeEach(function () {
    this.sinon = sinon.sandbox.create();
  });
  afterEach(function () {
    this.sinon.restore();
  });

  it('should return null if findParentDir returns null', function () {
    this.sinon.stub(stub['find-parent-dir'], 'sync', () => null);
    assert.isNull(getLayout());
  });
  it('should return layout result', function () {
    /* It's hard to stub a dynamic require, so here we require 'path' as a test */
    assert.equal(getLayout(), stub.path);
  });
});
