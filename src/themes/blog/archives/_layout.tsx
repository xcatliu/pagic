import { React } from '../../../../deps.ts';

import type { PagicLayout } from '../../../Pagic.ts';
import LayoutBase from '../_layout_base.tsx';
import { dateFormatter } from '../_utils.tsx';

const Archives: PagicLayout = (props) => {
  const { config, contentTitle, title, blog } = props;

  return (
    <section className="main">
      {contentTitle ?? (title && <h1>{title}</h1>)}
      <ul className="main_archives">
        {blog?.posts.map(({ title, link, date }) => (
          <li key={link}>
            <time dateTime={date.toString()}>{dateFormatter['yyyy-MM-dd'](date)}</time>
            <div>
              <a href={`${config.root}${link}`}>{title}</a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

const Layout: PagicLayout = (props) => <LayoutBase {...props} Main={Archives} />;

export default Layout;
