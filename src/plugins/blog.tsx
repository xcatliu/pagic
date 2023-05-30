import type { PagicPlugin } from '../Pagic.ts';

export interface PagePropsBlog {
  isPost: boolean;
  posts: {
    pagePath: string;
    title: string;
    link: string;
    date: Date | string;
    updated: Date | string;
    author?: string;
    contributors: string[];
    categories?: string[];
    tags?: string[];
    excerpt?: string;
    cover?: string;
  }[];
  categories: {
    name: string;
    count: number;
  }[];
  tags: {
    name: string;
    count: number;
  }[];
}

const blog: PagicPlugin = {
  name: 'blog',
  insert: 'after:tsx',
  fn: async (pagic) => {
    for (const pagePath of pagic.pagePaths) {
      const { outputPath, blog } = pagic.pagePropsMap[pagePath];
      if (typeof blog !== 'undefined') continue;
      const configBlogPath = pagic.getConfig(pagePath).blog?.root ?? '/posts/';
      if (!configBlogPath) continue;

      const posts = Object.values(pagic.pagePropsMap)
        .filter(
          ({ pagePath, outputPath, date, updated }) =>
            `/${pagePath}`.startsWith(configBlogPath) &&
            !`/${outputPath}`.endsWith('/index.html') &&
            typeof date !== 'undefined' &&
            typeof updated !== 'undefined',
        )
        .map(
          ({ pagePath, title, outputPath, date, updated, author, contributors, categories, tags, excerpt, cover }) => ({
            pagePath,
            title,
            link: outputPath,
            date: date!,
            updated: updated!,
            author,
            contributors: contributors!,
            categories,
            tags,
            excerpt,
            cover,
          }),
        )
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

      const categories = posts
        .reduce<
          {
            name: string;
            count: number;
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
              });
            }
          });
          return prev;
        }, [])
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1))
        .sort((a, b) => b.count - a.count);

      const tags = posts
        .reduce<
          {
            name: string;
            count: number;
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
              });
            }
          });
          return prev;
        }, [])
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1))
        .sort((a, b) => b.count - a.count);

      categories.forEach(({ name }) => {
        const pagePath = `categories/${name}/`;
        if (pagic.pagePaths.includes(pagePath)) {
          return;
        }
        pagic.pagePaths.push(pagePath);
        pagic.pagePropsMap[pagePath] = {
          config: pagic.config,
          pagePath,
          layoutPath: 'archives/_layout.tsx',
          outputPath: `${pagePath}index.html`,
          head: null,
          script: null,
          footer: pagic.config.footer ?? null,
          title: name,
          content: null,
          blog: {
            isPost: false,
            posts: posts.filter(({ pagePath }) => pagic.pagePropsMap[pagePath].categories?.includes(name)),
            categories,
            tags,
          },
        };
      });

      tags.forEach(({ name }) => {
        const pagePath = `tags/${name}/`;
        if (pagic.pagePaths.includes(pagePath)) {
          return;
        }
        pagic.pagePaths.push(pagePath);
        pagic.pagePropsMap[pagePath] = {
          config: pagic.config,
          pagePath,
          layoutPath: 'archives/_layout.tsx',
          outputPath: `${pagePath}index.html`,
          head: null,
          script: null,
          footer: pagic.config.footer ?? null,
          title: name,
          content: null,
          blog: {
            isPost: false,
            posts: posts.filter(({ pagePath }) => pagic.pagePropsMap[pagePath].tags?.includes(name)),
            categories,
            tags,
          },
        };
      });

      pagic.pagePropsMap[pagePath].blog = {
        isPost: `/${pagePath}`.startsWith(configBlogPath) && !`/${outputPath}`.endsWith('/index.html'),
        posts,
        categories,
        tags,
      };
    }
  },
};

export default blog;
