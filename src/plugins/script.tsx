import * as fs from 'https://deno.land/std@0.56.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.56.0/path/mod.ts';
import * as ts from 'https://dev.jspm.io/typescript@3.9.3';

// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

import { PagicPlugin } from '../Pagic.ts';

const script: PagicPlugin = async (pagic) => {
  for (const pagePath of pagic.pagePaths) {
    const pageProps = pagic.pagePropsMap[pagePath];

    pagic.pagePropsMap[pagePath] = {
      ...pageProps,
      script: <script type="module" src="/main.js" />
    };

    const contentPath = path.resolve(pagic.config.publicDir, pageProps.outputPath.replace(/\.html$/, '_content.js'));
    await fs.ensureDir(path.dirname(contentPath));

    if (pagePath.endsWith('.md')) {
      await fs.writeFileStr(
        contentPath,
        `
import React from 'https://dev.jspm.io/react@16.13.1';
export default function() {
  return React.createElement('${pageProps.content?.type}', ${JSON.stringify(pageProps.content?.props)})
};
`
      );
    } else if (pagePath.endsWith('.tsx')) {
      const pageContent = await fs.readFileStr(path.resolve(pagic.config.srcDir, pagePath));
      await fs.writeFileStr(
        contentPath,
        ts.default
          .transpileModule(pageContent, {
            compilerOptions: {
              target: 'ESNext',
              module: 'ESNext',
              jsx: 'React'
            }
          })
          .outputText.replace(/(^import .*)\.tsx((?:'|");?$)/gm, '$1.js$2')
      );
    }

    const propsPath = path.resolve(pagic.config.publicDir, pageProps.outputPath.replace(/\.html$/, '_props.js'));
    await fs.ensureDir(path.dirname(propsPath));
    await fs.writeFileStr(
      propsPath,
      `
import React from 'https://dev.jspm.io/react@16.13.1';
import ContentComponent from './${path.basename(pageProps.outputPath).replace(/\.html$/, '_content.js')}';
export default {
  ${Object.keys(omit(pageProps, ['content', 'script']))
    .map((key) => `'${key}': ${JSON.stringify(pageProps[key])}`)
    .join(',\n  ')},
  content: React.createElement(ContentComponent),
  script: React.createElement('script', { type: 'module', src: '/main.js' })
}
`
    );
  }

  for (const layoutPath of pagic.layoutPaths) {
    const scriptPath = path.resolve(pagic.config.publicDir, layoutPath.replace(/\.tsx$/, '.js'));
    const layoutContent = await fs.readFileStr(path.resolve(pagic.config.srcDir, layoutPath));
    await fs.ensureDir(path.dirname(scriptPath));
    await fs.writeFileStr(
      scriptPath,
      ts.default
        .transpileModule(layoutContent, {
          compilerOptions: {
            target: 'ESNext',
            module: 'ESNext',
            jsx: 'React'
          }
        })
        .outputText.replace(/(^import .*)\.tsx((?:'|");?$)/gm, '$1.js$2')
    );
  }

  const layoutMap = Object.values(pagic.pagePropsMap).reduce<any>((prev, { layoutPath, outputPath }) => {
    prev[outputPath] = layoutPath.replace(/\.tsx$/, '.js');
    return prev;
  }, {});
  const layoutMapPath = path.resolve(pagic.config.publicDir, 'layout_map.js');
  await fs.ensureDir(path.dirname(layoutMapPath));
  await fs.writeFileStr(layoutMapPath, `export default ${JSON.stringify(layoutMap, null, 2)}`);

  const mainScriptDestPath = path.resolve(pagic.config.publicDir, 'main.js');
  await fs.ensureDir(path.dirname(mainScriptDestPath));

  if (import.meta.url.startsWith('file://')) {
    const mainScriptSrcPath = path.resolve(path.dirname(path.fromFileUrl(import.meta.url)), 'script_main.js');
    await fs.copy(mainScriptSrcPath, mainScriptDestPath, {
      overwrite: true
    });
  } else {
    const res = await fetch(import.meta.url.replace(/script\.tsx$/, 'script_main.js'));
    const mainScriptText = await res.text();
    await fs.writeFileStr(mainScriptDestPath, mainScriptText);
  }
};

function omit(obj: any, keys: string[]) {
  let result: any = {};
  Object.keys(obj)
    .filter((key) => !keys.includes(key))
    .map((key) => {
      result[key] = obj[key];
    });
  return result;
}

script.insert = 'before:layout';

export default script;
