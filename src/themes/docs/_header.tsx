// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

import { PagicLayout } from '../../Pagic.ts';
import Popover from './_popover.tsx';

const Header: PagicLayout<{
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}> = ({ config, isDark, setIsDark }) => (
  <header>
    <h1>
      <a href={config.base}>{config.title}</a>
    </h1>
    <nav>
      <ul>
        {config.nav
          .filter(({ align }: any) => align !== 'right')
          .map(({ text, link, target, popover }: any) => (
            <li key={link}>
              {popover ? (
                <Popover placement="bottom-start" content={popover}>
                  <a href={link} target={target}>
                    {text}
                  </a>
                </Popover>
              ) : (
                <a href={link} target={target}>
                  {text}
                </a>
              )}
            </li>
          ))}
        <li style={{ flexGrow: 1 }} />
        <li
          onClick={() => {
            setIsDark(!isDark);
            // @ts-ignore
            document.cookie = `is_dark=${!isDark ? '1' : '0'}; expires=Tue, 19 Jun 2038 03:14:07 UTC; path=/`;
          }}
          className="toggle_dark"
        >
          <span className="czs-sun" style={{ backgroundImage: `url("${config.base}assets/czs-sun.svg")` }} />
          <span className="czs-sun-l" style={{ backgroundImage: `url("${config.base}assets/czs-sun-l.svg")` }} />
          <span className="czs-moon" style={{ backgroundImage: `url("${config.base}assets/czs-moon.svg")` }} />
          <span className="czs-moon-l" style={{ backgroundImage: `url("${config.base}assets/czs-moon-l.svg")` }} />
        </li>
        {config.nav
          .filter(({ align }: any) => align === 'right')
          .map(({ text, link, target, popover }: any) => (
            <li key={link}>
              {popover ? (
                <Popover placement="bottom-end" content={popover}>
                  <a href={link} target={target}>
                    {text}
                  </a>
                </Popover>
              ) : (
                <a href={link} target={target}>
                  {text}
                </a>
              )}
            </li>
          ))}
      </ul>
    </nav>
  </header>
);

export default Header;
