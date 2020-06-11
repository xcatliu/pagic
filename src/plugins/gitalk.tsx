import * as path from 'https://deno.land/std@0.54.0/path/mod.ts';

// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { PagicPlugin } from '../Pagic.ts';

import Gitalk from './gitalk_component.tsx';

import { ensureDirAndWriteFileStr, compilePagicFile } from '../utils/mod.ts';

const gitalk: PagicPlugin = async (pagic) => {
  for (const pagePath of pagic.pagePaths) {
    const pageProps = pagic.pagePropsMap[pagePath];

    pagic.pagePropsMap[pagePath] = {
      ...pageProps,
      gitalk: <Gitalk {...pagic.config.gitalk} id={pageProps.outputPath} title={pageProps.title} />
    };
  }

  const gitalkDest = path.resolve(pagic.config.publicDir, '_gitalk.js');
  await ensureDirAndWriteFileStr(gitalkDest, await compilePagicFile('src/plugins/gitalk_component.tsx'));
};

gitalk.insert = 'before:script';

export default gitalk;
