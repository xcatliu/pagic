const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const glob = require('glob');
const fm = require('front-matter');
const findParentDir = require('find-parent-dir');

const md = require('markdown-it')({
  html: true,
})
.use(require('markdown-it-anchor'))
.use(require('markdown-it-title'));

const LAYOUT_FILENAME = '_layout.js';

module.exports = ({
  srcDir = 'src',
  distDir = 'public',
  watch = false,
} = {}) => {
  function build() {
    /* eslint no-use-before-define:0 */
    cleanDistDir(distDir);
    buildMD(srcDir, distDir);
    copyOtherFiles(srcDir, distDir);
  }

  return () => {
    build();
    if (watch) {
      fs.watch(srcDir, build);
    }
  };
};

function cleanDistDir(distDir) {
  fse.emptyDirSync(distDir);
}

function buildMD(srcDir, distDir) {
  const mdFiles = glob.sync('**/*.md', {
    cwd: srcDir,
  });

  mdFiles.forEach(filePath => {
    const fileResolvedPath = path.resolve(srcDir, filePath);
    const layoutDir = findParentDir.sync(fileResolvedPath, LAYOUT_FILENAME);
    /* eslint global-require:0 */
    const layout = require(path.resolve(layoutDir, LAYOUT_FILENAME));

    const originalContent = fs.readFileSync(fileResolvedPath, 'utf-8');
    const fmResult = fm(originalContent);
    const frontMatter = fmResult.attributes;

    const env = {};
    const content = md.render(fmResult.body, env);

    const relativeToRoot = path.relative(
      path.resolve(fileResolvedPath, '..'),
      path.resolve(srcDir)
    ) || '.';

    const html = layout({
      frontMatter,
      title: env.title,
      content,
      relativeToRoot,
    });

    const distPath = path.resolve(distDir, filePath).replace(/\.md$/, '.html');

    fse.outputFileSync(distPath, html);

    console.log(`Generated ${distPath}`);
  });
}

function copyOtherFiles(srcDir, distDir) {
  const otherFiles = glob.sync('**/*', {
    ignore: [
      '**/*.md',
      '**/_*',
    ],
    cwd: srcDir,
  });

  otherFiles.forEach(filePath => {
    const fileResolvedPath = path.resolve(srcDir, filePath);
    const distPath = path.resolve(distDir, filePath);

    fse.copySync(fileResolvedPath, distPath);

    console.log(`Generated ${distPath}`);
  });
}

