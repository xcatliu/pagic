const assert = require('chai').assert;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const DEFAULT_CONFIG = {
  defaultKey1: 'defaultValue1',
  defaultKey2: 'defaultValue2',
};
const USER_CONFIG = {
  defaultKey1: 'userValue1',
  userKey1: 'userValue1',
  userKey2: 'userValue2',
};

const stub = {
  path: {
    resolve: (arg1, arg2) => {
      if (arg2 === '../defaultConfig.yml') {
        return 'path/to/default/config';
      }
      if (arg2 === '_config.yml') {
        return 'path/to/config';
      }
      return 'path/to/file';
    },
  },
  fs: {
    existsSync: () => true,
    readFileSync: arg1 => arg1,
  },
  'js-yaml': {
    safeLoad: arg1 => {
      if (arg1 === 'path/to/default/config') {
        return DEFAULT_CONFIG;
      }
      if (arg1 === 'path/to/config') {
        return USER_CONFIG;
      }
      return {};
    },
  },
};

const getConfig = proxyquire('../../../src/util/getConfig', stub);

describe('getConfig', () => {
  beforeEach(function () {
    this.sinon = sinon.sandbox.create();
  });
  afterEach(function () {
    this.sinon.restore();
  });

  it('should return defaultConfig if userConfigPath does not exist', function () {
    this.sinon.stub(stub.fs, 'existsSync', () => false);
    assert.deepEqual(getConfig(), DEFAULT_CONFIG);
  });
  it('should return mergedConfig if userConfigPath dose exist', function () {
    assert.deepEqual(getConfig(), Object.assign({}, DEFAULT_CONFIG, USER_CONFIG));
  });
});
