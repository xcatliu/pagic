import * as path from 'https://deno.land/std@0.56.0/path/mod.ts';
import * as fs from 'https://deno.land/std@0.56.0/fs/mod.ts';
import { green } from 'https://deno.land/std@0.56.0/fmt/colors.ts';

import * as ts from 'https://dev.jspm.io/typescript@3.9.3';

export function unique(arr: any[]) {
  return Array.from(new Set(arr));
}

export function omit(obj: any, keys: string[]) {
  let result: any = {};
  Object.keys(obj)
    .filter((key) => !keys.includes(key))
    .forEach((key) => {
      result[key] = obj[key];
    });
  return result;
}

/**
 * input: [{name:'foo'},{name:'bar'},{name:'baz',insert:'before:bar'}]
 * output: [{name:'foo'},{name:'baz',insert:'before:bar'},{name:'bar'}]
 */
export function sortByInsert<
  T extends {
    name: string;
    insert?: string;
    index?: number;
  }
>(arr: T[]) {
  let restItems: T[] = [];
  arr.forEach((item, index) => {
    item.index = index;
    if (typeof item.insert !== 'undefined') {
      restItems.push(item);
    }
  });
  while (restItems.length > 0) {
    restItems.forEach((item, index) => {
      // before:layout
      const [insertCond, insertName] = (item.insert as string).split(':');
      const delta = insertCond === 'before' ? -0.1 : insertCond === 'after' ? 0.1 : 0;
      const insertItem = arr.find(({ name }) => name === insertName)!;
      if (!restItems.includes(insertItem)) {
        item.index = insertItem.index! + delta;
        restItems.splice(index, 1);
      }
    });
  }
  return arr.sort((a, b) => a.index! - b.index!);
}

export async function ensureDirAndWriteFileStr(filename: string, content: string) {
  console.log(green('Write'), filename);
  await fs.ensureDir(path.dirname(filename));
  await fs.writeFileStr(filename, content);
}
export async function ensureDirAndCopy(src: string, dest: string, options?: fs.CopyOptions) {
  console.log(green('Copy'), src);
  await fs.ensureDir(path.dirname(dest));
  await fs.copy(src, dest, options);
}
export async function copyPagicFile(pathToPagicRoot: string, dest: string) {
  console.log(green('Copy pagic file'), pathToPagicRoot);
  if (import.meta.url.startsWith('file://')) {
    const src = path.resolve(path.dirname(path.fromFileUrl(import.meta.url)), '../../', pathToPagicRoot);
    await ensureDirAndCopy(src, dest, { overwrite: true });
  } else {
    const res = await fetch(import.meta.url.replace(/\/src\/utils\/mod\.ts$/, `/${pathToPagicRoot}`));
    const content = await res.text();
    await ensureDirAndWriteFileStr(dest, content);
  }
}
export function compile(input: string) {
  return ts.default
    .transpileModule(input, {
      compilerOptions: {
        target: 'ESNext',
        module: 'ESNext',
        jsx: 'React'
      }
    })
    .outputText.replace(/(^import .*)\.tsx((?:'|");?$)/gm, '$1.js$2')
    .replace(/(^import .*)\/react(\/|'|"|@).*$/gm, '')
    .replace(/(^import .*)\/react-dom(\/|'|"|@).*$/gm, '');
}
export async function compileFile(src: string) {
  console.log(green('Compile file'), src);
  const content = await fs.readFileStr(src);
  return compile(content);
}
export async function compilePagicFile(pathToPagicRoot: string) {
  console.log(green('Compile pagic file'), pathToPagicRoot);
  let content = '';
  if (import.meta.url.startsWith('file://')) {
    const src = path.resolve(path.dirname(path.fromFileUrl(import.meta.url)), '../../', pathToPagicRoot);
    content = await fs.readFileStr(src);
  } else {
    const res = await fetch(import.meta.url.replace(/\/src\/utils\/mod\.ts$/, `/${pathToPagicRoot}`));
    content = await res.text();
  }
  return compile(content);
}
