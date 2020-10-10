import { React } from '../../../deps.ts';
import throttle from 'https://cdn.pagic.org/lodash@4.17.20/esnext/throttle.js';

import type { PagicLayout } from '../../Pagic.ts';
import Loading from './_loading.tsx';
import { dateFormatter } from './_utils.tsx';

const Main: PagicLayout = (props) => {
  const { config, content, contentTitle, contentBody, blog, author, date, loading, toc, prev, next, gitalk } = props;

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
    <section className="main">
      <div className="main_article">
        {loading ? (
          <Loading />
        ) : blog?.isPost ? (
          <>
            {contentTitle}
            <div className="main_post_meta">
              <time dateTime={date}>{dateFormatter['YYYY-MM-DD'](date)}</time> · {author ?? 'unknown'}
            </div>
            {contentBody}
          </>
        ) : (
          content
        )}
        {(prev || next) && (
          <div className="prev_next">
            {prev && (
              <a className="prev button" href={`${config.root}${prev.link}`}>
                «&nbsp;&nbsp;{prev.title}
              </a>
            )}
            {next && (
              <a className="next button" href={`${config.root}${next.link}`}>
                {next.title}&nbsp;&nbsp;»
              </a>
            )}
          </div>
        )}
        {gitalk}
      </div>
      {toc && (
        <div className="main_toc_container nav_link_container">
          <div className="main_toc">
            {config.tocAd && <div className="toc_ad">{config.tocAd}</div>}
            {toc}
          </div>
        </div>
      )}
    </section>
  );
};

export default Main;
