# Blog

With the `blog` plugin and `blog` theme, Pagic can be used to write blogs.

```ts
export default {
  theme: 'blog',
  plugins: ['blog'],
};
```

## Configuration

The configuration of the blog is concentrated in the `blog` field of `pagic.config.ts`, and its configuration is as follows:

```ts {4-11}
export default {
  theme: 'blog',
  plugins: ['blog'],
  blog: {
    root: '/posts/',
    social: {
      github: 'xcatliu/blog',
      email: 'xcatliu@gmail.com',
      twitter: 'xcatliu',
    },
  },
};
```

Among them, `root` means the root directory where blog posts are stored, and its default value is `/posts/`, which means all pages under the `${srcDir}/posts/` directory (except `README.md`) will be recognized as blog posts. Note that its value should always start and end with a slash.

`social` means different social network accounts, which will be displayed in the navigation bar of the blog.

The effect can be seen in the [Xcatliu's Blog](https://blog.xcatliu.com/).

### Navigation

The navigation of the blog will display the contents of `title`, `description`, `blog.social` and `nav`.

```ts {4-5,14-45}
export default {
  theme: 'blog',
  plugins: ['blog'],
  title: "Xcatliu's Blog",
  description: 'Welcome to my blog, where I have collected my technical articles and life insights.',
  blog: {
    root: '/posts/',
    social: {
      github: 'xcatliu/blog',
      email: 'xcatliu@gmail.com',
      twitter: 'xcatliu',
    },
  },
  nav: [
    {
      text: 'Homepage',
      link: '/',
      icon: 'czs-home-l',
    },
    {
      text: 'Categories',
      link: '/categories/',
      icon: 'czs-category-l',
    },
    {
      text: 'Tags',
      link: '/tags/',
      icon: 'czs-tag-l',
    },
    {
      text: 'About',
      link: '/about/',
      icon: 'czs-about-l',
    },
    {
      text: 'Archives',
      link: '/archives/',
      icon: 'czs-box-l',
    },
    {
      text: 'Friends',
      link: '/links/',
      icon: 'czs-link-l',
    },
  ],
};
```

The above blog configuration applies to the official `blog` theme, and the configuration of third-party themes may be different.

## Posts

The `blog` plugin will scan all the articles in the `/posts/` directory and sort them according to the date they were created. These articles will be regarded as a special kind of pages, that is, posts.

### Categories and tags

Blog posts have two special header information, `categories` and `tags`, their values ​​are both string arrays:

```md
---
categories:
  - Programming
tags:
  - Code quality
  - Code complexity
---

# Blog title

Content of the blog
```

All blog posts will be clustered according to their categories and tags, and then a `/categories/${categoriyName}/index.html` or `/tags/${tagName}/index.html` will be generated for each category or tag.

In addition, you may also need a `/categories/index.html` page to display all categories. To generate this page, you need to create a `categories/README.md`, which only needs to contain a title:

```md
# Categories
```

Similarly, in order to generate a `/tags/index.html` page, you need to create a `tags/README.md`, which only needs to include a title:

```md
# Tags
```

### Archives

The archives page is also a common page in the blog system, which displays all blog posts in the form of a list.

To create an archives page, you need to create an `archives/README.md`:

```md
# Archive
```

## Write a blog theme

Writing a blog theme is similar to writing a normal theme, except that there is one more `props`.

### `props`

The blog theme has an additional `prop` named `blog`, and its type is as follows:

```ts
interface PagePropsBlog {
  isPost: boolean;
  posts: {
    pagePath: string;
    title: string;
    link: string;
    date: Date | string;
    updated: Date | string;
    author?: string;
    contributors: string[];
    tags?: string[];
    categories?: string[];
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
```

Among them, `isPost` indicates whether the current page is a blog post.

`posts` means a list of all blog posts, but only contains information such as title, link, excerpt, etc., which are used to easily generate a list of posts page.

`categories` and `tags` are the categories and tag lists of the entire site, used to generate the `/categories/index.html` page and the `/tags/index.html` page.

Note that when writing a blog theme, you also need to create the following `_layout.tsx`:

- `archives/_layout.tsx` is used to display archives
- `categories/_layout.tsx` is used to display the list of categories
- `tags/_layout.tsx` is used to display the list of tags
- `posts/_layout.tsx` is used to display a list of posts (including excerpt)

For details, please refer to [official blog theme](https://github.com/xcatliu/pagic/tree/master/src/themes/blog).
