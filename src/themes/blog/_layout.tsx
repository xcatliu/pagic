import { React } from '../../../deps.ts';

import type { PagicLayout } from '../../Pagic.ts';
import Head from './_head.tsx';
import Header from './_header.tsx';
import Main from './_main.tsx';
import Posts from './_posts.tsx';
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
        {props.blog?.isPosts ? <Posts {...props} /> : <Main {...props} />}
        <Footer {...props} />
        {props.script}
      </body>
    </html>
  );
};

export default Layout;
