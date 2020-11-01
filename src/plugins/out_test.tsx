import { asserts, React, fs } from '../../deps.ts';
// @deno-types="../types/any.d.ts"
import Helmet from 'https://cdn.pagic.org/react-helmet@6.1.0/esnext/react-helmet.js';

import Pagic from '../Pagic.ts';
import out from './out.tsx';

// Empty test/fixtures/test_out_dir before output files to it
fs.emptyDirSync('test/fixtures/test_out_dir');

Deno.test('[out] content is null', async () => {
  const pagic = new Pagic();
  pagic.config.srcDir = 'test/fixtures';
  pagic.config.outDir = 'test/fixtures/test_out_dir';
  pagic.pagePaths = ['not_exists.md'];
  pagic.pagePropsMap = {
    'not_exists.md': {
      config: pagic.config,
      pagePath: 'not_exists.md',
      layoutPath: '_layout.tsx',
      outputPath: 'not_exists.html',
      title: '',
      content: null,
      head: null,
      script: null
    }
  };
  asserts.assertThrowsAsync(() => out.fn(pagic), Error, 'content is null');
});

Deno.test('[out] helmet', async () => {
  const pagic = new Pagic();
  pagic.config.srcDir = 'test/fixtures';
  pagic.config.outDir = 'test/fixtures/test_out_dir';
  pagic.pagePaths = ['helmet.md'];
  pagic.pagePropsMap = {
    'helmet.md': {
      config: pagic.config,
      pagePath: 'helmet.md',
      layoutPath: '_layout.tsx',
      outputPath: 'helmet.html',
      title: '',
      content: (
        <html>
          <head>
            <Helmet>
              <meta charSet="utf-8" />
            </Helmet>
          </head>
        </html>
      ),
      head: null,
      script: null
    }
  };

  await out.fn(pagic);
  const destContent = await Deno.readTextFile('test/fixtures/test_out_dir/helmet.html');
  asserts.assertEquals(
    destContent,
    '<!doctype html><html data-reactroot=""><head>\n<meta data-react-helmet="true" charset="utf-8"/>\n<title data-react-helmet="true"></title>\n</head></html>'
  );
});

Deno.test('[out] staticPaths', async () => {
  const pagic = new Pagic();
  pagic.config.srcDir = 'test/fixtures';
  pagic.config.outDir = 'test/fixtures/test_out_dir';
  pagic.staticPaths = ['static_script.js'];

  await out.fn(pagic);
  const destContent = await Deno.readTextFile('test/fixtures/test_out_dir/static_script.js');
  asserts.assertEquals(destContent, "console.log('static_script');\n");
});

Deno.test('[out] writeFiles', async () => {
  const pagic = new Pagic();
  pagic.config.outDir = 'test/fixtures/test_out_dir';
  pagic.writeFiles = {
    'write_file.js': "console.log('write_file');\n"
  };

  await out.fn(pagic);
  const destContent = await Deno.readTextFile('test/fixtures/test_out_dir/write_file.js');
  asserts.assertEquals(destContent, "console.log('write_file');\n");
});
