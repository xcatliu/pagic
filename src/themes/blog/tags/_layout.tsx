import { React } from '../../../../deps.ts';

import type { PagicLayout } from '../../../Pagic.ts';
import LayoutBase from '../_layout_base.tsx';

const Tags: PagicLayout = (props) => (
  <section className="main">
    <div className="main_article">
      <article>
        {props.contentTitle}
        <ul className="main_tags">
          {props.blog?.tags.map(({ name, count }) => (
            <li key={name}>
              <a href={`${props.config.root}tags/${name}/`}>
                {name} ({count})
              </a>
            </li>
          ))}
        </ul>
      </article>
    </div>
  </section>
);

const Layout: PagicLayout = (props) => <LayoutBase {...props} Main={Tags} />;

export default Layout;
