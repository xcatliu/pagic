/* eslint no-console:0, global-require:0 */

const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

const getConfig = require('./util/getConfig');
const getLayout = require('./util/getLayout');

class Pagic {
  constructor() {
    this.config = getConfig();
    this.plugins = [
      require('./plugin/parseFrontMatter'),
      require('./plugin/parseMarkdown'),
      require('./plugin/injectRelativeToRoot'),
    ];
  }

  build() {
    this.clearPublicDir();
    this.buildMD();
    this.copyStaticFiles();
  }

  clearPublicDir() {
    console.log(`Clear ${this.config.public_dir}`);
    fse.emptyDirSync(this.config.public_dir);
  }

  buildMD() {
    const mdFiles = glob.sync('**/*.md', {
      cwd: this.config.src_dir,
    });

    if (mdFiles.length === 0) {
      console.log('No markdown files found');
      return;
    }

    mdFiles.forEach(filePath => {
      const resolvedFilePath = path.resolve(this.config.src_dir, filePath);
      const resolvedDestinationFilePath = path.resolve(this.config.public_dir, filePath)
        .replace(/\.md$/, '.html');

      const layout = getLayout(resolvedFilePath);

      if (!layout) {
        console.error(`CANNOT find a layout for ${resolvedFilePath}, will skip this file`);
        return;
      }

      const originalContent = fse.readFileSync(resolvedFilePath, 'utf-8');

      const context = this.plugins.reduce((prevContext, plugin) => plugin(prevContext), {
        path: filePath,
        content: originalContent,
        config: this.config,
      });

      const html = layout(context);

      fse.outputFileSync(resolvedDestinationFilePath, html);

      console.log(`Generated ${resolvedDestinationFilePath}`);
    });
  }

  copyStaticFiles() {
    const staticFiles = glob.sync('**/*', {
      ignore: [
        '**/*.md',
        '**/_*',
      ],
      nodir: true,
      cwd: this.config.src_dir,
    });

    if (staticFiles.length === 0) {
      return;
    }

    staticFiles.forEach(filePath => {
      const resolvedFilePath = path.resolve(this.config.src_dir, filePath);
      const resolvedDistPath = path.resolve(this.config.public_dir, filePath);

      fse.copySync(resolvedFilePath, resolvedDistPath);

      console.log(`Copied ${resolvedDistPath}`);
    });
  }
}

module.exports = Pagic;
