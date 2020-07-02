// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

import { PagicLayout, PageProps } from '../../Pagic.ts';
import { classnames } from './_utils.tsx';
import { PagePropsSidebar } from '../../plugins/sidebar.tsx';

const Sidebar: PagicLayout = (props) => {
  if (!props.sidebar) {
    return null;
  }
  return (
    <aside className="sidebar">
      <ol>
        {props.sidebar.map((sidebarItem, index) => (
          <FoldableItem key={index} {...props} sidebarItem={sidebarItem} />
        ))}
      </ol>
      <hr />
      <a className="powered_by" href="https://github.com/xcatliu/pagic" target="_blank">
        Powered by&nbsp;
        <img src={`${props.config.base}assets/pagic.png`} />
        agic
      </a>
    </aside>
  );
};

const FoldableItem: PagicLayout<{
  sidebarItem: PagePropsSidebar[0];
}> = ({ config, outputPath, sidebarItem: { text, link, children } }) => {
  const [fold, setFold] = React.useState(false);
  const [olHeight, setOlHeight] = React.useState('auto');
  const measuredRef = React.useCallback((node) => {
    if (node !== null) {
      setOlHeight(node.getBoundingClientRect().height);
    }
  }, []);
  const isActive = link === outputPath;

  const toggleFold = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFold(!fold);
  };
  return (
    <li className={fold ? 'fold' : 'unfold'}>
      <a
        href={link ? `${config.base}${link}` : '#'}
        className={classnames('nav_link', {
          active: isActive,
          no_link: !link
        })}
        onClick={() => {
          if (link) {
            if (children) {
              if (isActive) {
                setFold(!fold);
              } else {
                setFold(false);
                // @ts-ignore
                document.documentElement.classList.remove('show_sidebar');
              }
            } else {
              // @ts-ignore
              document.documentElement.classList.remove('show_sidebar');
            }
          } else {
            setFold(!fold);
          }
        }}
      >
        {text}
        {children && (
          <>
            <span
              className="czs-angle-up-l"
              style={{ backgroundImage: `url("${config.base}assets/czs-angle-up-l.svg")` }}
              onClick={toggleFold}
            />
            <span
              className="czs-angle-down-l"
              style={{ backgroundImage: `url("${config.base}assets/czs-angle-down-l.svg")` }}
              onClick={toggleFold}
            />
          </>
        )}
      </a>
      {children && (
        <ol ref={measuredRef} style={{ height: olHeight }}>
          {children.map(({ text, link }, index) => (
            <li key={index}>
              <a
                href={`${config.base}${link}`}
                className={classnames('nav_link', { active: link === outputPath })}
                onClick={() => {
                  // @ts-ignore
                  document.documentElement.classList.remove('show_sidebar');
                }}
              >
                {text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </li>
  );
};

export default Sidebar;
