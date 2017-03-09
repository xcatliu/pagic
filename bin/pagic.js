#! /usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .command('init', 'create a new Pagic folder')
  .command('build', 'build static page')
  .parse(process.argv);
