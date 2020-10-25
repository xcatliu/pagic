#!/usr/bin/env -S deno --unstable --allow-read --allow-write --allow-net --allow-run
export { React, ReactDOM, ReactDOMServer } from './deps.ts';
export { t, Trans } from './src/plugins/i18n.tsx';

import Pagic from './src/Pagic.ts';
import { Command } from 'https://deno.land/x/cliffy/command/mod.ts';
import { Select } from 'https://deno.land/x/cliffy/prompt/select.ts';
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
           .action(async (options: any) => {
             const confName: string = await Select.prompt({
               message: 'Choose a file to generate',
               options: [
                 { name: 'mod.ts', value: 'mod.ts' },
                 { name: 'pagic.config.ts', value: 'pagic.config.ts' },
                 { name: 'pagic.config.tsx', value: 'pagic.config.tsx' }
               ]
             });
             const pagic = new Pagic();
             switch (confName) {
               case 'mod.ts':
                 pagic.genMod();
                 break;
               case 'pagic.config.ts':
               case 'pagic.config.tsx':
                 pagic.genConf(confName);
                 break;
               default:
                 console.error('Invalid filename');
             }
           });

  await new Command()
    .name('pagic')
    .command('build', build)
    .command('init', init)
    .parse(Deno.args);

}
