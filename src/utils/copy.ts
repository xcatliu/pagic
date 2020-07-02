import { fs, path, colors } from '../deps.ts';

import { pagicRootPath, log } from './common.ts';

export async function ensureDirAndWriteFileStr(filename: string, content: string) {
  log.success('Write', filename);
  await fs.ensureDir(path.dirname(filename));
  await fs.writeFileStr(filename, content);
}
export async function ensureDirAndCopy(src: string, dest: string, options?: fs.CopyOptions) {
  log.success('Copy', src);
  await fs.ensureDir(path.dirname(dest));
  await fs.copy(src, dest, options);
}
export async function copyPagicFile(pathToPagicRoot: string, dest: string) {
  log.success('Copy pagic file', pathToPagicRoot);
  if (import.meta.url.startsWith('file://')) {
    const src = `${pagicRootPath}${pathToPagicRoot}`;
    await ensureDirAndCopy(src, dest, { overwrite: true });
  } else {
    const res = await fetch(`${pagicRootPath}${pathToPagicRoot}`);
    await fs.ensureDir(path.dirname(dest));
    // https://stackoverflow.com/q/61945050/2777142
    const file = await Deno.open(dest, { create: true, write: true });
    await Deno.writeAll(file, new Uint8Array(await res.arrayBuffer()));
  }
}
