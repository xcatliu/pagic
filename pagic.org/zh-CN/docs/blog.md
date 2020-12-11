# 博客

搭配 `blog` 插件与 `blog` 主题后，Pagic 可以用来写博客。

```ts
export default {
  theme: 'blog',
  plugins: ['blog'],
};
```

## 配置

博客的配置集中在 `pagic.config.ts` 的 `blog` 字段中，它的配置如下：

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

其中 `root` 表示存储博客文章的根目录，它的默认值是 `/posts/`，表示所有 `${srcDir}/posts/` 目录下的页面（除了 `README.md` 之外）都会被识别为博客文章。注意，它的值应当总是以斜杠开始，并以斜杠结束。

`social` 表示不同的社交网络账号，会展示在博客的导航栏中。

效果可以在[我的博客](https://blog.xcatliu.com/)中看到。

### 导航栏

博客的导航栏会展示 `title`, `description`, `blog.social` 和 `nav` 中的内容。

```ts {4-5,14-45}
export default {
  theme: 'blog',
  plugins: ['blog'],
  title: '流浪小猫的博客',
  description: '欢迎来到我的博客，这里搜集了我的技术文章和生活感悟，欢迎一起交流成长。',
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
      text: '首页',
      link: '/index.html',
      icon: 'czs-home-l',
    },
    {
      text: '分类',
      link: '/categories/index.html',
      icon: 'czs-category-l',
    },
    {
      text: '标签',
      link: '/tags/index.html',
      icon: 'czs-tag-l',
    },
    {
      text: '关于',
      link: '/about/index.html',
      icon: 'czs-about-l',
    },
    {
      text: '归档',
      link: '/archives/index.html',
      icon: 'czs-box-l',
    },
    {
      text: '友情链接',
      link: '/links/index.html',
      icon: 'czs-link-l',
    },
  ],
};
```

以上的博客的配置适用于官方的 `blog` 主题，第三方主题的配置可能有所不同。

## 博客文章

`blog` 插件会扫描所有 `/posts/` 目录下的文章，将它们按照创建的时间进行排序，这些文章会被视为一种特殊的文章——博客文章（posts）。

### 分类和标签

博客文章有两个特殊的头信息——`categories`（分类）和 `tags`（标签），它们的取值均为字符串数组：

```md
---
categories:
  - 编程世界
tags:
  - 代码质量
  - 代码复杂度
---

# 博客的标题

博客的正文
```

所有的博客文章会根据其分类和标签进行聚类，然后针对每个分类或标签都会生成一个 `/categories/${categoriyName}/index.html` 或 `/tags/${tagName}/index.html` 页面。

另外，你可能还需要一个 `/categories/index.html` 页面用于展示所有分类，为了生成这个页面，你需要创建一个 `categories/README.md`，它只需要包含一个标题即可：

```md
# 分类
```

同样的，为了生成一个 `/tags/index.html` 页面，你需要创建一个 `tags/README.md`，它只需要包含一个标题即可：

```md
# 标签
```

### 归档

归档页面也是一个博客系统中常见的页面，它用列表的形式展示出了所有博客文章。

要创建一个归档页面，你需要创建一个 `archives/README.md`：

```md
# 归档
```

## 写一个博客主题

写一个博客主题与写一个普通主题类似，只是多了一个 `props` 需要处理。

### `props`

博客主题多了一个名为 `blog` 的 `prop`，它的类型如下：

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

其中 `isPost` 表示当前页面是否为一个博客文章。

`posts` 表示所有的博客文章列表，不过只包含了标题、链接、摘要等信息，用于方便的生成文章列表页。

`categories` 和 `tags` 是整个站点的分类和标签列表，用于生成 `/categories/index.html` 页面以及 `/tags/index.html` 页面。

注意，写一个博客主题时，你还需要创建以下几个 `_layout.tsx`：

- `archives/_layout.tsx` 用于展示文章归档
- `categories/_layout.tsx` 用于展示分类列表
- `tags/_layout.tsx` 用于展示标签列表
- `posts/_layout.tsx` 用于展示文章列表（包含摘要）

具体请参考[官方的博客主题](https://github.com/xcatliu/pagic/tree/master/src/themes/blog)。
