import * as ts from 'https://dev.jspm.io/typescript@3.9.3';
import reactElementToJSXStringModule from 'https://dev.jspm.io/react-element-to-jsx-string@14.3.1';

import { fs, colors, pagicRootPath } from './mod.ts';

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
    .replace(/^import .*\/react(\/|'|"|@).*$/gm, '')
    .replace(/^import .*\/react-dom(\/|'|"|@).*$/gm, '')
    .replace(/^\/\/ @deno-types.*$/gm, '');
}

/**
 * Read input file and then compile it
 */
export async function compileFile(src: string) {
  console.log(colors.green('Compile file'), src);
  const content = await fs.readFileStr(src);
  return compile(content);
}

/**
 * Compile a pagic file with local or remote url
 */
export async function compilePagicFile(pathToPagicRoot: string) {
  console.log(colors.green('Compile pagic file'), pathToPagicRoot);
  let content = '';
  if (import.meta.url.startsWith('file://')) {
    const src = `${pagicRootPath}${pathToPagicRoot}`;
    content = await fs.readFileStr(src);
  } else {
    const res = await fetch(`${pagicRootPath}${pathToPagicRoot}`);
    content = await res.text();
  }
  return compile(content);
}
