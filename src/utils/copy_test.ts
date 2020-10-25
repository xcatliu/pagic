import { asserts, fs } from '../../deps.ts';

import { ensureDirAndWriteTextFile, ensureDirAndCopy, copyPagicFile, download } from './copy.ts';

// Empty test/fixtures/test_copy_dir before copy files
fs.emptyDirSync('test/fixtures/test_copy_dir');

Deno.test('[ensureDirAndWriteTextFile]', async () => {
  await ensureDirAndWriteTextFile('test/fixtures/test_copy_dir/sub_dir/hello.md', '# Hello');
  const destContent = await Deno.readTextFile('test/fixtures/test_copy_dir/sub_dir/hello.md');
  asserts.assertEquals(destContent, '# Hello');
});

Deno.test('[ensureDirAndCopy]', async () => {
  await ensureDirAndCopy('test/fixtures/no_toc.md', 'test/fixtures/test_copy_dir/sub_dir2/no_toc.md');
  const srcContent = await Deno.readTextFile('test/fixtures/no_toc.md');
  const destContent = await Deno.readTextFile('test/fixtures/test_copy_dir/sub_dir2/no_toc.md');
  asserts.assertEquals(destContent, srcContent);
});

Deno.test('[copyPagicFile]', async () => {
  await copyPagicFile('src/plugins/script_index.js', 'test/fixtures/test_copy_dir/index.js');
  const fileExists = await fs.exists('test/fixtures/test_copy_dir/index.js');
  asserts.assert(fileExists);
});

Deno.test('[download]', async () => {
  await download('https://cdn.pagic.org/lodash@4.17.20/esnext/throttle.js', 'test/fixtures/test_copy_dir/throttle.js');
  const fileExists = await fs.exists('test/fixtures/test_copy_dir/throttle.js');
  asserts.assert(fileExists);
});
