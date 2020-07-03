import { path, colors } from '../deps.ts';

export type AnyFunction = (...args: any[]) => any;
export interface AnyObject {
  [key: string]: any;
}

/**
 * /User/xcatliu/work/github/pagic/
 * or
 * https://deno.land/x/pagic/
 */
export const pagicRootPath = (() => {
  if (import.meta.url.startsWith('file://')) {
    return path.resolve(path.dirname(path.fromFileUrl(import.meta.url)), '../../') + '/';
  } else {
    return import.meta.url.replace(/\/src\/utils\/common\.ts$/, '/');
  }
})();

export function unique(arr: any[]) {
  return Array.from(new Set(arr));
}

export function omit(obj: any, keys: string[]) {
  if (!obj) {
    return obj;
  }
  let result: any = {};
  Object.keys(obj)
    .filter((key) => !keys.includes(key))
    .forEach((key) => {
      result[key] = obj[key];
    });
  return result;
}

export function pick(obj: any, keys: string[]) {
  if (!obj) {
    return obj;
  }
  let result: any = {};
  Object.keys(obj)
    .filter((key) => keys.includes(key))
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

export const log = {
  info: (...args: string[]) => {
    console.log('[Pagic]', ...args);
  },
  warn: (first: string, ...args: string[]) => {
    console.log(colors.yellow('[Pagic]'), colors.yellow(first), ...args);
  },
  error: (first: string, ...args: string[]) => {
    console.log(colors.red('[Pagic]'), colors.red(first), ...args);
  },
  success: (first: string, ...args: string[]) => {
    console.log(colors.green('[Pagic]'), colors.green(first), ...args);
  }
};

type Tree<T extends AnyObject = AnyObject> = T & {
  children?: Tree<T>[];
};

export function depthFirstTraversal<T>(tree: Tree<T> | Tree<T>[], callback: AnyFunction) {
  // Deep clone
  let remain = Array.isArray(tree) ? [...tree] : [tree];
  while (remain.length > 0) {
    const current = remain.shift()!;
    if (current.children) {
      remain = [...current.children, ...remain];
    }
    callback(current);
  }
}
