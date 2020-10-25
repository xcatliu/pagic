import { asserts, fs } from '../../deps.ts';

import Pagic from '../Pagic.ts';
import clean from './clean.tsx';
import { ensureDirAndWriteTextFile } from '../utils/mod.ts';

Deno.test('[clean]', async () => {
  const pagic = new Pagic();
  pagic.config.outDir = 'test/fixtures/test_clean_dir';

  let exists = await fs.exists('test/fixtures/test_clean_dir/hello.md');
  asserts.assertEquals(exists, false);

  await ensureDirAndWriteTextFile('test/fixtures/test_clean_dir/hello.md', '# Hello');
  exists = await fs.exists('test/fixtures/test_clean_dir/hello.md');
  asserts.assert(exists);

  pagic.rebuilding = false;
  await clean.fn(pagic);
  exists = await fs.exists('test/fixtures/test_clean_dir/hello.md');
  asserts.assert(exists);

  pagic.rebuilding = true;
  await clean.fn(pagic);
  exists = await fs.exists('test/fixtures/test_clean_dir/hello.md');
  asserts.assertEquals(exists, false);
});
