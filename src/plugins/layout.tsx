import * as path from 'https://deno.land/std@0.51.0/path/mod.ts';

// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { PagicPlugin } from '../Pagic.ts';

const layout: PagicPlugin = async (ctx) => {
  const fullLayoutPath = path.resolve(ctx.config.srcDir, ctx.layoutPath);
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Layout = (await import(`file://${fullLayoutPath}`)).default;
  return {
    ...ctx,
    content: <Layout {...ctx} />
  };
};

export default layout;
