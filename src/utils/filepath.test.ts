import { path } from '../deps.ts';
import { assertEquals, assertMatch } from 'https://deno.land/std/testing/asserts.ts';

import {
  pagicRootPath,
  pascalToUnderline,
  underlineToPascal,
  replaceExt,
  globToRegExp,
  getOutputPath,
  replaceLink,
  findNearestLayoutPath,
  walk
} from './filepath.ts';
import Pagic from '../Pagic.ts';

Deno.test('[pagicRootPath]', () => {
  assertEquals(pagicRootPath, path.resolve(path.fromFileUrl(import.meta.url), '../../../'));
});

Deno.test('[pascalToUnderline]', () => {
  assertEquals(pascalToUnderline('FooBar'), '_foo_bar');
});
Deno.test('[underlineToPascal]', () => {
  assertEquals(underlineToPascal('_foo_bar'), 'FooBar');
});
Deno.test('[replaceExt]', () => {
  assertEquals(replaceExt('foo/bar.html', '_content.js'), 'foo/bar_content.js');
});
Deno.test('[globToRegExp]', () => {
  assertMatch('foo', globToRegExp('foo'));
  assertMatch('bar/foo', globToRegExp('{,**/}foo'));
  assertMatch('foo', globToRegExp('{,**/}foo'));
  assertMatch('foo/bar', globToRegExp('foo', { matchDir: true }));
  assertMatch('/a/b/foo', globToRegExp('foo', { prefix: '/a/b/' }));
  assertMatch('/a/b/bar/foo', globToRegExp('{,**/}foo', { prefix: '/a/b/' }));
  assertMatch('/a/b/foo', globToRegExp('{,**/}foo', { prefix: '/a/b/' }));
  assertMatch('/a/b/bar/foo/baz', globToRegExp('{,**/}foo', { matchDir: true, prefix: '/a/b/' }));
});
Deno.test('[getOutputPath]', () => {
  assertEquals(getOutputPath('README.md'), 'index.html');
  assertEquals(getOutputPath('/README.md'), '/index.html');
  assertEquals(getOutputPath('README.tsx'), 'index.html');
  assertEquals(getOutputPath('/README.tsx'), '/index.html');
  assertEquals(getOutputPath('foo/README.md'), 'foo/index.html');
  assertEquals(getOutputPath('foo/bar/README.md'), 'foo/bar/index.html');
  assertEquals(getOutputPath('f.oo/README.md'), 'f.oo/index.html');
  assertEquals(getOutputPath('foo.md'), 'foo.html');
  assertEquals(getOutputPath('/foo.md'), '/foo.html');
  assertEquals(getOutputPath('foo.tsx'), 'foo.html');
  assertEquals(getOutputPath('/foo.tsx'), '/foo.html');
  assertEquals(getOutputPath('bar/foo.tsx'), 'bar/foo.html');
  assertEquals(getOutputPath('baz/bar/foo.tsx'), 'baz/bar/foo.html');
  assertEquals(getOutputPath('f.oo.tsx'), 'f.oo.html');
  assertEquals(getOutputPath('b.ar/foo.tsx'), 'b.ar/foo.html');
});
Deno.test('[replaceLink]', () => {
  assertEquals(replaceLink('http://github.com/xcatliu'), 'http://github.com/xcatliu');
  assertEquals(replaceLink('https://github.com/xcatliu'), 'https://github.com/xcatliu');
  assertEquals(replaceLink('https://github.com/xcatliu?foo=bar'), 'https://github.com/xcatliu?foo=bar');
  assertEquals(replaceLink('https://github.com/xcatliu#hello'), 'https://github.com/xcatliu#hello');
  assertEquals(replaceLink('https://github.com/xcatliu?foo=bar#hello'), 'https://github.com/xcatliu?foo=bar#hello');
  assertEquals(replaceLink('README.md'), 'index.html');
  assertEquals(replaceLink('/README.md'), '/index.html');
  assertEquals(replaceLink('README.md?foo=bar'), 'index.html?foo=bar');
  assertEquals(replaceLink('README.md#hello'), 'index.html#hello');
  assertEquals(replaceLink('README.md?foo=bar#hello'), 'index.html?foo=bar#hello');
  assertEquals(replaceLink('foo/README.md'), 'foo/index.html');
  assertEquals(replaceLink('foo/bar/README.md'), 'foo/bar/index.html');
  assertEquals(replaceLink('foo/bar/README.md?foo=bar'), 'foo/bar/index.html?foo=bar');
  assertEquals(replaceLink('foo/bar/README.md#hello'), 'foo/bar/index.html#hello');
  assertEquals(replaceLink('foo/bar/README.md?foo=bar#hello'), 'foo/bar/index.html?foo=bar#hello');
  assertEquals(replaceLink('f.oo/README.md'), 'f.oo/index.html');
  assertEquals(replaceLink('foo.md'), 'foo.html');
  assertEquals(replaceLink('/foo.md'), '/foo.html');
});
Deno.test('[findNearestLayoutPath]', () => {
  assertEquals(findNearestLayoutPath('baz.md', ['foo/_layout.tsx', '_layout.tsx']), '_layout.tsx');
  assertEquals(findNearestLayoutPath('bar/baz.md', ['foo/_layout.tsx', '_layout.tsx']), '_layout.tsx');
  assertEquals(findNearestLayoutPath('foo/bar/baz.md', ['foo/_layout.tsx', '_layout.tsx']), 'foo/_layout.tsx');
  assertEquals(findNearestLayoutPath('bar/baz.md', ['bar/_layout.tsx', '_layout.tsx']), 'bar/_layout.tsx');
});
Deno.test('[walk]', async () => {
  assertEquals(await walk('test/fixtures/walk'), [
    'bar.md',
    'foo.md',
    'a/_bar.tsx',
    'a/_layout.tsx',
    'a/bar.tsx',
    'a/bar',
    'a/c/_foo.tsx',
    'a/c/foo.md',
    'a/c/foo',
    'foo',
    '_header.tsx',
    '_layout.tsx',
    'bar',
    'b/_foo.tsx',
    'b/foo.md',
    'b/foo',
    'foo.tsx'
  ]);
  assertEquals(
    await walk('test/fixtures/walk', {
      match: [Pagic.REGEXP_PAGE]
    }),
    ['bar.md', 'foo.md', 'a/bar.tsx', 'a/c/foo.md', 'b/foo.md', 'foo.tsx']
  );
  assertEquals(
    await walk('test/fixtures/walk', {
      match: [Pagic.REGEXP_LAYOUT]
    }),
    ['a/_bar.tsx', 'a/_layout.tsx', 'a/c/_foo.tsx', '_header.tsx', '_layout.tsx', 'b/_foo.tsx']
  );
  assertEquals(
    await walk('test/fixtures/walk', {
      skip: [Pagic.REGEXP_PAGE, Pagic.REGEXP_LAYOUT]
    }),
    ['a/bar', 'a/c/foo', 'foo', 'bar', 'b/foo']
  );
  assertEquals(
    await walk('test/fixtures/walk', {
      match: [/\/foo/],
      skip: [/\.md$/, /\.tsx$/]
    }),
    ['a/c/foo', 'foo', 'b/foo']
  );
  assertEquals(
    await walk('test/fixtures/walk', {
      match: [Pagic.REGEXP_PAGE],
      include: ['a']
    }),
    ['a/bar.tsx', 'a/c/foo.md']
  );
  assertEquals(
    await walk('test/fixtures/walk', {
      match: [Pagic.REGEXP_PAGE],
      exclude: ['b']
    }),
    ['bar.md', 'foo.md', 'a/bar.tsx', 'a/c/foo.md', 'foo.tsx']
  );
  assertEquals(
    await walk('test/fixtures/walk', {
      match: [Pagic.REGEXP_PAGE],
      include: ['a'],
      exclude: ['c']
    }),
    ['a/bar.tsx', 'a/c/foo.md']
  );
});
