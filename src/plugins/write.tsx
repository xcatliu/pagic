// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server.js';

import { PagicPlugin } from '../Pagic.ts';
import { path, ensureDirAndWriteFileStr } from '../utils/mod.ts';

const write: PagicPlugin = async (pagic) => {
  for (const pagePath of pagic.pagePaths) {
    const { outputPath, content } = pagic.pagePropsMap[pagePath];
    if (content === null) {
      throw new Error('content is null');
    }
    const fullFilePath = path.resolve(pagic.config.publicDir, outputPath);
    await ensureDirAndWriteFileStr(fullFilePath, ReactDOMServer.renderToString(content));
  }
};

export default write;
