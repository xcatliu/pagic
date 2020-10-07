import { asserts, path } from '../../deps.ts';

import { import_, importDefault, importPlugin, importTheme, importPagicMod, importPagicModDefault } from './import.ts';

Deno.test('[import_]', async () => {
  const output = await import_(path.resolve(Deno.cwd(), 'test/fixtures/test_export.ts'));
  asserts.assertEquals(output.foo, 1);
});
Deno.test('[importDefaul]', async () => {
  const output = await importDefault(path.resolve(Deno.cwd(), 'test/fixtures/test_export.ts'));
  asserts.assertEquals(output, 'Hello');
});
Deno.test('[importPlugin]', async () => {
  const init = await importPlugin('init');
  asserts.assertEquals(init.name, 'init');
});
Deno.test('[importTheme]', async () => {
  const themeMod = await importTheme('default');
  asserts.assertEquals(Array.isArray(themeMod.files), true);
});
Deno.test('[importTheme] _layout.tsx', async () => {
  const Layout = await importTheme('default', '_layout.tsx');
  asserts.assertEquals(Layout instanceof Function, true);
});
Deno.test('[importPagicMod]', async () => {
  const output = await importPagicMod('test/fixtures/test_export.ts');
  asserts.assertEquals(output.foo, 1);
});
Deno.test('[importPagicModDefault]', async () => {
  const output = await importPagicModDefault('test/fixtures/test_export.ts');
  asserts.assertEquals(output, 'Hello');
});
