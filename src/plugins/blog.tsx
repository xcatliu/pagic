import type { PagicPlugin } from '../Pagic.ts';

const blog: PagicPlugin = {
  name: 'blog',
  insert: 'after:tsx',
  fn: async (pagic) => {
    for (const pagePath of pagic.pagePaths) {
      const { outputPath } = pagic.pagePropsMap[pagePath];
      const configBlogPath = pagic.getConfig(pagePath).blog.path;

      pagic.pagePropsMap[pagePath].blog = {
        isPost: pagePath.startsWith(configBlogPath) && !`/${outputPath}`.endsWith('/index.html'),
        isPosts: pagePath.startsWith(configBlogPath) && `/${outputPath}`.endsWith('/index.html'),
        posts: Object.values(pagic.pagePropsMap)
          .filter(
            ({ pagePath, outputPath }) =>
              pagePath.startsWith(configBlogPath) && !`/${outputPath}`.endsWith('/index.html')
          )
          .map(({ pagePath, title, outputPath, date, updated }) => ({
            pagePath,
            title,
            link: outputPath,
            date,
            updated
          }))
          .sort((a, b) => b.date - a.date)
      };
    }
  }
};

export default blog;
