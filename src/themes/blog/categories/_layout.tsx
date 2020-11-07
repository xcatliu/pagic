import { React } from '../../../../deps.ts';

import type { PagicLayout } from '../../../Pagic.ts';
import LayoutBase from '../_layout_base.tsx';

const Categories: PagicLayout = (props) => (
  <section className="main">
    <div className="main_article">
      <article>
        {props.contentTitle}
        <ul className="main_categories">
          {props.blog?.categories.map(({ name, count, link }) => (
            <li key={link}>
              <a href={`${props.config.root}${link}`}>
                {name} ({count})
              </a>
            </li>
          ))}
        </ul>
      </article>
    </div>
  </section>
);

const Layout: PagicLayout = (props) => <LayoutBase {...props} Main={Categories} />;

export default Layout;
