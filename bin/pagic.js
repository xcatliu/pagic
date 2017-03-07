#! /usr/bin/env node

const fs = require('fs');
const program = require('commander');
const pkg = require('../package.json');
const Pagic = require('../src/Pagic');

program
  .version(pkg.version)
  .option('-s, --src-dir [path]', 'Set src dir')
  .option('-d, --dist-dir [path]', 'Set dist dir')
  .option('-w, --watch', 'Watch src dir change')
  .parse(process.argv);

const pagic = new Pagic({
  srcDir: program.srcDir,
  distDir: program.distDir,
});

pagic.build();

if (program.watch) {
  fs.watch(pagic.options.srcDir, () => {
    pagic.build();
  });
}
