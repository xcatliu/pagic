import * as ts from 'https://dev.jspm.io/typescript@3.9.3';
import reactElementToJSXStringModule from 'https://dev.jspm.io/react-element-to-jsx-string@14.3.1';

import { logger } from './common.ts';
import { pagicRootPath } from './filepath.ts';

export const reactElementToJSXString = (reactElementToJSXStringModule as any).default;

/**
 * Compile input code from tsx to js, by typescript compiler
 * Will replace `.tsx` to `.js` in `import` statement, and remove react and react-dom imports
 */
export function compile(input: string) {
  return (ts as any).default
    .transpileModule(input, {
      compilerOptions: {
        target: 'ES2019',
        module: 'ESNext',
        jsx: 'React',
        removeComments: false,
        newLine: 'lf'
      }
    })
    .outputText.replace(/(^import\s+.*['"/][^_][^/]*)\.tsx(['"];?$\n)/gm, '$1_content.js$2')
    .replace(/(^import\s+.*)\.tsx?(['"];?$\n)/gm, '$1.js$2')
    .replace(/^import\s+\{([^\}]*)\}\s+(.*$\n)/gm, ($0: string, importNamesString: string, moduleName: string) => {
      let importNames = importNamesString.trim().split(/\s*,\s*/);
      const ignoredImportNames = ['React', 'ReactDOM', 't', 'Trans'];
      importNames = importNames.filter((importName) => !ignoredImportNames.includes(importName));
      if (importNames.length === 0) {
        return '';
      }
      return `import { ${importNames.join(', ')} } ${moduleName}`;
    });
}
/** Read input file and then compile it */
export async function compileFile(src: string) {
  logger.success('Compile file', src);
  const content = await Deno.readTextFile(src);
  return compile(content);
}
/** Compile a pagic file with local or remote url */
export async function compilePagicFile(pathToPagicRoot: string) {
  logger.success('Compile pagic file', pathToPagicRoot);
  const src = `${pagicRootPath}/${pathToPagicRoot}`;
  let content = '';
  if (import.meta.url.startsWith('file://')) {
    content = await Deno.readTextFile(src);
  } else {
    const res = await fetch(src);
    content = await res.text();
  }
  return compile(content);
}
