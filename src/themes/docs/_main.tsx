import { React } from '../../../deps.ts';
import throttle from 'https://dev.jspm.io/lodash@4.17.15/throttle';

import { PagicLayout } from '../../Pagic.ts';
import Loading from './_loading.tsx';

const Main: PagicLayout = (props) => {
  const { config, content, loading, toc, prev, next, gitalk } = props;

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
        {loading ? <Loading /> : content}
        {(prev || next) && (
          <div className="prev_next">
            {prev && (
              <a className="prev button" href={`${config.root}${prev.link}`}>
                «&nbsp;&nbsp;{prev.text}
              </a>
            )}
            {next && (
              <a className="next button" href={`${config.root}${next.link}`}>
                {next.text}&nbsp;&nbsp;»
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
