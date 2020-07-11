import { fs } from '../deps.ts';
import * as ts from 'https://dev.jspm.io/typescript@3.9.3';
import reactElementToJSXStringModule from 'https://dev.jspm.io/react-element-to-jsx-string@14.3.1';

import { logger } from './common.ts';
import { pagicRootPath } from './filepath.ts';

export const reactElementToJSXString = reactElementToJSXStringModule.default;

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
    .replace(/^import .*\/react(\/|'|"|@).*$\n/gm, '')
    .replace(/^import .*\/react-dom(\/|'|"|@).*$\n/gm, '')
    .replace(/^\/\/ @deno-types.*$\n/gm, '');
}
/** Read input file and then compile it */
export async function compileFile(src: string) {
  logger.success('Compile file', src);
  const content = await fs.readFileStr(src);
  return compile(content);
}
/** Compile a pagic file with local or remote url */
export async function compilePagicFile(pathToPagicRoot: string) {
  logger.success('Compile pagic file', pathToPagicRoot);
  const src = `${pagicRootPath}/${pathToPagicRoot}`;
  let content = '';
  if (import.meta.url.startsWith('file://')) {
    content = await fs.readFileStr(src);
  } else {
    const res = await fetch(src);
    content = await res.text();
  }
  return compile(content);
}
