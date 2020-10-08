import { React } from '../../../deps.ts';

import type { PagicLayout } from '../../Pagic.ts';
import { dateFormatter } from './_utils.tsx';

const Posts: PagicLayout = (props) => {
  const { config, contentTitle, blog } = props;

  return (
    <section className="main">
      <div className="main_article">
        <article>
          {contentTitle}
          <ul className="main_posts">
            {blog.posts.map(({ title, link, date }: any) => (
              <li key={link}>
                <time dateTime={date}>{dateFormatter['YYYY-MM-DD'](date)}</time>
                <a href={`${config.root}${link}`}>{title}</a>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};

export default Posts;
