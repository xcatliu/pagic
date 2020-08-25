import { React } from '../../../deps.ts';

import { PagicLayout } from '../../Pagic.ts';
import Head from './_head.tsx';
import Header from './_header.tsx';
import Sidebar from './_sidebar.tsx';
import Main from './_main.tsx';
import Tools from './_tools.tsx';
import Footer from './_footer.tsx';
import { classnames } from './_utils.tsx';

const Layout: PagicLayout = (props) => {
  const [isDark, setIsDark] = React.useState(
    // @ts-ignore
    window.Deno ? false : document.documentElement.classList.contains('is_dark')
  );
  return (
    <html className={classnames({ is_dark: isDark })}>
      <Head {...props} isDark={isDark} />
      <body>
        <Header {...props} isDark={isDark} setIsDark={setIsDark} />
        <Sidebar {...props} />
        <Main {...props} />
        <Footer {...props} />
        <Tools {...props} />
        {props.script}
      </body>
    </html>
  );
};

export default Layout;
