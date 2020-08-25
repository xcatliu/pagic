import { path } from '../../deps.ts';

import { pagicRootPath } from './filepath.ts';
import { PagicPlugin, PagicThemeConfig } from '../Pagic.ts';

const importCache: {
  [importPath: string]: any;
} = {};

interface ImportOptions {
  reload?: boolean;
}

/** Import pagic mod default */
export async function importPagicModDefault<T = any>(pathToPagicRoot: string, options: ImportOptions = {}): Promise<T> {
  const mod = await importPagicMod<{ default: T }>(pathToPagicRoot, options);
  return mod.default;
}
/** Import pagic mod */
export async function importPagicMod<T = any>(pathToPagicRoot: string, options: ImportOptions = {}): Promise<T> {
  const mod = await import_<T>(`${pagicRootPath}/${pathToPagicRoot}`, options);
  return mod;
}
/** Import plugin */
export async function importPlugin(pluginName: string) {
  if (/^https?:\/\//.test(pluginName)) {
    return await importDefault<PagicPlugin>(pluginName);
  } else {
    return await importPagicModDefault<PagicPlugin>(`src/plugins/${pluginName}.tsx`);
  }
}
/** Import theme or themeFile */
export async function importTheme(theme: string, themeFile?: string) {
  if (/^https?:\/\//.test(theme)) {
    return await importDefault<PagicThemeConfig>(themeFile ? theme.replace(/\/[^\/]+$/, `/${themeFile}`) : theme);
  } else {
    return await importPagicModDefault<PagicThemeConfig>(`src/themes/${theme}/${themeFile ?? 'mod.ts'}`);
  }
}
/** Replacement of dynamic import default */
export async function importDefault<T = any>(importPath: string, options: ImportOptions = {}): Promise<T> {
  const mod = await import_<{ default: T }>(importPath, options);
  return mod.default;
}
/** Replacement of dynamic import, enable cache by default, support reload options */
export async function import_<T = any>(importPath: string, options: ImportOptions = {}): Promise<T> {
  let finalImportPath = importPath;
  if (finalImportPath.startsWith('/') || finalImportPath.substr(1, 1) === ':') {
    finalImportPath = `file://${finalImportPath}`;
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

  let mod = await import(`${finalImportPath}${versionQuery}`);

  importCache[finalImportPath] = mod;
  return mod;
}
