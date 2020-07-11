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
  findNearestLayoutPath
} from './filepath.ts';

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
  assertMatch('/foo/node_modules', globToRegExp('node_modules'));
  assertMatch('/foo/node_modules/', globToRegExp('node_modules'));
  assertMatch('/foo/node_modules/bar', globToRegExp('node_modules'));
  assertMatch('/foo/node_modules/bar/baz', globToRegExp('node_modules'));
  assertMatch('/foo/foo2/node_modules/bar/baz', globToRegExp('node_modules'));
  assertMatch('/node_modules', globToRegExp('node_modules'));
  assertMatch('/node_modules/', globToRegExp('node_modules'));
  assertMatch('/node_modules/bar', globToRegExp('node_modules'));
  assertMatch('/node_modules/bar/baz', globToRegExp('node_modules'));
  assertMatch('node_modules', globToRegExp('node_modules'));
  assertMatch('node_modules/', globToRegExp('node_modules'));
  assertMatch('node_modules/bar', globToRegExp('node_modules'));
  assertMatch('node_modules/bar/baz', globToRegExp('node_modules'));
  assertMatch('foo/bar', globToRegExp('foo/bar'));
  assertMatch('/a/foo/bar', globToRegExp('foo/bar'));
  assertMatch('foo/bar/b', globToRegExp('foo/bar'));
  assertMatch('.github', globToRegExp('.*'));
  assertMatch('.vscode/settings.json', globToRegExp('.*'));
  assertMatch('/foo/bar/.vscode/settings.json', globToRegExp('.*'));
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
