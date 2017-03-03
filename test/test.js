/* eslint-env mocha */
/* eslint no-use-before-define:0, import/no-extraneous-dependencies:0, max-len:0, func-names:0, no-console:0 */

const assert = require('assert');
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
  'find-parent-dir': {
    sync: () => '/path/to/parent/dir',
  },
  './processor/parseFrontMatter': () => ({}),
  './processor/parseMarkdown': () => ({}),
  './processor/injectRelativeToRoot': () => ({}),
};

const proxiedPagic = proxyquire('..', stub);
const Pagic = proxiedPagic.Pagic;

const DEFAULT_OPTIONS = {
  srcDir: 'src',
  distDir: 'public',
};

describe('Pagic Class', () => {
  beforeEach(function () {
    this.sinon = sinon.sandbox.create();
  });
  afterEach(function () {
    this.sinon.restore();
  });

  describe('constructor()', () => {
    it('should have default srcDir and publicDir when pass 0 arguments', () => {
      const pagic = new Pagic();
      verifySrcDirAndDistDir(pagic);
    });
    it('should have default srcDir and publicDir when pass empty object', () => {
      const pagic = new Pagic({});
      verifySrcDirAndDistDir(pagic);
    });

    it('should have custom srcDir and default publicDir when only pass srcDir', () => {
      const pagic = new Pagic({ srcDir: 'site' });
      verifySrcDirAndDistDir(pagic, { srcDir: 'site' });
    });
    it('should have default srcDir and custom publicDir when only pass publicDir', () => {
      const pagic = new Pagic({ publicDir: 'docs' });
      verifySrcDirAndDistDir(pagic, { publicDir: 'docs' });
    });
    it('should have custom srcDir and custom publicDir', () => {
      const pagic = new Pagic({ srcDir: 'site', publicDir: 'docs' });
      verifySrcDirAndDistDir(pagic, { srcDir: 'site', publicDir: 'docs' });
    });

    it('should have default srcDir when pass undefined srcDir', () => {
      const pagic = new Pagic({ srcDir: undefined });
      verifySrcDirAndDistDir(pagic);
    });
    it('should have default publicDir when pass undefined publicDir', () => {
      const pagic = new Pagic({ publicDir: undefined });
      verifySrcDirAndDistDir(pagic);
    });
    it('should have default srcDir when pass null srcDir', () => {
      const pagic = new Pagic({ srcDir: null });
      verifySrcDirAndDistDir(pagic);
    });
    it('should have default publicDir when pass null publicDir', () => {
      const pagic = new Pagic({ publicDir: null });
      verifySrcDirAndDistDir(pagic);
    });
  });

  describe('build()', () => {
    it('should call clearDistDir, buildMD and copyStaticFiles', function () {
      const pagic = new Pagic();
      this.sinon.stub(pagic, 'clearDistDir');
      this.sinon.stub(pagic, 'buildMD');
      this.sinon.stub(pagic, 'copyStaticFiles');

      pagic.build();

      sinon.assert.calledOnce(pagic.clearDistDir);
      sinon.assert.calledOnce(pagic.buildMD);
      sinon.assert.calledOnce(pagic.copyStaticFiles);
    });
  });

  describe('clearDistDir()', () => {
    it('should call emptyDirSync', function () {
      this.sinon.stub(stub['fs-extra'], 'emptyDirSync');

      const pagic = new Pagic();

      pagic.clearDistDir();

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

      const pagic = new Pagic();
      this.sinon.stub(pagic, 'getLayout', () => null);

      pagic.buildMD();

      sinon.assert.calledWith(console.error, 'CANNOT find a layout for /path/to/file, will skip this file');
    });
    it('should console.log `Generated /path/to/file`', function () {
      this.sinon.spy(console, 'log');

      const pagic = new Pagic();
      this.sinon.stub(pagic, 'getLayout', () => () => {});

      pagic.buildMD();

      sinon.assert.calledWith(console.log, 'Generated /path/to/file');
    });
    it('should console.log two times `Generated /path/to/file`', function () {
      this.sinon.spy(console, 'log');
      this.sinon.stub(stub.glob, 'sync', () => ['path1', 'path2']);

      const pagic = new Pagic();
      this.sinon.stub(pagic, 'getLayout', () => () => {});

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
      this.sinon.stub(pagic, 'getLayout', () => () => {});

      pagic.copyStaticFiles();

      sinon.assert.calledWith(console.log, 'Copied /path/to/file');
    });
    it('should console.log two times `Copied /path/to/file`', function () {
      this.sinon.spy(console, 'log');
      this.sinon.stub(stub.glob, 'sync', () => ['path1', 'path2']);

      const pagic = new Pagic();
      this.sinon.stub(pagic, 'getLayout', () => () => {});

      pagic.copyStaticFiles();

      sinon.assert.calledTwice(console.log);
      sinon.assert.alwaysCalledWith(console.log, 'Copied /path/to/file');
    });
  });

  describe('getLayou()', () => {
    it('should return null when findParentDir.sync returns null', function () {
      this.sinon.stub(stub['find-parent-dir'], 'sync', () => null);

      const pagic = new Pagic();

      assert.equal(pagic.getLayout(), null);
    });
    it('should return the required module', function () {
      /* It's hard to stub a dynamic require, so here we require 'glob' as a test */
      this.sinon.stub(stub.path, 'resolve', () => 'glob');
      this.sinon.stub(stub, 'glob', () => 'Layout result');
      const pagic = new Pagic();

      assert.equal(pagic.getLayout(), stub.glob);
    });
  });
});

function verifySrcDirAndDistDir(
  pagic,
  {
    srcDir = DEFAULT_OPTIONS.srcDir,
    distDir = DEFAULT_OPTIONS.distDir,
  } = DEFAULT_OPTIONS
) {
  assert.equal(pagic.options.srcDir, srcDir);
  assert.equal(pagic.options.distDir, distDir);
}
