import { asserts, path } from '../../deps.ts';

import {
  pagicRootPath,
  pascalToUnderline,
  underlineToPascal,
  replaceExt,
  getOutputPath,
  replaceLink,
  findNearestLayoutPath,
  walk
} from './filepath.ts';
import Pagic from '../Pagic.ts';

Deno.test('[pagicRootPath]', () => {
  asserts.assertEquals(pagicRootPath, path.resolve(path.fromFileUrl(import.meta.url), '../../../'));
});

Deno.test('[pascalToUnderline]', () => {
  asserts.assertEquals(pascalToUnderline('FooBar'), '_foo_bar');
});
Deno.test('[underlineToPascal]', () => {
  asserts.assertEquals(underlineToPascal('_foo_bar'), 'FooBar');
});
Deno.test('[replaceExt]', () => {
  asserts.assertEquals(replaceExt('foo/bar.html', '_content.js'), 'foo/bar_content.js');
});
Deno.test('[getOutputPath]', () => {
  asserts.assertEquals(getOutputPath('README.md'), 'index.html');
  asserts.assertEquals(getOutputPath('/README.md'), '/index.html');
  asserts.assertEquals(getOutputPath('README.tsx'), 'index.html');
  asserts.assertEquals(getOutputPath('/README.tsx'), '/index.html');
  asserts.assertEquals(getOutputPath('foo/README.md'), 'foo/index.html');
  asserts.assertEquals(getOutputPath('foo/bar/README.md'), 'foo/bar/index.html');
  asserts.assertEquals(getOutputPath('f.oo/README.md'), 'f.oo/index.html');
  asserts.assertEquals(getOutputPath('foo.md'), 'foo.html');
  asserts.assertEquals(getOutputPath('/foo.md'), '/foo.html');
  asserts.assertEquals(getOutputPath('foo.tsx'), 'foo.html');
  asserts.assertEquals(getOutputPath('/foo.tsx'), '/foo.html');
  asserts.assertEquals(getOutputPath('bar/foo.tsx'), 'bar/foo.html');
  asserts.assertEquals(getOutputPath('baz/bar/foo.tsx'), 'baz/bar/foo.html');
  asserts.assertEquals(getOutputPath('f.oo.tsx'), 'f.oo.html');
  asserts.assertEquals(getOutputPath('b.ar/foo.tsx'), 'b.ar/foo.html');
});
Deno.test('[replaceLink]', () => {
  asserts.assertEquals(replaceLink('http://github.com/xcatliu'), 'http://github.com/xcatliu');
  asserts.assertEquals(replaceLink('https://github.com/xcatliu'), 'https://github.com/xcatliu');
  asserts.assertEquals(replaceLink('https://github.com/xcatliu?foo=bar'), 'https://github.com/xcatliu?foo=bar');
  asserts.assertEquals(replaceLink('https://github.com/xcatliu#hello'), 'https://github.com/xcatliu#hello');
  asserts.assertEquals(
    replaceLink('https://github.com/xcatliu?foo=bar#hello'),
    'https://github.com/xcatliu?foo=bar#hello'
  );
  asserts.assertEquals(replaceLink('README.md'), 'index.html');
  asserts.assertEquals(replaceLink('/README.md'), '/index.html');
  asserts.assertEquals(replaceLink('README.md?foo=bar'), 'index.html?foo=bar');
  asserts.assertEquals(replaceLink('README.md#hello'), 'index.html#hello');
  asserts.assertEquals(replaceLink('README.md?foo=bar#hello'), 'index.html?foo=bar#hello');
  asserts.assertEquals(replaceLink('foo/README.md'), 'foo/index.html');
  asserts.assertEquals(replaceLink('foo/bar/README.md'), 'foo/bar/index.html');
  asserts.assertEquals(replaceLink('foo/bar/README.md?foo=bar'), 'foo/bar/index.html?foo=bar');
  asserts.assertEquals(replaceLink('foo/bar/README.md#hello'), 'foo/bar/index.html#hello');
  asserts.assertEquals(replaceLink('foo/bar/README.md?foo=bar#hello'), 'foo/bar/index.html?foo=bar#hello');
  asserts.assertEquals(replaceLink('f.oo/README.md'), 'f.oo/index.html');
  asserts.assertEquals(replaceLink('foo.md'), 'foo.html');
  asserts.assertEquals(replaceLink('/foo.md'), '/foo.html');
});
Deno.test('[findNearestLayoutPath]', () => {
  asserts.assertEquals(findNearestLayoutPath('baz.md', ['foo/_layout.tsx', '_layout.tsx']), '_layout.tsx');
  asserts.assertEquals(findNearestLayoutPath('bar/baz.md', ['foo/_layout.tsx', '_layout.tsx']), '_layout.tsx');
  asserts.assertEquals(findNearestLayoutPath('foo/bar/baz.md', ['foo/_layout.tsx', '_layout.tsx']), 'foo/_layout.tsx');
  asserts.assertEquals(findNearestLayoutPath('bar/baz.md', ['bar/_layout.tsx', '_layout.tsx']), 'bar/_layout.tsx');
});
const sort = (arr: string[]) => arr.sort((a: string, b: string) => a.localeCompare(b));
Deno.test('[walk]', async () => {
  asserts.assertEquals(sort(await walk('test/fixtures/walk')), [
    '.bar',
    '.foo/foo.md',
    '_header.tsx',
    '_layout.tsx',
    'a/_bar.tsx',
    'a/_layout.tsx',
    'a/bar',
    'a/bar.tsx',
    'a/c/_foo.tsx',
    'a/c/foo',
    'a/c/foo.md',
    'b/_foo.tsx',
    'b/foo',
    'b/foo.md',
    'bar',
    'bar.md',
    'foo',
    'foo.md',
    'foo.tsx'
  ]);
  asserts.assertEquals(
    sort(
      await walk('test/fixtures/walk', {
        match: [Pagic.REGEXP_PAGE]
      })
    ),
    ['.foo/foo.md', 'a/bar.tsx', 'a/c/foo.md', 'b/foo.md', 'bar.md', 'foo.md', 'foo.tsx']
  );
  asserts.assertEquals(
    sort(
      await walk('test/fixtures/walk', {
        match: [Pagic.REGEXP_LAYOUT]
      })
    ),
    ['_header.tsx', '_layout.tsx', 'a/_bar.tsx', 'a/_layout.tsx', 'a/c/_foo.tsx', 'b/_foo.tsx']
  );
  asserts.assertEquals(
    sort(
      await walk('test/fixtures/walk', {
        skip: [Pagic.REGEXP_PAGE, Pagic.REGEXP_LAYOUT]
      })
    ),
    ['.bar', 'a/bar', 'a/c/foo', 'b/foo', 'bar', 'foo']
  );
  asserts.assertEquals(
    sort(
      await walk('test/fixtures/walk', {
        skip: [path.globToRegExp('**/.*'), Pagic.REGEXP_LAYOUT]
      })
    ),
    ['a/bar', 'a/bar.tsx', 'a/c/foo', 'a/c/foo.md', 'b/foo', 'b/foo.md', 'bar', 'bar.md', 'foo', 'foo.md', 'foo.tsx']
  );
  asserts.assertEquals(
    sort(
      await walk('test/fixtures/walk', {
        match: [/[\/\\]foo/],
        skip: [/\.md$/, /\.tsx$/]
      })
    ),
    ['a/c/foo', 'b/foo', 'foo']
  );
  asserts.assertEquals(
    sort(
      await walk('test/fixtures/walk', {
        match: [Pagic.REGEXP_PAGE],
        include: ['a']
      })
    ),
    ['a/bar.tsx', 'a/c/foo.md']
  );
  asserts.assertEquals(
    sort(
      await walk('test/fixtures/walk', {
        match: [Pagic.REGEXP_PAGE],
        exclude: ['b']
      })
    ),
    ['.foo/foo.md', 'a/bar.tsx', 'a/c/foo.md', 'bar.md', 'foo.md', 'foo.tsx']
  );
  asserts.assertEquals(
    sort(
      await walk('test/fixtures/walk', {
        match: [Pagic.REGEXP_PAGE],
        include: ['a'],
        exclude: ['c']
      })
    ),
    ['a/bar.tsx', 'a/c/foo.md']
  );
});
