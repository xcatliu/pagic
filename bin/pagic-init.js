#! /usr/bin/env node

const path = require('path');
const fse = require('fs-extra');
const program = require('commander');

let initDir;

program
  .arguments('<dir>')
  .action(dir => {
    initDir = dir;
  })
  .parse(process.argv);

if (typeof initDir === 'undefined') {
  console.error('You must specify a dir');
  process.exit(1);
}

if (fse.existsSync(initDir)) {
  console.error(`${initDir} is not empty`);
  process.exit(1);
}

const copySrcDir = path.resolve(__dirname, '../site');
const initSrcDir = path.resolve(initDir, 'src');

const defaultConfigPath = path.resolve(__dirname, '../src/defaultConfig.yml');
const initConfigPath = path.resolve(initDir, '_config.yml');

fse.copySync(copySrcDir, initSrcDir);
fse.copySync(defaultConfigPath, initConfigPath);
console.log(`Init ${initDir} done
Please \`cd ${initDir}\` and run \`pagic build\``);
