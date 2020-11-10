import { React } from '../../../../deps.ts';

import type { PagicLayout } from '../../../Pagic.ts';
import LayoutBase from '../_layout_base.tsx';

const Categories: PagicLayout = (props) => (
  <section className="main">
    {props.contentTitle ?? (props.title && <h1>{props.title}</h1>)}
    <ul className="main_categories">
      {props.blog?.categories.map(({ name, count }) => (
        <li key={name}>
          <a href={`${props.config.root}categories/${name}/`}>
            {name} ({count})
          </a>
        </li>
      ))}
    </ul>
  </section>
);

const Layout: PagicLayout = (props) => <LayoutBase {...props} Main={Categories} />;

export default Layout;
