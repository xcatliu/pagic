#! /usr/bin/env node

const pkg = require('../package.json');
const program = require('commander');

program
  .version(pkg.version)
  .option('-s, --src-dir [path]', 'Set src dir')
  .option('-d, --dist-dir [path]', 'Set dist dir')
  .option('-w, --watch', 'Watch src dir change')
  .parse(process.argv);

const config = {};

if (program.srcDir) {
  config.srcDir = program.srcDir;
}
if (program.distDir) {
  config.distDir = program.distDir;
}
if (program.watch) {
  config.watch = program.watch;
}

const pagic = require('..');

pagic(config)();
