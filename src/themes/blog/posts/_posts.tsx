import { React } from '../../../../deps.ts';

import type { PagicLayout } from '../../../Pagic.ts';
import { dateFormatter } from '../_utils.tsx';

const Posts: PagicLayout = (props) => {
  const { config, contentTitle, title, blog } = props;

  return (
    <section className="main">
      <div className="main_article">
        <article>
          {contentTitle ?? (title && <h1>{title}</h1>)}
          <ul className="main_posts">
            {blog?.posts.map(({ title, link, date, author, categories, excerpt, cover }) => (
              <li key={link}>
                {cover && (
                  <div
                    className="cover"
                    style={{
                      backgroundImage: `url("${cover}")`
                    }}
                  />
                )}
                <h1>{title}</h1>
                {excerpt && <p>{excerpt}</p>}
                <div className="main_posts_meta">
                  {categories?.[0] && <a href={`${config.root}categories/${categories[0]}/`}>{categories[0]}</a>}
                  &nbsp;·&nbsp;
                  <time dateTime={date.toString()}>{dateFormatter['YYYY-MM-DD'](date)}</time>
                  &nbsp;·&nbsp;
                  {author ?? 'unknown'}
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};

export default Posts;
