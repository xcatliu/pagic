import * as path from 'https://deno.land/std@0.56.0/path/mod.ts';

const importCache: {
  [importPath: string]: any;
} = {};

interface ImportOptions {
  base?: string;
  tryExt?: string;
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

  let mod: any;
  try {
    mod = await import(`${finalImportPath}${versionQuery}`);
  } catch (e) {
    if (options.tryExt) {
      finalImportPath = finalImportPath.replace(/\.[^\.]+$/, `.${options.tryExt}`);
      if (options.reload) {
        versionQuery = `?version=${Math.random().toString().slice(2)}.${options.tryExt}`;
      }
      mod = await import(`${finalImportPath}${versionQuery}`);
    } else {
      throw e;
    }
  }

  importCache[finalImportPath] = mod;
  return mod;
}
