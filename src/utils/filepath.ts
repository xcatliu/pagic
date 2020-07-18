import { fs, path } from '../deps.ts';
import minimatch from 'https://dev.jspm.io/minimatch@3.0.4';

import { PagicConfig } from '../Pagic.ts';

/**
 * Get the runtime pagic root path, it should be a file-system-path or a url
 * /User/xcatliu/work/github/pagic or https://deno.land/x/pagic
 */
export const pagicRootPath = (() => {
  if (import.meta.url.startsWith('file://')) {
    return path.resolve(path.fromFileUrl(import.meta.url), '../../../');
  } else {
    return import.meta.url.replace(/\/src\/utils\/filepath\.ts$/, '');
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
export function globToRegExp(
  glob: string,
  options?: {
    matchDir?: boolean;
    prefix?: string;
  }
): RegExp {
  const { matchDir, prefix } = {
    matchDir: false,
    prefix: '',
    ...options
  };
  // eslint-disable-next-line no-param-reassign
  glob = `${prefix}${glob}`;
  if (matchDir) {
    // eslint-disable-next-line no-param-reassign
    glob = `${glob}{,/**}`;
  }
  const mm = new minimatch.Minimatch(glob);
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

/** A util to replace fs.walk method, return relativeToSrcPath instead of fullPath */
export async function walk(
  srcDir: string,
  walkOptions: fs.WalkOptions & Pick<PagicConfig, 'include' | 'exclude'> = {}
): Promise<string[]> {
  let { match, skip, include, exclude } = walkOptions;
  const includeMatch: RegExp[] | undefined = include?.map((glob) =>
    globToRegExp(glob, {
      matchDir: true,
      prefix: `${path.resolve(srcDir)}/`
    })
  );
  const excludeSkip: RegExp[] | undefined = exclude?.map((glob) =>
    globToRegExp(glob, {
      matchDir: true,
      prefix: `${path.resolve(srcDir)}/`
    })
  );

  let walkEntries = [];
  const walkResult = fs.walk(path.resolve(srcDir), {
    includeDirs: false,
    ...walkOptions,
    match: include ? includeMatch : match,
    skip: [...(skip ?? []), ...(excludeSkip ?? [])]
  });

  if (include && match) {
    for await (const i of walkResult) {
      if (match.some((regExp) => regExp.test(i.path))) {
        walkEntries.push(path.relative(srcDir, i.path));
      }
    }
  } else {
    for await (const i of walkResult) {
      walkEntries.push(path.relative(srcDir, i.path));
    }
  }
  return walkEntries;
}
