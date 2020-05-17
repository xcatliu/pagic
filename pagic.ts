#!/usr/bin/env -S deno --unstable --allow-read --allow-write --allow-net

import Pagic from './src/Pagic.ts';
export * from './src/Pagic.ts';

if (import.meta.main) {
  const [subCommand, ...restArgs] = Deno.args;

  const validSubCommands = ['run'];
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
        options[key] = restArgs[i + 1];
        i++;
      }
    } else if (currentArg.startsWith('-')) {
      const key = currentArg.slice(1);
      if (!validOptions.includes(key)) {
        throw new Error(`Invalid option ${key}`);
      }
      options[key] = true;
    } else {
      throw new Error(`Invalid args ${restArgs[i]}`);
    }
  }
  const pagic = new Pagic(options);
  if (subCommand === 'run') {
    pagic.run();
  }
}
