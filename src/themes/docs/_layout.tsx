// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

import { PagicLayout } from '../../Pagic.ts';
import Head from './_head.tsx';
import Header from './_header.tsx';
import Sidebar from './_sidebar.tsx';
import Loading from './_loading.tsx';
import { classnames } from './_utils.tsx';

const Layout: PagicLayout = (props) => {
  const { config, content, loading, toc, gitalk, script } = props;
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
        <section className="main">
          <div className="main_article">
            {loading ? <Loading /> : content}
            {gitalk}
          </div>
          <div className="main_toc_container nav_link_container">
            <div className="main_toc">
              {config.tocAd && <div className="toc_ad">{config.tocAd}</div>}
              {toc}
            </div>
          </div>
        </section>
        {script}
      </body>
    </html>
  );
};

export default Layout;
