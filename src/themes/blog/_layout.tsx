import { React } from '../../../deps.ts';

import type { PagicLayout } from '../../Pagic.ts';
import LayoutBase from './_layout_base.tsx';
import Main from './_main.tsx';
import Posts from './posts/_posts.tsx';

const Layout: PagicLayout = (props) => (
  <LayoutBase {...props} Main={props.outputPath === 'index.html' ? Posts : Main} />
);

export default Layout;
