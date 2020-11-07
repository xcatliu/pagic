import { React } from '../../../../deps.ts';

import type { PagicLayout } from '../../../Pagic.ts';
import LayoutBase from '../_layout_base.tsx';
import Main from '../_main.tsx';
import Posts from '../_posts.tsx';

const Layout: PagicLayout = (props) => <LayoutBase {...props} Main={props.blog?.isPost ? Main : Posts} />;

export default Layout;
