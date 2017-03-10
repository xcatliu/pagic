#! /usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .command('init <dir>', 'create a new Pagic folder')
  .command('build [options]', 'build static page')
  .parse(process.argv);
