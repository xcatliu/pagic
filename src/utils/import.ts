import { path } from '../deps.ts';

const importCache: {
  [importPath: string]: any;
} = {};

interface ImportOptions {
  base?: string;
  reload?: boolean;
}

export async function importDefault<T = any>(importPath: string, options: ImportOptions = {}): Promise<T> {
  const mod = await import_<{ default: T }>(importPath, options);
  return mod.default;
}

export async function import_<T = any>(importPath: string, options: ImportOptions = {}): Promise<T> {
  let finalImportPath = importPath;
  if (options.base) {
    let urlBase: URL;
    if (options.base.startsWith('/')) {
      urlBase = new URL(`file://${options.base}`);
    } else {
      urlBase = new URL(options.base);
    }
    urlBase.pathname = path.resolve(urlBase.pathname, importPath);
    finalImportPath = urlBase.toString();
  }

  if (!options.reload) {
    if (importCache[finalImportPath]) {
      return importCache[finalImportPath];
    }
  }

  let versionQuery = '';
  if (options.reload) {
    versionQuery = `?version=${Math.random().toString().slice(2)}${path.extname(importPath)}`;
  }

  if (finalImportPath.startsWith('/')) {
    finalImportPath = `file://${finalImportPath}`;
  }

  let mod = await import(`${finalImportPath}${versionQuery}`);

  importCache[finalImportPath] = mod;
  return mod;
}
