import type { PagicPlugin } from '../Pagic.ts';

const blog: PagicPlugin = {
  name: 'blog',
  insert: 'after:tsx',
  fn: async (pagic) => {
    let tagPathPrefix = '';
    let categoriesPathPrefix = '';
    for (const pagePath of pagic.pagePaths) {
      const { layoutPath, outputPath } = pagic.pagePropsMap[pagePath];
      if (layoutPath === 'tags/_layout.tsx') {
        tagPathPrefix = outputPath.replace(/index\.html$/, '');
      } else if (layoutPath === 'categories/_layout.tsx') {
        categoriesPathPrefix = outputPath.replace(/index\.html$/, '');
      }
    }

    for (const pagePath of pagic.pagePaths) {
      const { outputPath, blog } = pagic.pagePropsMap[pagePath];
      if (typeof blog !== 'undefined') continue;
      const configBlogPath = pagic.getConfig(pagePath).blog?.root ?? '/blog/';
      if (!configBlogPath) continue;

      const posts = Object.values(pagic.pagePropsMap)
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
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

      const tags = posts
        .reduce<
          {
            name: string;
            count: number;
            link: string;
          }[]
        >((prev, { pagePath }) => {
          const pageTags = pagic.pagePropsMap[pagePath].tags ?? [];
          pageTags.forEach((tagName) => {
            const tag = prev.find(({ name }) => name === tagName);
            if (typeof tag !== 'undefined') {
              tag.count += 1;
            } else {
              prev.push({
                name: tagName,
                count: 1,
                link: `${tagPathPrefix}${tagName}/`
              });
            }
          });
          return prev;
        }, [])
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1))
        .sort((a, b) => b.count - a.count);

      const categories = posts
        .reduce<
          {
            name: string;
            count: number;
            link: string;
          }[]
        >((prev, { pagePath }) => {
          const pageCategories = pagic.pagePropsMap[pagePath].categories ?? [];
          pageCategories.forEach((categoryName) => {
            const category = prev.find(({ name }) => name === categoryName);
            if (typeof category !== 'undefined') {
              category.count += 1;
            } else {
              prev.push({
                name: categoryName,
                count: 1,
                link: `${categoriesPathPrefix}${categoryName}/`
              });
            }
          });
          return prev;
        }, [])
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1))
        .sort((a, b) => b.count - a.count);

      tags.forEach(({ name, link }) => {
        if (pagic.pagePaths.includes(link)) {
          return;
        }
        pagic.pagePaths.push(link);
        pagic.pagePropsMap[link] = {
          config: pagic.config,
          pagePath: link,
          layoutPath: 'posts/_layout.tsx',
          outputPath: `${link}index.html`,
          head: null,
          script: null,
          title: name,
          content: null,
          blog: {
            isPost: false,
            posts: posts.filter(({ pagePath }) => pagic.pagePropsMap[pagePath].tags?.includes(name)),
            tags,
            categories
          }
        };
      });

      categories.forEach(({ name, link }) => {
        pagic.pagePaths.push(link);
        pagic.pagePropsMap[link] = {
          config: pagic.config,
          pagePath: link,
          layoutPath: 'posts/_layout.tsx',
          outputPath: `${link}index.html`,
          head: null,
          script: null,
          title: name,
          content: null,
          blog: {
            isPost: false,
            posts: posts.filter(({ pagePath }) => pagic.pagePropsMap[pagePath].categories?.includes(name)),
            tags,
            categories
          }
        };
      });

      pagic.pagePropsMap[pagePath].blog = {
        isPost: `/${pagePath}`.startsWith(configBlogPath) && !`/${outputPath}`.endsWith('/index.html'),
        posts,
        tags,
        categories
      };
    }
  }
};

export default blog;
