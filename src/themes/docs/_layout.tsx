// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import throttle from 'https://dev.jspm.io/lodash@4.17.15/throttle';

import { PagicLayout } from '../../Pagic.ts';
import Head from './_head.tsx';
import Header from './_header.tsx';
import Sidebar from './_sidebar.tsx';
import Loading from './_loading.tsx';
import { classnames } from './_utils.tsx';

const Layout: PagicLayout = (props) => {
  const { config, content, loading, toc, previous, next, gitalk, script } = props;
  const [isDark, setIsDark] = React.useState(
    // @ts-ignore
    window.Deno ? false : document.documentElement.classList.contains('is_dark')
  );
  React.useEffect(() => {
    if (window.Deno) {
      return;
    }
    const scrollHandler = () => {
      let anchorPositionMap = new Map<any, 'aboveViewport' | 'inViewport' | 'belowViewport'>();
      // @ts-ignore
      for (let a of document.querySelectorAll('.toc a')) {
        // @ts-ignore
        const bounding = document.getElementById(a.hash.slice(1)).getBoundingClientRect();
        const belowTop = bounding.y > 64;
        // @ts-ignore
        const aboveBottom = bounding.y + bounding.height + 16 <= window.innerHeight;
        if ((belowTop && aboveBottom) || (!belowTop && !aboveBottom)) {
          anchorPositionMap.set(a, 'inViewport');
        } else if (belowTop && !aboveBottom) {
          anchorPositionMap.set(a, 'belowViewport');
        } else if (!belowTop && aboveBottom) {
          anchorPositionMap.set(a, 'aboveViewport');
        }
      }
      let activeAnchor = null;
      for (let [a, position] of anchorPositionMap) {
        if (position === 'aboveViewport') {
          activeAnchor = a;
        } else if (position === 'inViewport') {
          if (activeAnchor === null) {
            activeAnchor = a;
            break;
          }
        }
      }
      if (activeAnchor) {
        // @ts-ignore
        document.querySelectorAll('.toc a.active').forEach((node) => node.classList.remove('active'));
        activeAnchor.classList.add('active');
      }
    };
    window.addEventListener('scroll', throttle(scrollHandler, 100));
    scrollHandler();
  }, []);
  return (
    <html className={classnames({ is_dark: isDark })}>
      <Head {...props} isDark={isDark} />
      <body>
        <Header {...props} isDark={isDark} setIsDark={setIsDark} />
        <Sidebar {...props} />
        <section className="main">
          <div className="main_article">
            {loading ? <Loading /> : content}
            {(previous || next) && (
              <div className="previous_next">
                {previous && (
                  <a className="previous button" href={`${config.base}${previous.link}`}>
                    «&nbsp;&nbsp;{previous.text}
                  </a>
                )}
                {next && (
                  <a className="next button" href={`${config.base}${next.link}`}>
                    {next.text}&nbsp;&nbsp;»
                  </a>
                )}
              </div>
            )}
            {gitalk}
          </div>
          <div className="main_toc_container nav_link_container">
            <div className="main_toc">
              {config.tocAd && <div className="toc_ad">{config.tocAd}</div>}
              {toc}
            </div>
          </div>
        </section>
        <div className="scroll_to_top flex_center">
          <a
            className="czs-pen button"
            href={`${config.github}/edit/master/${props.pagePath}`}
            target="_blank"
            style={{ backgroundImage: `url("${config.base}assets/czs-pen.svg")` }}
          />
          <a
            className="czs-angle-up-l button"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              (window as any).scrollTo(0, 0);
            }}
            style={{ backgroundImage: `url("${config.base}assets/czs-angle-up-l.svg")` }}
          />
        </div>
        {script}
      </body>
    </html>
  );
};

export default Layout;
