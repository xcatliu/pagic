#! /usr/bin/env node

const fs = require('fs');
const program = require('commander');
const Pagic = require('..');
const http = require('http');
const ecstatic = require('ecstatic');

const DEFAULT_PORT = 8000;

program
  .option('-w, --watch', 'watch src dir change')
  .option('-s, --serve', 'serve public dir')
  .option('-p, --port', 'override default port')
  .parse(process.argv);

const pagic = new Pagic();

pagic.build();

if (program.watch) {
  console.log(`Watching ${pagic.config.src_dir}`);
  fs.watch(pagic.config.src_dir, () => {
    pagic.build();
  });
}

if (program.serve) {
  let port = DEFAULT_PORT;
  if (program.port) {
    port = program.port;
  }

  http.createServer(
    ecstatic({ root: pagic.config.public_dir })
  ).listen(port);

  console.log(`Serve ${pagic.config.public_dir} on http://localhost:${port}/`);
}
