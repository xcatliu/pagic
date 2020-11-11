import { React } from '../../../../deps.ts';

import type { PagicLayout } from '../../../Pagic.ts';
import { dateFormatter } from '../_utils.tsx';

const Archives: PagicLayout = (props) => {
  const { config, contentTitle, title, blog } = props;

  return (
    <section className="main">
      <div className="main_article">
        <article>
          {contentTitle ?? (title && <h1>{title}</h1>)}
          <ul className="main_archives">
            {blog?.posts.map(({ title, link, date }) => (
              <li key={link}>
                <time dateTime={date.toString()}>{dateFormatter['YYYY-MM-DD'](date)}</time>
                <div>
                  <a href={`${config.root}${link}`}>{title}</a>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};

export default Archives;
