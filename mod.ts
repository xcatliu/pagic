#!/usr/bin/env -S deno --unstable --allow-read --allow-write --allow-net
export { React, ReactDOM, ReactDOMServer } from './deps.ts';
export { t, Trans } from './src/plugins/i18n.tsx';

import Pagic from './src/Pagic.ts';
import { logger } from './src/utils/mod.ts';
export default Pagic;

export * from './src/Pagic.ts';

if (import.meta.main) {
  const [subCommand, ...restArgs] = Deno.args;
  if (subCommand === undefined) {
    logger.info(` Miss valid subCommand, known as 'pagic build'.`);
    Deno.exit(1);
  }

  const validSubCommands = ['build'];
  if (!validSubCommands.includes(subCommand)) {
    throw new Error(`Invalid subCommand ${subCommand}`);
  }

  const validOptions = ['serve', 'watch', 'port'];
  let options: { [key: string]: any } = {};
  for (let i = 0; i < restArgs.length; i++) {
    const currentArg = restArgs[i];
    const nextArg = restArgs[i + 1];
    if (currentArg.startsWith('--')) {
      const key = currentArg.slice(2);
      if (!validOptions.includes(key)) {
        throw new Error(`Invalid option ${key}`);
      }
      if (typeof nextArg === 'undefined' || nextArg.startsWith('-')) {
        options[key] = true;
      } else {
        if (Number(nextArg).toString() === nextArg) {
          options[key] = Number(nextArg);
        } else {
          options[key] = nextArg;
        }
        i++;
      }
    } else if (currentArg.startsWith('-')) {
      const key = currentArg.slice(1);
      if (!validOptions.includes(key)) {
        throw new Error(`Invalid option ${key}`);
      }
      options[key] = true;
    } else {
      throw new Error(`Invalid args ${currentArg}`);
    }
  }
  const pagic = new Pagic(options);
  if (subCommand === 'build') {
    pagic.build();
  }
}
