import { fs, path, React } from '../../deps.ts';

import {
  copyPagicFile,
  compile,
  compileFile,
  compilePagicFile,
  reactElementToJSXString,
  replaceExt,
  underlineToPascal,
  pick
} from '../utils/mod.ts';
import Pagic, { PagicPlugin } from '../Pagic.ts';

const script: PagicPlugin = {
  name: 'script',
  fn: async (pagic) => {
    for (const pagePath of pagic.pagePaths) {
      let pageProps = pagic.pagePropsMap[pagePath];

      pageProps.script = (
        <>
          <script crossOrigin="anonymous" src="https://unpkg.com/react@16.13.1/umd/react.production.min.js" />
          <script crossOrigin="anonymous" src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" />
          <script type="module" src={`${pagic.config.root}index.js`} />
        </>
      );

      if (pagePath.endsWith('.tsx')) {
        const contentDest = replaceExt(pageProps.outputPath, '_content.js');
        const compileSrc = path.resolve(pagic.config.srcDir, pagePath);
        pagic.writeFiles[contentDest] = await compileFile(compileSrc);
      }

      /** First is module name, second is module path */
      let importComponentList: [string, string][] = [];
      let propsCompileResult = compile(`
        export default {
          ${Object.keys(pageProps)
            .map((key) => {
              const value: any = pageProps[key];
              if (key === 'config') {
                importComponentList.push(['projectConfig', `${pagic.config.root}pagic.config.js`]);
                return `config: { ${JSON.stringify(pick(Pagic.defaultConfig, ['root'])).slice(
                  1,
                  -1
                )}, ...projectConfig, ...projectConfig.i18n?.overrides?.['${pageProps.language}'] }`;
              } else if (React.isValidElement(value)) {
                if (typeof value.type !== 'string' && typeof value.type.name !== 'undefined') {
                  const componentName = value.type.name;
                  let modulePath: string;
                  if (underlineToPascal(`_${key}`) === componentName) {
                    modulePath = `${pagic.config.root}_${key}.js`;
                  } else {
                    modulePath = `./${replaceExt(path.basename(pageProps.outputPath), `_${key}.js`)}`;
                  }
                  importComponentList.push([componentName, modulePath]);
                }
                return `'${key}': ${reactElementToJSXString(value)}`;
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

      const propsDest = replaceExt(pageProps.outputPath, '_props.js');
      pagic.writeFiles[propsDest] = propsCompileResult;
    }

    if (pagic.rebuilding) {
      for (const layoutPath of pagic.layoutPaths) {
        const layoutDest = replaceExt(layoutPath, '.js');
        const compileSrc = path.resolve(pagic.config.srcDir, layoutPath);
        if (await fs.exists(compileSrc)) {
          pagic.writeFiles[layoutDest] = await compileFile(compileSrc);
        } else {
          pagic.writeFiles[layoutDest] = await compilePagicFile(`src/themes/${pagic.config.theme}/${layoutPath}`);
        }
      }

      pagic.writeFiles['pagic.config.js'] = await compileFile(pagic.pagicConfigPath);

      const scriptIndexDest = path.resolve(pagic.config.outDir, 'index.js');
      await copyPagicFile('src/plugins/script_index.js', scriptIndexDest);
    }
  }
};

export default script;
