/* eslint no-console:0, global-require:0 */

const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');
const chokidar = require('chokidar');

const getConfig = require('./util/getConfig');
const getLayout = require('./util/getLayout');
const fileType = require('./util/fileType');

class Pagic {
  constructor() {
    this.config = getConfig();
    this.plugins = [
      require('./plugin/parseFrontMatter'),
      require('./plugin/parseMarkdown'),
      require('./plugin/injectRelativeToRoot'),
    ];

    this.enabledWatch = false;
    this.watcher = null;
  }

  build() {
    this.clean();
    this.buildFilesInDir(this.config.src_dir);

    if (this.enabledWatch) {
      const watcher = chokidar.watch('**/*', {
        cwd: this.config.src_dir,
      });

      watcher.on('ready', () => {
        watcher
          .on('add', this.handleFileChange.bind(this))
          .on('change', this.handleFileChange.bind(this))
          .on('unlink', this.handleFileRemove.bind(this))
          .on('unlinkDir', this.handleDirRemove.bind(this))
          .on('error', error => {
            console.log(`Watcher error: ${error}`);
          });
      });

      this.watcher = watcher;
      console.log(`Watching ${this.config.src_dir}`);
    }
    return this;
  }

  watch() {
    this.enabledWatch = true;
    return this;
  }

  unwatch() {
    this.enabledWatch = false;
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
      console.log(`Unwatch ${this.config.src_dir}`);
    }
    return this;
  }

  clean() {
    fse.emptyDirSync(this.config.public_dir);
    console.log(`Cleaned ${this.config.public_dir}`);
    return this;
  }

  handleFileChange(filePath) {
    if (fileType.isLayout(filePath)) {
      this.buildFilesInDir(path.dirname(path.join(this.config.src_dir, filePath)));
    } else if (fileType.isMarkdown(filePath)) {
      this.buildMarkdownFile(filePath);
    } else if (fileType.isStaticFile(filePath)) {
      this.buildStaticFile(filePath);
    }
  }

  handleFileRemove(filePath) {
    if (fileType.isLayout(filePath)) {
      this.buildFilesInDir(path.dirname(path.join(this.config.src_dir, filePath)));
    } else if (fileType.isMarkdown(filePath)) {
      this.removeMarkdownFile(filePath);
    } else if (fileType.isStaticFile(filePath)) {
      this.removeStaticFile(filePath);
    }
  }

  handleDirRemove(dirPath) {
    this.removeStaticFile(dirPath);
  }

  buildFilesInDir(dirPath) {
    const relativeDirPath = path.relative(this.config.src_dir, dirPath) || '.';

    const files = glob.sync(`${relativeDirPath}/**/*`, {
      nodir: true,
      cwd: this.config.src_dir,
    });

    files.forEach(filePath => {
      if (fileType.isMarkdown(filePath)) {
        this.buildMarkdownFile(filePath);
      } else if (fileType.isStaticFile(filePath)) {
        this.buildStaticFile(filePath);
      }
    });
  }

  buildMarkdownFile(filePath) {
    const resolvedFilePath = path.resolve(this.config.src_dir, filePath);
    const resolvedDestinationFilePath = path.resolve(this.config.public_dir, filePath)
      .replace(/\.md$/, '.html');

    const layout = getLayout(resolvedFilePath);

    if (typeof layout !== 'function') {
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
  }

  buildStaticFile(filePath) {
    const resolvedFilePath = path.resolve(this.config.src_dir, filePath);
    const resolvedDestinationFilePath = path.resolve(this.config.public_dir, filePath);

    fse.copySync(resolvedFilePath, resolvedDestinationFilePath);
    console.log(`Copied ${resolvedDestinationFilePath}`);
  }

  removeMarkdownFile(filePath) {
    const resolvedDestinationFilePath = path.resolve(this.config.public_dir, filePath)
      .replace(/\.md$/, '.html');

    fse.removeSync(resolvedDestinationFilePath);
    console.log(`Removed ${resolvedDestinationFilePath}`);
  }

  removeStaticFile(filePath) {
    const resolvedDestinationFilePath = path.resolve(this.config.public_dir, filePath);

    fse.removeSync(resolvedDestinationFilePath);
    console.log(`Removed ${resolvedDestinationFilePath}`);
  }
}

module.exports = Pagic;
