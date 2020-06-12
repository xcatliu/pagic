import * as path from 'https://deno.land/std@0.56.0/path/mod.ts';
import * as fs from 'https://deno.land/std@0.56.0/fs/mod.ts';
import { green } from 'https://deno.land/std@0.56.0/fmt/colors.ts';

import * as ts from 'https://dev.jspm.io/typescript@3.9.3';

/**
 * Compile input code from tsx to js, by typescript compiler
 * Will replace `.tsx` to `.js` in `import` statement, and remove react and react-dom imports
 */
export function compile(input: string) {
  return ts.default
    .transpileModule(input, {
      compilerOptions: {
        target: 'ESNext',
        module: 'ESNext',
        jsx: 'React',
        removeComments: false,
        newLine: 'lf'
      }
    })
    .outputText.replace(/(^import .*)\.tsx?((?:'|");?$)/gm, '$1.js$2')
    .replace(/(^import .*)\/react(\/|'|"|@).*$/gm, '')
    .replace(/(^import .*)\/react-dom(\/|'|"|@).*$/gm, '');
}

/**
 * Read input file and then compile it
 */
export async function compileFile(src: string) {
  console.log(green('Compile file'), src);
  const content = await fs.readFileStr(src);
  return compile(content);
}

/**
 * Compile a pagic file with local or remote url
 */
export async function compilePagicFile(pathToPagicRoot: string) {
  console.log(green('Compile pagic file'), pathToPagicRoot);
  let content = '';
  if (import.meta.url.startsWith('file://')) {
    const src = path.resolve(path.dirname(path.fromFileUrl(import.meta.url)), '../../', pathToPagicRoot);
    content = await fs.readFileStr(src);
  } else {
    const res = await fetch(import.meta.url.replace(/\/src\/utils\/compile\.ts$/, `/${pathToPagicRoot}`));
    content = await res.text();
  }
  return compile(content);
}
