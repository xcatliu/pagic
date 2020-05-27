import * as path from 'https://deno.land/std@0.51.0/path/mod.ts';
import * as fs from 'https://deno.land/std@0.51.0/fs/mod.ts';
import { green } from 'https://deno.land/std@0.51.0/fmt/colors.ts';

// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server.js';
import { PagicPlugin } from '../Pagic.ts';

const write: PagicPlugin = async (pagic) => {
  for (const pagePath of pagic.pagePaths) {
    console.log(green('Write'), pagePath);
    const { outputPath, content } = pagic.pagePropsMap[pagePath];
    if (content === null) {
      throw new Error('content is null');
    }
    const fullFilePath = path.resolve(pagic.config.publicDir, outputPath);
    await fs.ensureDir(path.dirname(fullFilePath));
    await fs.writeFileStr(fullFilePath, ReactDOMServer.renderToStaticMarkup(content));
  }
};

export default write;
