#!/usr/bin/env -S deno --unstable --allow-read --allow-write --allow-net --allow-run
export { React, ReactDOM, ReactDOMServer } from './deps.ts';
export { t, Trans } from './src/plugins/i18n.tsx';

import { fs } from './deps.ts';
import { logger } from './src/utils/mod.ts';
import Pagic from './src/Pagic.ts';
export default Pagic;
export * from './src/Pagic.ts';

import { Command } from 'https://deno.land/x/cliffy@v0.15.0/command/mod.ts';
import { Select } from 'https://deno.land/x/cliffy@v0.15.0/prompt/select.ts';
import { Confirm } from 'https://deno.land/x/cliffy@v0.15.0/prompt/confirm.ts';

if (import.meta.main) {
  const build = new Command()
    .description('Build a static website')
    .option('--watch [watch:boolean]', 'Watch file changes to rebuild')
    .option('--serve [serve:boolean]', 'Start local service, preview static website')
    .option('--port <port:number>', 'Specify the local port of the service')
    .action((options: any) => {
      const pagic = new Pagic(options);
      pagic.build();
    });

  const init = new Command().description('Init pagic site/theme/plugin').action(async () => {
    const mode: string = await Select.prompt({
      message: 'Init current dir as a',
      options: [
        { name: 'site', value: 'site' },
        { name: 'theme', value: 'theme' },
        { name: 'plugin', value: 'plugin' },
      ],
    });

    const pagic = new Pagic();
    switch (mode) {
      case 'site':
        if (await fs.exists('pagic.config.ts')) {
          logger.warn('pagic.config.ts already exists, exit');
          return;
        }
        if (await fs.exists('pagic.config.tsx')) {
          logger.warn('pagic.config.tsx already exists, exit');
          return;
        }
        await Deno.writeTextFile('pagic.config.ts', 'export default {};\n');
        break;
      case 'theme':
        if (await fs.exists('mod.ts')) {
          const confirmed = await Confirm.prompt('mod.ts already exists, do you want to override it?');
          if (!confirmed) {
            return;
          }
        }
        pagic.generateThemeMod();
        break;
      default:
        logger.error(`Invalid mode ${mode}`);
    }
  });

  await new Command().name('pagic').command('build', build).command('init', init).parse(Deno.args);
}
