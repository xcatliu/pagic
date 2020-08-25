import { fs, path } from '../../deps.ts';

import { logger } from './common.ts';
import { pagicRootPath } from './filepath.ts';

export async function ensureDirAndWriteFileStr(filename: string, content: string) {
  logger.success('Write', filename);
  await fs.ensureDir(path.dirname(filename));
  await Deno.writeTextFile(filename, content);
}
export async function ensureDirAndCopy(src: string, dest: string, options?: fs.CopyOptions) {
  logger.success('Copy', src);
  await fs.ensureDir(path.dirname(dest));
  await fs.copy(src, dest, options);
}
export async function copyPagicFile(pathToPagicRoot: string, dest: string) {
  logger.success('Copy pagic file', pathToPagicRoot);
  const src = `${pagicRootPath}/${pathToPagicRoot}`;
  if (import.meta.url.startsWith('file://')) {
    await ensureDirAndCopy(src, dest, { overwrite: true });
  } else {
    await download(src, dest);
  }
}
export async function download(httpPath: string, dest: string) {
  logger.success('Download file', httpPath);
  const res = await fetch(httpPath);
  await fs.ensureDir(path.dirname(dest));
  // https://stackoverflow.com/q/61945050/2777142
  const file = await Deno.open(dest, { create: true, write: true });
  await Deno.writeAll(file, new Uint8Array(await res.arrayBuffer()));
}
