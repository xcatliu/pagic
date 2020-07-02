import { path } from '../deps.ts';
// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server.js';
import ReactHelmet from 'https://dev.jspm.io/react-helmet@6.1.0';
const { Helmet } = ReactHelmet;

import { PagicPlugin } from '../Pagic.ts';
import { ensureDirAndWriteFileStr } from '../utils.ts';

const write: PagicPlugin = async (pagic) => {
  for (const pagePath of pagic.pagePaths) {
    const { outputPath, content } = pagic.pagePropsMap[pagePath];
    if (content === null) {
      throw new Error('content is null');
    }
    const fullFilePath = path.resolve(pagic.config.publicDir, outputPath);
    let htmlString = ReactDOMServer.renderToString(content);
    const helmet = Helmet.renderStatic();
    const helmetString = ['meta', 'title', 'base', 'style', 'link', 'noscript', 'script']
      .map((key) => helmet[key].toString())
      .filter((str) => str !== '')
      .join('\n');
    if (helmetString !== '') {
      htmlString = '<!doctype html>' + htmlString.replace('</head>', `\n${helmetString}\n</head>`);
    }
    await ensureDirAndWriteFileStr(fullFilePath, htmlString);
  }
};

export default write;
