// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

import { PagicLayout } from '../../Pagic.ts';
import Head from './_head.tsx';
import Header from './_header.tsx';
import Sidebar from './_sidebar.tsx';
import Main from './_main.tsx';
import { classnames } from './_utils.tsx';

const Layout: PagicLayout = (props) => {
  const { config, script } = props;
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
        {config.tools && (
          <div className="tools flex_center">
            {config.tools.editOnGithub && (
              <a
                className="czs-pen button"
                href={`${config.github}/edit/master/${props.pagePath}`}
                target="_blank"
                style={{ backgroundImage: `url("${config.root}assets/czs-pen.svg")` }}
              />
            )}
            {config.tools.backToTop && (
              <a
                className="czs-angle-up-l button"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  (window as any).scrollTo(0, 0);
                }}
                style={{ backgroundImage: `url("${config.root}assets/czs-angle-up-l.svg")` }}
              />
            )}
          </div>
        )}
        {script}
      </body>
    </html>
  );
};

export default Layout;
