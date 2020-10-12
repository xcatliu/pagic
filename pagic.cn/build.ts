import { fs, path } from '../deps.ts';

const dirname = path.dirname(path.fromFileUrl(import.meta.url));

fs.copySync(path.resolve(dirname, '../pagic.org/zh-CN'), dirname, {
  overwrite: true
});
fs.copySync(path.resolve(dirname, 'index_cn.tsx'), path.resolve(dirname, 'index.tsx'), {
  overwrite: true
});
fs.copySync(path.resolve(dirname, '../pagic.org/assets'), path.resolve(dirname, 'assets'), {
  overwrite: true
});
