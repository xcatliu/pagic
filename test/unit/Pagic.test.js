const assert = require('chai').assert;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const stub = {
  path: {
    resolve: () => '/path/to/file',
  },
  'fs-extra': {
    readFileSync: () => 'content',
    outputFileSync: () => {},
    copySync: () => {},
  },
  glob: {
    sync: () => ['path'],
  },
  './util/getLayout': () => () => 'getLayout result',
  './util/getConfig': () => ({
    src_dir: 'src',
    public_dir: 'public',
  }),
  './processor/parseFrontMatter': () => ({}),
  './processor/parseMarkdown': () => ({}),
  './processor/injectRelativeToRoot': () => ({}),
};

const Pagic = proxyquire('../..', stub);

describe('Pagic', () => {
  beforeEach(function () {
    this.sinon = sinon.sandbox.create();
  });
  afterEach(function () {
    this.sinon.restore();
  });

  describe('constructor()', () => {
    it('should have config and plugins', function () {
      const pagic = new Pagic();
      assert.property(pagic, 'config');
      assert.property(pagic, 'plugins');
    });
  });

  describe('build()', () => {
    it('should call clearPublicDir, buildMD and copyStaticFiles', function () {
      const pagic = new Pagic();
      this.sinon.stub(pagic, 'clearPublicDir');
      this.sinon.stub(pagic, 'buildMD');
      this.sinon.stub(pagic, 'copyStaticFiles');

      pagic.build();

      sinon.assert.calledOnce(pagic.clearPublicDir);
      sinon.assert.calledOnce(pagic.buildMD);
      sinon.assert.calledOnce(pagic.copyStaticFiles);
    });
  });

  describe('clearPublicDir()', () => {
    it('should call emptyDirSync', function () {
      this.sinon.spy(console, 'log');
      this.sinon.stub(stub['fs-extra'], 'emptyDirSync');

      const pagic = new Pagic();

      pagic.clearPublicDir();

      sinon.assert.calledWith(console.log, 'Clear public');
      sinon.assert.calledOnce(stub['fs-extra'].emptyDirSync);
    });
  });

  describe('buildMD()', () => {
    it('should console.log `No markdown files found` when glob.sync returns empty array', function () {
      this.sinon.spy(console, 'log');
      this.sinon.stub(stub.glob, 'sync', () => []);

      const pagic = new Pagic();

      pagic.buildMD();

      sinon.assert.calledWith(console.log, 'No markdown files found');
    });
    it('should console.error `CANNOT find a layout for /path/to/file, will skip this file`', function () {
      this.sinon.spy(console, 'error');
      // We need to craete a new proxyquire to override the stub
      const ProxiedPagic = proxyquire('../..', Object.assign({}, stub, {
        './util/getLayout': () => null,
      }));

      const pagic = new ProxiedPagic();

      pagic.buildMD();

      sinon.assert.calledWith(console.error, 'CANNOT find a layout for /path/to/file, will skip this file');
    });
    it('should console.log `Generated /path/to/file`', function () {
      this.sinon.spy(console, 'log');

      const pagic = new Pagic();

      pagic.buildMD();

      sinon.assert.calledWith(console.log, 'Generated /path/to/file');
    });
    it('should console.log two times `Generated /path/to/file`', function () {
      this.sinon.spy(console, 'log');
      this.sinon.stub(stub.glob, 'sync', () => ['path1', 'path2']);

      const pagic = new Pagic();

      pagic.buildMD();

      sinon.assert.calledTwice(console.log);
      sinon.assert.alwaysCalledWith(console.log, 'Generated /path/to/file');
    });
  });

  describe('copyStaticFiles()', () => {
    it('should not throw error when glob.sync returns empty array', function () {
      this.sinon.spy(console, 'log');
      this.sinon.stub(stub.glob, 'sync', () => []);

      const pagic = new Pagic();

      pagic.copyStaticFiles();
    });
    it('should console.log `Copied /path/to/file`', function () {
      this.sinon.spy(console, 'log');

      const pagic = new Pagic();

      pagic.copyStaticFiles();

      sinon.assert.calledWith(console.log, 'Copied /path/to/file');
    });
    it('should console.log two times `Copied /path/to/file`', function () {
      this.sinon.spy(console, 'log');
      this.sinon.stub(stub.glob, 'sync', () => ['path1', 'path2']);

      const pagic = new Pagic();

      pagic.copyStaticFiles();

      sinon.assert.calledTwice(console.log);
      sinon.assert.alwaysCalledWith(console.log, 'Copied /path/to/file');
    });
  });
});
