import { fs, path, React, reactElementToJSXString } from '../../deps.ts';

import {
  copyPagicFile,
  compile,
  compileFile,
  compilePagicFile,
  replaceExt,
  pascalToUnderline,
  pick,
} from '../utils/mod.ts';
import type { PagicPlugin } from '../Pagic.ts';
// eslint-disable-next-line no-duplicate-imports
import Pagic from '../Pagic.ts';

const script: PagicPlugin = {
  name: 'script',
  fn: async (pagic) => {
    for (const pagePath of pagic.pagePaths) {
      let pageProps = pagic.pagePropsMap[pagePath];

      pageProps.script = (
        <>
          <script src="https://cdn.pagic.org/react@18.2.0/umd/react.production.min.js" />
          <script src="https://cdn.pagic.org/react-dom@18.2.0/umd/react-dom.production.min.js" />
          <script type="module" src={`${pagic.config.root}index.js`} />
        </>
      );

      if (pagePath.endsWith('.tsx')) {
        const contentDest = replaceExt(pageProps.outputPath, '_content.js');
        const compileSrc = path.resolve(pagic.config.srcDir, pagePath);
        pagic.writeFiles[contentDest] = await compileFile(compileSrc);
      }

      let importComponentList: Record<string, string> = {};
      let propsCompileResult = compile(`
        export default {
          ${Object.keys(pageProps)
            .map((key) => {
              const value: any = pageProps[key];
              if (key === 'config') {
                importComponentList.projectConfig = `${pagic.config.root}pagic.config.js`;
                return `config: { ${JSON.stringify(pick(Pagic.defaultConfig, ['root'])).slice(
                  1,
                  -1,
                )}, ...projectConfig${
                  pageProps.language?.code ? `, ...projectConfig.i18n?.overrides?.['${pageProps.language?.code}']` : ''
                }, branch: '${value.branch}' }`;
              } else if (key === 'content') {
                if (value === null) {
                  return `'${key}': null`;
                }
                const element = value;
                if (typeof element.type === 'function' && element.type.name !== '') {
                  const componentName = element.type.name;
                  const modulePath = `./${replaceExt(path.basename(pageProps.outputPath), `_content.js`)}`;
                  importComponentList[componentName] = modulePath;
                }
                return `'${key}': ${reactElementToJSXString(value)}`;
              } else if (React.isValidElement(value)) {
                traverseElement(value);
                // eslint-disable-next-line no-inner-declarations
                function traverseElement(element?: React.ReactElement) {
                  if (!element) return;
                  if (typeof element.type === 'function' && element.type.name !== '') {
                    const componentName = element.type.name;
                    const modulePath = `${pagic.config.root}${pascalToUnderline(componentName)}.js`;
                    importComponentList[componentName] = modulePath;
                  }
                  if (Array.isArray(element.props?.children)) {
                    element.props.children.forEach(traverseElement);
                  } else {
                    traverseElement(element.props?.children);
                  }
                }
                return `'${key}': ${reactElementToJSXString(value)}`;
              } else {
                return `'${key}': ${JSON.stringify(value, null, 2)}`;
              }
            })
            .join(',\n')}
        }
      `);

      propsCompileResult = `${Object.entries(importComponentList)
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
  },
};

export default script;
