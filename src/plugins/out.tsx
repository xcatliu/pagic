import { fs, path } from '../deps.ts';
// @deno-types="https://deno.land/x/pagic@v0.8.3/src/types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server.js';
import ReactHelmet from 'https://dev.jspm.io/react-helmet@6.1.0';
const { Helmet } = ReactHelmet;

import { PagicPlugin } from '../Pagic.ts';
import { ensureDirAndWriteFileStr, ensureDirAndCopy, copyPagicFile, download } from '../utils/mod.ts';

const out: PagicPlugin = {
  name: 'out',
  fn: async (pagic) => {
    for (const pagePath of pagic.pagePaths) {
      const { outputPath, content } = pagic.pagePropsMap[pagePath];
      if (content === null) {
        throw new Error('content is null');
      }
      const fullFilePath = path.resolve(pagic.config.outDir, outputPath);
      let htmlString = ReactDOMServer.renderToString(content);
      const helmet = Helmet.renderStatic();
      const helmetString = ['meta', 'title', 'base', 'style', 'link', 'noscript', 'script']
        .map((key) => helmet[key].toString())
        .filter((str) => str !== '')
        .join('\n');

      htmlString = `<!doctype html>${htmlString}`;
      // helmet not empty
      if (helmetString !== '<title data-react-helmet="true"></title>') {
        htmlString = htmlString.replace('</head>', `\n${helmetString}\n</head>`);
      }
      await ensureDirAndWriteFileStr(fullFilePath, htmlString);
    }

    for (const staticPath of pagic.staticPaths) {
      const src = path.resolve(pagic.config.srcDir, staticPath);
      const dest = path.resolve(pagic.config.outDir, staticPath);
      if (await fs.exists(src)) {
        await ensureDirAndCopy(src, dest, { overwrite: true });
      } else {
        if (/^https?:\/\//.test(pagic.config.theme)) {
          await download(pagic.config.theme.replace(/\/[^\/]+$/, `/${staticPath}`), dest);
        } else {
          await copyPagicFile(`src/themes/${pagic.config.theme}/${staticPath}`, dest);
        }
      }
    }

    for (const [filePath, content] of Object.entries(pagic.writeFiles)) {
      const fullFilePath = path.resolve(pagic.config.outDir, filePath);
      await ensureDirAndWriteFileStr(fullFilePath, content);
    }
  }
};

export default out;
