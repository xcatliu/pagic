#! /usr/bin/env node

const fs = require('fs');
const program = require('commander');
const Pagic = require('..');

program
  .option('-w, --watch', 'watch src dir change')
  .parse(process.argv);

const pagic = new Pagic();

pagic.build();

if (program.watch) {
  fs.watch(pagic.config.src_dir, () => {
    pagic.build();
  });
}
