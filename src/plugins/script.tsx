import * as fs from 'https://deno.land/std@0.56.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.56.0/path/mod.ts';

// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

import reactElementToJSXString from 'https://dev.jspm.io/react-element-to-jsx-string@14.3.1';

import { ensureDirAndWriteFileStr, copyPagicFile, compile, compileFile, compilePagicFile } from '../utils/mod.ts';
import { PagicPlugin } from '../Pagic.ts';

const script: PagicPlugin = async (pagic) => {
  for (const pagePath of pagic.pagePaths) {
    let pageProps = pagic.pagePropsMap[pagePath];

    pageProps.script = (
      <>
        <script crossOrigin="anonymous" src="https://unpkg.com/react@16.13.1/umd/react.production.min.js" />
        <script crossOrigin="anonymous" src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" />
        <script type="module" src={`${pagic.config.base}main.js`} />
      </>
    );

    if (pagePath.endsWith('.tsx')) {
      const contentDest = path.resolve(pagic.config.publicDir, pageProps.outputPath.replace(/\.html$/, '_content.js'));
      const compileSrc = path.resolve(pagic.config.srcDir, pagePath);
      await ensureDirAndWriteFileStr(contentDest, await compileFile(compileSrc));
    }

    const propsDest = path.resolve(pagic.config.publicDir, pageProps.outputPath.replace(/\.html$/, '_props.js'));
    /** First is module name, second is module path */
    let importComponentList: [string, string][] = [];
    let propsCompileResult = compile(`
        export default {
          ${Object.keys(pageProps)
            .map((key) => {
              const value: any = pageProps[key];
              if (React.isValidElement(value)) {
                if (typeof value.type !== 'string' && typeof value.type.name !== 'undefined') {
                  const componentName = value.type.name;
                  const modulePath =
                    key === 'content'
                      ? `./${pageProps.outputPath.replace(/([^\/]+)\.html/, '$1_content.js')}`
                      : `${pagic.config.base}${componentName.replace(
                          /([A-Z])/g,
                          ($1: string) => `_${$1.toLowerCase()}`
                        )}.js`;
                  importComponentList.push([componentName, modulePath]);
                }
                return `'${key}': ${reactElementToJSXString.default(value)}`;
              } else {
                return `'${key}': ${JSON.stringify(value, null, 2)}`;
              }
            })
            .join(',\n')}
        }
      `);

    propsCompileResult = `${importComponentList
      .map(([componentName, modulePath]) => `import ${componentName} from '${modulePath}';`)
      .join('\n')}\n${propsCompileResult}`;

    await ensureDirAndWriteFileStr(propsDest, propsCompileResult);
  }

  for (const layoutPath of pagic.layoutPaths) {
    const layoutDest = path.resolve(pagic.config.publicDir, layoutPath.replace(/\.tsx$/, '.js'));
    const compileSrc = path.resolve(pagic.config.srcDir, layoutPath);
    if (await fs.exists(compileSrc)) {
      await ensureDirAndWriteFileStr(layoutDest, await compileFile(compileSrc));
    } else {
      await ensureDirAndWriteFileStr(
        layoutDest,
        await compilePagicFile(`src/themes/${pagic.config.theme}/${layoutPath}`)
      );
    }
  }

  const scriptMainDest = path.resolve(pagic.config.publicDir, 'main.js');
  await copyPagicFile('src/plugins/script_main.js', scriptMainDest);
};

script.insert = 'before:layout';

export default script;
