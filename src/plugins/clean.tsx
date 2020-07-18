import { colors, fs } from '../deps.ts';

import { PagicPlugin } from '../Pagic.ts';
import { logger } from '../utils/mod.ts';

/** Clean outDir */
const clean: PagicPlugin = {
  name: 'clean',
  fn: async (pagic) => {
    if (typeof pagic.rebuilding === 'undefined' || pagic.rebuilding === true) {
      logger.success('Clean', colors.underline(pagic.config.outDir));
      await fs.emptyDir(pagic.config.outDir);
    }
  }
};

export default clean;
