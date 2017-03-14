const assert = require('chai').assert;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const stub = {
  path: {
    dirname: () => '/path/to',
    join: () => 'path/to/file',
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
  chokidar: {
    watch: () => ({
      on: () => {},
    }),
  },
  './util/fileType': {
    isLayout: () => false,
    isMarkdown: () => true,
    isStaticFile: () => false,
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
    it('should have config enabledWatch plugins and watcher', function () {
      const pagic = new Pagic();

      assert.property(pagic, 'config');
      assert.property(pagic, 'plugins');
      assert.property(pagic, 'enabledWatch');
      assert.property(pagic, 'watcher');
    });
  });

  describe('build()', () => {
    it('should call clean, buildFilesInDir, not call chokidar.watch and return this', function () {
      const pagic = new Pagic();

      this.sinon.stub(pagic, 'clean');
      this.sinon.stub(pagic, 'buildFilesInDir');
      this.sinon.spy(stub.chokidar, 'watch');

      const returnedResult = pagic.build();

      sinon.assert.calledOnce(pagic.clean);
      sinon.assert.calledOnce(pagic.buildFilesInDir);
      sinon.assert.notCalled(stub.chokidar.watch);
      assert.equal(returnedResult, pagic);
    });
    it('should call clean, buildFilesInDir, chokidar.watch, console.log and return this', function () {
      const pagic = new Pagic();

      this.sinon.stub(pagic, 'clean');
      this.sinon.stub(pagic, 'buildFilesInDir');
      this.sinon.stub(pagic, 'enabledWatch', true);
      this.sinon.spy(stub.chokidar, 'watch');
      this.sinon.spy(console, 'log');

      const returnedResult = pagic.build();

      sinon.assert.calledOnce(pagic.clean);
      sinon.assert.calledOnce(pagic.buildFilesInDir);
      sinon.assert.calledOnce(stub.chokidar.watch);
      sinon.assert.calledWith(console.log, 'Watching src');
      assert.equal(returnedResult, pagic);
    });
  });

  describe('watch()', () => {
    it('should has true enabledWatch and return this', function () {
      const pagic = new Pagic();

      const returnedResult = pagic.watch();

      assert.isTrue(pagic.enabledWatch);
      assert.equal(returnedResult, pagic);
    });
  });

  describe('unwatch()', () => {
    it('should has false enabledWatch and return this', function () {
      const pagic = new Pagic();

      this.sinon.stub(pagic, 'watcher', null);

      const returnedResult = pagic.unwatch();

      assert.isFalse(pagic.enabledWatch);
      assert.equal(returnedResult, pagic);
    });
    it('should has false enabledWatch, call console.log and return this', function () {
      const pagic = new Pagic();

      this.sinon.stub(pagic, 'watcher', {
        close: () => {},
      });
      this.sinon.spy(console, 'log');

      const returnedResult = pagic.unwatch();

      assert.isFalse(pagic.enabledWatch);
      sinon.assert.calledWith(console.log, 'Unwatch src');
      assert.equal(returnedResult, pagic);
    });
  });

  describe('clean()', () => {
    it('should call emptyDirSync and return this', function () {
      const pagic = new Pagic();

      this.sinon.spy(console, 'log');
      this.sinon.stub(stub['fs-extra'], 'emptyDirSync');

      const returnedResult = pagic.clean();

      sinon.assert.calledOnce(stub['fs-extra'].emptyDirSync);
      sinon.assert.calledWith(console.log, 'Cleaned public');
      assert.equal(returnedResult, pagic);
    });
  });

  describe('handleFileChange()', () => {
    it('should call buildFilesInDir', function () {
      const pagic = new Pagic();

      this.sinon.stub(stub['./util/fileType'], 'isLayout', () => true);
      this.sinon.stub(pagic, 'buildFilesInDir');

      pagic.handleFileChange('path');

      sinon.assert.calledOnce(pagic.buildFilesInDir);
    });
    it('should call buildMarkdownFile', function () {
      const pagic = new Pagic();

      this.sinon.stub(stub['./util/fileType'], 'isLayout', () => false);
      this.sinon.stub(stub['./util/fileType'], 'isMarkdown', () => true);
      this.sinon.stub(pagic, 'buildMarkdownFile');

      pagic.handleFileChange('path');

      sinon.assert.calledOnce(pagic.buildMarkdownFile);
    });
    it('should call buildStaticFile', function () {
      const pagic = new Pagic();

      this.sinon.stub(stub['./util/fileType'], 'isLayout', () => false);
      this.sinon.stub(stub['./util/fileType'], 'isMarkdown', () => false);
      this.sinon.stub(stub['./util/fileType'], 'isStaticFile', () => true);
      this.sinon.stub(pagic, 'buildStaticFile');

      pagic.handleFileChange('path');

      sinon.assert.calledOnce(pagic.buildStaticFile);
    });
  });

  describe('handleFileRemove()', () => {
    it('should call buildFilesInDir', function () {
      const pagic = new Pagic();

      this.sinon.stub(stub['./util/fileType'], 'isLayout', () => true);
      this.sinon.stub(pagic, 'buildFilesInDir');

      pagic.handleFileRemove('path');

      sinon.assert.calledOnce(pagic.buildFilesInDir);
    });
    it('should call removeMarkdownFile', function () {
      const pagic = new Pagic();

      this.sinon.stub(stub['./util/fileType'], 'isLayout', () => false);
      this.sinon.stub(stub['./util/fileType'], 'isMarkdown', () => true);
      this.sinon.stub(pagic, 'removeMarkdownFile');

      pagic.handleFileRemove('path');

      sinon.assert.calledOnce(pagic.removeMarkdownFile);
    });
    it('should call removeStaticFile', function () {
      const pagic = new Pagic();

      this.sinon.stub(stub['./util/fileType'], 'isLayout', () => false);
      this.sinon.stub(stub['./util/fileType'], 'isMarkdown', () => false);
      this.sinon.stub(stub['./util/fileType'], 'isStaticFile', () => true);
      this.sinon.stub(pagic, 'removeStaticFile');

      pagic.handleFileRemove('path');

      sinon.assert.calledOnce(pagic.removeStaticFile);
    });
  });

  describe('handleDirRemove()', () => {
    it('should call removeStaticFile', function () {
      const pagic = new Pagic();

      this.sinon.stub(pagic, 'removeStaticFile');

      pagic.handleDirRemove('path');

      sinon.assert.calledOnce(pagic.removeStaticFile);
    });
  });

  describe('buildFilesInDir()', () => {
    it('should call buildMarkdownFile', function () {
      const pagic = new Pagic();

      this.sinon.stub(stub['./util/fileType'], 'isMarkdown', () => true);
      this.sinon.stub(pagic, 'buildMarkdownFile');

      pagic.buildFilesInDir('path');

      sinon.assert.calledOnce(pagic.buildMarkdownFile);
    });
    it('should call buildStaticFile', function () {
      const pagic = new Pagic();

      this.sinon.stub(stub['./util/fileType'], 'isMarkdown', () => false);
      this.sinon.stub(stub['./util/fileType'], 'isStaticFile', () => true);
      this.sinon.stub(pagic, 'buildStaticFile');

      pagic.buildFilesInDir('path');

      sinon.assert.calledOnce(pagic.buildStaticFile);
    });
  });

  describe('buildMarkdownFile()', () => {
    it('should call console.error', function () {
      // We need to craete a new proxyquire to override the stub
      const ProxiedPagic = proxyquire('../..', Object.assign({}, stub, {
        './util/getLayout': () => null,
      }));
      const pagic = new ProxiedPagic();

      this.sinon.spy(console, 'error');

      pagic.buildMarkdownFile('path');

      sinon.assert.calledWith(console.error, 'CANNOT find a layout for /path/to/file, will skip this file');
    });
    it('should call console.log', function () {
      this.sinon.spy(console, 'log');

      const pagic = new Pagic();

      pagic.buildMarkdownFile('path');

      sinon.assert.calledWith(console.log, 'Generated /path/to/file');
    });
  });

  describe('buildStaticFile()', () => {
    it('should call console.log', function () {
      this.sinon.spy(console, 'log');

      const pagic = new Pagic();

      pagic.buildStaticFile();

      sinon.assert.calledWith(console.log, 'Copied /path/to/file');
    });
  });

  describe('removeMarkdownFile()', () => {
    it('should call console.log', function () {
      this.sinon.spy(console, 'log');

      const pagic = new Pagic();

      pagic.removeMarkdownFile();

      sinon.assert.calledWith(console.log, 'Removed /path/to/file');
    });
  });

  describe('removeStaticFile()', () => {
    it('should call console.log', function () {
      this.sinon.spy(console, 'log');

      const pagic = new Pagic();

      pagic.removeStaticFile();

      sinon.assert.calledWith(console.log, 'Removed /path/to/file');
    });
  });
});
