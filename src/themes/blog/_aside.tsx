import { React } from '../../../deps.ts';
import throttle from 'https://cdn.pagic.org/lodash@4.17.20/esnext/throttle.js';

import type { PagicLayout } from '../../Pagic.ts';
import { classnames } from './_utils.tsx';

const SOCIAL_MAP: Record<
  string,
  {
    icon: string;
    linkPrefix: string;
  }
> = {
  github: {
    icon: 'czs-github-logo',
    linkPrefix: 'https://github.com/',
  },
  email: {
    icon: 'czs-message-l',
    linkPrefix: 'mailto:',
  },
  twitter: {
    icon: 'czs-twitter',
    linkPrefix: 'https://twitter.com/',
  },
  v2ex: {
    icon: 'czs-v2ex',
    linkPrefix: 'https://v2ex.com/member/',
  },
  zhihu: {
    icon: 'czs-zhihu',
    linkPrefix: 'https://www.zhihu.com/people/',
  },
};

const Aside: PagicLayout<{
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}> = ({ config, isDark, setIsDark, outputPath, toc }) => {
  React.useEffect(() => {
    if (window.Deno) {
      return;
    }
    const scrollHandler = (e?: any) => {
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
      // @ts-ignore
      const tocElement = document.querySelector('.toc');
      if (tocElement) {
        if (tocElement.offsetTop !== 0) {
          // @ts-ignore
          window.__tocElementOffsetTop__ = tocElement.offsetTop;
        }
        // @ts-ignore
        if (window.__tocElementOffsetTop__ >= window.scrollY) {
          tocElement.classList.remove('toc_fixed');
        } else {
          tocElement.classList.add('toc_fixed');
        }
      }
    };
    window.addEventListener('scroll', throttle(scrollHandler, 100));
    scrollHandler();
  }, []);

  return (
    <>
      <a
        className="czs-menu-l show_on_mobile aside_button_open"
        href="#"
        style={{ backgroundImage: `url("${config.root}assets/czs-menu-l.svg")` }}
        onClick={(e) => {
          e.preventDefault();
          // @ts-ignore
          document.documentElement.classList.add('show_aside');
        }}
      />
      <a className="show_on_mobile aside_button_text" href={config.root}>
        {config.title}
      </a>
      <aside className="hide_on_mobile">
        <div className="aside_card">
          <a
            className="czs-menu-l show_on_mobile aside_button_close"
            href="#"
            style={{ backgroundImage: `url("${config.root}assets/czs-close-l.svg")` }}
            onClick={(e) => {
              e.preventDefault();
              // @ts-ignore
              document.documentElement.classList.remove('show_aside');
            }}
          />
          <h1>
            <a
              href={config.root}
              onClick={() => {
                // @ts-ignore
                document.documentElement.classList.remove('show_aside');
              }}
            >
              {config.title}
            </a>
          </h1>
          <p className="description">{config.description}</p>
          <ul className="social list_style_none">
            {Object.entries(config.blog?.social ?? {}).map(([key, user]) => (
              <li key={key} className="flex_center">
                <a
                  className={SOCIAL_MAP[key].icon}
                  href={`${SOCIAL_MAP[key].linkPrefix}${user}`}
                  target="_blank"
                  style={{ backgroundImage: `url("${config.root}assets/${SOCIAL_MAP[key].icon}.svg")` }}
                  onClick={() => {
                    // @ts-ignore
                    document.documentElement.classList.remove('show_aside');
                  }}
                />
              </li>
            ))}
            <li style={{ flexGrow: 1 }} />
            <li
              onClick={() => {
                setIsDark(!isDark);
                // @ts-ignore
                document.cookie = `is_dark=${!isDark ? '1' : '0'}; expires=Tue, 19 Jun 2038 03:14:07 UTC; path=/`;
                // @ts-ignore
                document.documentElement.classList.remove('show_aside');
              }}
              className="toggle_dark flex_center"
            >
              <span className="czs-sun" style={{ backgroundImage: `url("${config.root}assets/czs-sun.svg")` }} />
              <span className="czs-sun-l" style={{ backgroundImage: `url("${config.root}assets/czs-sun-l.svg")` }} />
              <span className="czs-moon" style={{ backgroundImage: `url("${config.root}assets/czs-moon.svg")` }} />
              <span className="czs-moon-l" style={{ backgroundImage: `url("${config.root}assets/czs-moon-l.svg")` }} />
            </li>
          </ul>
          <nav>
            <ul className="menu list_style_none">
              {config.nav?.map(({ text, link, icon, target }: any) => (
                <li key={link}>
                  <a
                    className={classnames('flex_center', {
                      active:
                        outputPath === 'index.html' ? link === '/' : link !== '/' && `/${outputPath}`.startsWith(link),
                    })}
                    href={link}
                    target={target}
                    onClick={() => {
                      // @ts-ignore
                      document.documentElement.classList.remove('show_aside');
                    }}
                  >
                    <span className={icon} style={{ backgroundImage: `url("${config.root}assets/${icon}.svg")` }} />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {toc}
      </aside>
    </>
  );
};

export default Aside;
