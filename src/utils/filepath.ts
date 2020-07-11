import { path } from '../deps.ts';
import minimatch from 'https://dev.jspm.io/minimatch@3.0.4';

/**
 * Get the runtime pagic root path, it should be a file-system-path or a url
 * /User/xcatliu/work/github/pagic or https://deno.land/x/pagic
 */
export const pagicRootPath = (() => {
  if (import.meta.url.startsWith('file://')) {
    return path.resolve(path.fromFileUrl(import.meta.url), '../../../');
  } else {
    return import.meta.url.replace(/\/src\/utils\/common\.ts$/, '');
  }
})();

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
/**
 * input: node_modules
 * output: minimatch: **\/node_modules{,/**}
 */
export function globToRegExp(glob: string) {
  const mm = new minimatch.Minimatch(`{,**/}${glob}{,/**}`);
  return mm.makeRe();
}
/**
 * input: foo/README.md
 * output: foo/index.html
 */
export function getOutputPath(pagePath: string) {
  return replaceExt(`/${pagePath}`, '.html')
    .replace(/\/README\.html$/, '/index.html')
    .slice(1);
}
/**
 * input: https://github.com/xcatliu
 * output: https://github.com/xcatliu
 *
 * input: foo/bar.md
 * output: foo/bar.html
 *
 * input: README.md
 * output: index.html
 */
export function replaceLink(link: string) {
  if (/^https?:\/\//.test(link)) {
    return link;
  }
  if (/\/README\.md(\?|#|$)/.test(`/${link}`)) {
    return `/${link}`.replace(/\/README\.md(\?|#|$)/, '/index.html$1').slice(1);
  }
  return link.replace(/\.md(\?|#|$)/, '.html$1');
}
/**
 * input: ('foo/bar/baz.md', ['foo/_layout.tsx', '_layout.tsx'])
 * output: 'foo/_layout.tsx'
 */
export function findNearestLayoutPath(pagePath: string, layoutPaths: string[]) {
  let layoutPath = `/${pagePath}`.replace(/\/[^\/]+$/, '/_layout.tsx');
  while (layoutPath !== '/_layout.tsx') {
    if (layoutPaths.includes(layoutPath.slice(1))) {
      break;
    }
    layoutPath = layoutPath.replace(/\/[^\/]+\/[^\/]+$/, '/_layout.tsx');
  }
  layoutPath = layoutPath.slice(1);
  return layoutPath;
}
