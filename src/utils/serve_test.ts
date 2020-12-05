import { asserts } from '../../deps.ts';

import { serve } from './serve.ts';

Deno.test('[serve]', async () => {
  const server = serve({
    serveDir: 'test/fixtures',
    port: 8000,
  });
  const no_toc = await fetch('http://127.0.0.1:8000/no_toc.md');
  asserts.assertEquals(await no_toc.text(), 'foo\n');
  const not_found = await fetch('http://127.0.0.1:8000/not_found');
  asserts.assertEquals(await not_found.status, 404);
  asserts.assertEquals(await not_found.text(), 'Not found');
  server.close();
});

Deno.test('[serve] root option', async () => {
  const server = serve({
    serveDir: 'test/fixtures',
    root: '/foo/',
    port: 8000,
  });
  const no_toc = await fetch('http://127.0.0.1:8000/foo/no_toc.md');
  asserts.assertEquals(await no_toc.text(), 'foo\n');
  server.close();
});
