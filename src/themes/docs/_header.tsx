import { React } from '../../../deps.ts';

import type { PagicLayout } from '../../Pagic.ts';
import Popover from './_popover.tsx';

const Header: PagicLayout<{
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}> = ({ config, language, isDark, setIsDark }) => (
  <header>
    <h1 className="hide_on_mobile">
      <a href={`${config.root}${language?.root.slice(1) ?? ''}`}>{config.title}</a>
    </h1>
    <nav>
      <ul>
        <li className="show_on_mobile flex_center">
          <a
            className="czs-menu-l"
            href="#"
            style={{ backgroundImage: `url("${config.root}assets/czs-menu-l.svg")` }}
            onClick={(e) => {
              e.preventDefault();
              // @ts-ignore
              if (document.documentElement.classList.contains('show_sidebar')) {
                // @ts-ignore
                document.documentElement.classList.remove('show_sidebar');
              } else {
                // @ts-ignore
                document.documentElement.classList.add('show_sidebar');
              }
            }}
          />
        </li>
        <li className="show_on_mobile">
          <h1 className="mobile_title">
            <a
              href={config.root}
              onClick={() => {
                // @ts-ignore
                document.documentElement.classList.remove('show_sidebar');
              }}
            >
              {config.title}
            </a>
          </h1>
        </li>
        {config.nav
          ?.filter(({ align }: any) => align !== 'right')
          .map(({ text, link, target, popover }: any) => (
            <li key={link} className="hide_on_mobile">
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
        {config.nav
          ?.filter(({ align }: any) => align === 'right')
          .map(({ text, link, target, popover }: any) => (
            <li key={link} className="hide_on_mobile">
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
        {config.github && (
          <li className="flex_center">
            <a
              className="czs-github-logo"
              href={config.github}
              target="_blank"
              style={{ backgroundImage: `url("${config.root}assets/czs-github-logo.svg")` }}
            />
          </li>
        )}
        {config.i18n && language && (
          <li className="flex_center">
            <select
              value={language.code}
              onChange={(e) => {
                // @ts-ignore
                let url = new URL(location.href);

                // @ts-ignore
                const nextLanguageCode = e.target.value;
                if (language.root !== '/') {
                  url.pathname = url.pathname.replace(language.root, '/');
                }
                const nextLanguage = config.i18n?.languages.find(({ code }) => code === nextLanguageCode);
                url.pathname = `${config.root}${nextLanguage!.root.slice(1)}${url.pathname.replace(config.root, '')}`;

                // @ts-ignore
                location.href = url.toString();
              }}
            >
              {config.i18n.languages.map(({ code, name }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </li>
        )}
        <li
          onClick={() => {
            setIsDark(!isDark);
            // @ts-ignore
            document.cookie = `is_dark=${!isDark ? '1' : '0'}; expires=Tue, 19 Jun 2038 03:14:07 UTC; path=/`;
          }}
          className="toggle_dark flex_center"
        >
          <span className="czs-sun" style={{ backgroundImage: `url("${config.root}assets/czs-sun.svg")` }} />
          <span className="czs-sun-l" style={{ backgroundImage: `url("${config.root}assets/czs-sun-l.svg")` }} />
          <span className="czs-moon" style={{ backgroundImage: `url("${config.root}assets/czs-moon.svg")` }} />
          <span className="czs-moon-l" style={{ backgroundImage: `url("${config.root}assets/czs-moon-l.svg")` }} />
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
