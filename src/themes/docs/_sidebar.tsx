// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { PagicConfig } from '../../Pagic.ts';

interface SidebarProps {
  sidebar: SidebarConfig;
  outputPath: string;
  config: PagicConfig;
}

type SidebarConfig = {
  text: string;
  link?: string;
  children?: SidebarConfig;
}[];

const Sidebar = (props: SidebarProps) => (
  <aside className="sidebar">
    <ol>
      {props.sidebar.map((sidebarConfig) => (
        <FoldableItem {...props} {...sidebarConfig} />
      ))}
    </ol>
  </aside>
);

const FoldableItem = ({ outputPath, config, text, link, children }: SidebarProps & SidebarConfig[0]) => {
  const [fold, setFold] = React.useState(false);
  const [olHeight, setOlHeight] = React.useState('auto');
  const measuredRef = React.useCallback((node) => {
    if (node !== null) {
      setOlHeight(node.getBoundingClientRect().height);
    }
  }, []);
  const isActive = link === outputPath;
  return (
    <li className={fold ? 'fold' : 'unfold'}>
      <a
        href={link ? `${config.base}${link}` : '#'}
        className={`${isActive ? 'active' : ''} ${link ? '' : 'no_link'}`}
        onClick={() => {
          if (link) {
            if (children) {
              if (isActive) {
                setFold(!fold);
              } else {
                setFold(false);
              }
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
              className="czs-angle czs-angle-up-l"
              style={{ backgroundImage: `url("${config.base}assets/czs-angle-up-l.svg")` }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFold(!fold);
              }}
            />
            <span
              className="czs-angle czs-angle-down-l"
              style={{ backgroundImage: `url("${config.base}assets/czs-angle-down-l.svg")` }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFold(!fold);
              }}
            />
          </>
        )}
      </a>
      {children && (
        <ol ref={measuredRef} style={{ height: olHeight }}>
          {children.map(({ text, link }) => (
            <li key={link}>
              <a href={`${config.base}${link}`} className={link === outputPath ? 'active' : ''}>
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
