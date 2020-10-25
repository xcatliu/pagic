#!/usr/bin/env -S deno --unstable --allow-read --allow-write --allow-net --allow-run
export { React, ReactDOM, ReactDOMServer } from './deps.ts';
export { t, Trans } from './src/plugins/i18n.tsx';

import Pagic from './src/Pagic.ts';
import { Command } from 'https://deno.land/x/cliffy/command/mod.ts';
import { logger } from './src/utils/mod.ts';
export default Pagic;

export * from './src/Pagic.ts';

if (import.meta.main) {
  const build = new Command()
          .description('Build a static website')
          .option('--watch [watch:boolean]', 'Watch file changes to rebuild', { default: false })
          .option('--serve [serve:boolean]', 'Start local service, preview static website', { default: false })
          .option('--port <port:number>', 'Specify the local port of the service', { default: 8000 })
          .action((options: any) => {
            const pagic = new Pagic(options);
            pagic.build();
          });

  const init = new Command()
           .description('automatically generate pagic_config.ts, pagic_config.tsx, or mod.ts')
           .arguments('[conf:string]')
           .action((options: any, conf: string) => {
             const pagic = new Pagic();
             switch (conf) {
               case 'mod.ts':
                 pagic.genMod();
                 break;
               case 'pagic.config.ts':
               case 'pagic.config.tsx':
                 pagic.genConf(conf);
                 break;
                default:
                  console.log('Invalid file name');
                  return;
             }
           });

  await new Command()
    .name('pagic')
    .command('build', build)
    .command('init', init)
    .parse(Deno.args);

}
