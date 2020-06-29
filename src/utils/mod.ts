import * as fs from 'https://deno.land/std@0.56.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.56.0/path/mod.ts';
import * as colors from 'https://deno.land/std@0.56.0/fmt/colors.ts';

export { fs, path, colors };
export * from './copy.ts';
export * from './compile.ts';
export * from './import.ts';

/**
 * /User/xcatliu/work/github/pagic/
 * or
 * https://deno.land/x/pagic/
 */
export const pagicRootPath = (() => {
  if (import.meta.url.startsWith('file://')) {
    return path.resolve(path.dirname(path.fromFileUrl(import.meta.url)), '../../') + '/';
  } else {
    return import.meta.url.replace(/\/src\/utils\/mod\.ts$/, '/');
  }
})();

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

/**
 * input: FooBar
 * output: _foo_bar
 */
export function pascalToUnderline(FooBar: string) {
  return FooBar.replace(/[A-Z]/g, ($0) => `_${$0.toLowerCase()}`);
}

/**
 * input: _foo_bar
 * output: FooBar
 */
export function underlineToPascal(_foo_bar: string) {
  return _foo_bar.replace(/_([a-z])/g, ($0, $1) => $1.toUpperCase());
}

/**
 * input: foo/bar.html
 * replacement: _content.js
 * output: foo/bar_content.js
 */
export function replaceExt(input: string, replacement: string) {
  return input.replace(/\.[^\.]+$/, replacement);
}
