import type { PagicPlugin } from '../Pagic.ts';

const blog: PagicPlugin = {
  name: 'blog',
  insert: 'after:tsx',
  fn: async (pagic) => {
    for (const pagePath of pagic.pagePaths) {
      const { outputPath } = pagic.pagePropsMap[pagePath];
      const configBlogPath = pagic.getConfig(pagePath).blog?.root ?? '/blog/';
      if (!configBlogPath) continue;

      pagic.pagePropsMap[pagePath].blog = {
        isPost: `/${pagePath}`.startsWith(configBlogPath) && !`/${outputPath}`.endsWith('/index.html'),
        isPosts: `/${pagePath}`.startsWith(configBlogPath) && `/${outputPath}`.endsWith('/index.html'),
        posts: Object.values(pagic.pagePropsMap)
          .filter(
            ({ pagePath, outputPath, date, updated }) =>
              `/${pagePath}`.startsWith(configBlogPath) &&
              !`/${outputPath}`.endsWith('/index.html') &&
              typeof date !== 'undefined' &&
              typeof updated !== 'undefined'
          )
          .map(({ pagePath, title, outputPath, date, updated }) => ({
            pagePath,
            title,
            link: outputPath,
            date: date!,
            updated: updated!
          }))
          .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
      };
    }
  }
};

export default blog;
