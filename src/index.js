/* eslint no-console:0 */

const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');
const findParentDir = require('find-parent-dir');

const processors = [
  require('./processor/parseFrontMatter'),
  require('./processor/parseMarkdown'),
  require('./processor/injectRelativeToRoot'),
];

const LAYOUT_FILENAME = '_layout.js';
const DEFAULT_OPTIONS = {
  srcDir: 'src',
  distDir: 'public',
};

class Pagic {
  constructor(options = {}) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    if (typeof this.options.srcDir === 'undefined' || this.options.srcDir === null) {
      this.options.srcDir = DEFAULT_OPTIONS.srcDir;
    }
    if (typeof this.options.distDir === 'undefined' || this.options.distDir === null) {
      this.options.distDir = DEFAULT_OPTIONS.distDir;
    }
  }

  build() {
    this.clearDistDir();
    this.buildMD();
    this.copyStaticFiles();
  }

  clearDistDir() {
    fse.emptyDirSync(this.options.distDir);
  }

  buildMD() {
    const mdFiles = glob.sync('**/*.md', {
      cwd: this.options.srcDir,
    });

    if (mdFiles.length === 0) {
      console.log('No markdown files found');
      return;
    }

    mdFiles.forEach(filePath => {
      const resolvedFilePath = path.resolve(this.options.srcDir, filePath);
      const resolvedDistPath = path.resolve(this.options.distDir, filePath)
        .replace(/\.md$/, '.html');

      const layout = this.getLayout(resolvedFilePath);

      if (!layout) {
        console.error(`CANNOT find a layout for ${resolvedFilePath}, will skip this file`);
        return;
      }

      const originalContent = fse.readFileSync(resolvedFilePath, 'utf-8');

      const context = processors.reduce((prevContext, processor) => processor(prevContext), {
        path: filePath,
        content: originalContent,
        options: this.options,
      });

      const html = layout(context);

      fse.outputFileSync(resolvedDistPath, html);

      console.log(`Generated ${resolvedDistPath}`);
    });
  }

  copyStaticFiles() {
    const staticFiles = glob.sync('**/*', {
      ignore: [
        '**/*.md',
        '**/_*',
      ],
      nodir: true,
      cwd: this.options.srcDir,
    });

    if (staticFiles.length === 0) {
      return;
    }

    staticFiles.forEach(filePath => {
      const resolvedFilePath = path.resolve(this.options.srcDir, filePath);
      const resolvedDistPath = path.resolve(this.options.distDir, filePath);

      fse.copySync(resolvedFilePath, resolvedDistPath);

      console.log(`Copied ${resolvedDistPath}`);
    });
  }

  getLayout(currentPath) {
    const layoutDir = findParentDir.sync(currentPath, LAYOUT_FILENAME);

    if (!layoutDir) {
      return null;
    }

    /* eslint global-require:0 */
    const layout = require(path.resolve(layoutDir, LAYOUT_FILENAME));

    return layout;
  }
}

module.exports = (...args) => {
  const pagic = new Pagic(...args);
  return () => {
    pagic.build();
  };
};

module.exports.Pagic = Pagic;
