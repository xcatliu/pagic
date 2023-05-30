import { React } from '../../../deps.ts';

import type { PagicLayout, PageProps } from '../../Pagic.ts';
import type { PagePropsSidebar } from '../../plugins/sidebar.tsx';
import { classnames, isRelativeLink } from './_utils.tsx';

const Sidebar: PagicLayout = ({ config, outputPath, sidebar }) => {
  if (!sidebar) {
    return null;
  }
  return (
    <aside className="sidebar">
      <ol className="list_style_none">
        {sidebar.map((sidebarItem, index) => (
          <FoldableItem key={index} config={config} outputPath={outputPath} sidebarItem={sidebarItem} />
        ))}
      </ol>
    </aside>
  );
};

const FoldableItem: React.FC<{
  config: PageProps['config'];
  outputPath: PageProps['outputPath'];
  sidebarItem: PagePropsSidebar[0];
}> = ({ config, outputPath, sidebarItem: { text, link, expanded, children } }) => {
  const olRef = React.useRef<any>(null);
  const [fold, setFold] = React.useState(expanded === false);
  const [olHeight, setOlHeight] = React.useState(0);
  const isActive = link === outputPath;

  const foldOl = (fold: boolean) => {
    if (olRef.current === null) {
      return;
    }
    const currentHeight = olRef.current.getBoundingClientRect().height;
    if (fold) {
      setOlHeight(currentHeight);
      olRef.current.style.height = `${currentHeight}px`;
      setTimeout(() => {
        olRef.current.style.height = 0;
        setFold(fold);
      }, 17);
    } else {
      if (olHeight === 0) {
        olRef.current.style.height = 'auto';
        const currentHeight = olRef.current.getBoundingClientRect().height;
        olRef.current.style.height = 0;
        setTimeout(() => {
          olRef.current.style.height = `${currentHeight}px`;
        }, 0);
        setOlHeight(currentHeight);
      } else {
        olRef.current.style.height = `${olHeight}px`;
      }
      setFold(fold);
      setTimeout(() => {
        olRef.current.style.height = 'auto';
      }, 300);
    }
  };
  const toggleFold = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    foldOl(!fold);
  };
  return (
    <li className={children ? (fold ? 'fold' : 'unfold') : ''}>
      <a
        href={link ? (isRelativeLink(link) ? `${config.root}${link}` : link) : '#'}
        className={classnames('nav_link', {
          active: isActive,
          no_link: !link,
        })}
        onClick={(e) => {
          if (link) {
            if (children) {
              if (isActive) {
                toggleFold(e);
              } else {
                // @ts-ignore
                document.documentElement.classList.remove('show_sidebar');
                if (fold) {
                  foldOl(false);
                }
              }
            } else {
              // @ts-ignore
              document.documentElement.classList.remove('show_sidebar');
            }
          } else {
            toggleFold(e);
          }
        }}
      >
        {text}
        {children && (
          <>
            <span
              className="czs-angle-up-l"
              style={{ backgroundImage: `url("${config.root}assets/czs-angle-up-l.svg")` }}
              onClick={toggleFold}
            />
            <span
              className="czs-angle-down-l"
              style={{ backgroundImage: `url("${config.root}assets/czs-angle-down-l.svg")` }}
              onClick={toggleFold}
            />
          </>
        )}
      </a>
      {children && (
        <ol className="list_style_none" ref={olRef} style={{ height: expanded === false ? 0 : 'auto' }}>
          {children.map((sidebarItem, index) => (
            <FoldableItem key={index} config={config} outputPath={outputPath} sidebarItem={sidebarItem} />
          ))}
        </ol>
      )}
    </li>
  );
};

export default Sidebar;
