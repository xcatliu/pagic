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
  link: string;
  children?: SidebarConfig;
}[];

const Sidebar = ({ sidebar, outputPath, config }: SidebarProps) => (
  <aside className="sidebar">
    <ol>
      {sidebar.map(({ text, link, children }) => (
        <li key={link}>
          <a href={`${config.base}${link}`} className={link === outputPath ? 'active' : ''}>
            {text}
          </a>
          {children && (
            <ol>
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
      ))}
    </ol>
  </aside>
);

export default Sidebar;
