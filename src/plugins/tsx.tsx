import * as path from 'https://deno.land/std@0.51.0/path/mod.ts';

// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { PagicPlugin } from '../Pagic.ts';

const tsx: PagicPlugin = async (pagic) => {
  for (const pagePath of pagic.pagePaths.filter((pagePath) => pagePath.endsWith('.tsx'))) {
    const pageProps = pagic.pagePropsMap[pagePath];
    const fullPagePath = path.resolve(pagic.config.srcDir, pagePath);
    const { default: ContentComponent, frontMatter } = await import(
      `file://${fullPagePath}?version=${pagic.randomVersion}.tsx`
    );

    pagic.pagePropsMap[pagePath] = {
      ...pageProps,
      content: <ContentComponent />,
      ...frontMatter
    };
  }
};

export default tsx;
