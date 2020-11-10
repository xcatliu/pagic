import { React } from '../../../deps.ts';

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
    linkPrefix: 'https://github.com/'
  },
  email: {
    icon: 'czs-message-l',
    linkPrefix: 'mailto:'
  },
  twitter: {
    icon: 'czs-twitter',
    linkPrefix: 'https://twitter.com/'
  },
  v2ex: {
    icon: 'czs-v2ex',
    linkPrefix: 'https://v2ex.com/member/'
  },
  zhihu: {
    icon: 'czs-zhihu',
    linkPrefix: 'https://www.zhihu.com/people/'
  }
};

const Aside: PagicLayout<{
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}> = ({ config, isDark, setIsDark, outputPath }) => (
  <aside>
    <h1>
      <a href={config.root}>{config.title}</a>
    </h1>
    <p className="description">{config.description}</p>
    <ul className="social">
      {Object.entries(config.blog?.social ?? {}).map(([key, user]) => (
        <li key={key} className="flex_center">
          <a
            className={SOCIAL_MAP[key].icon}
            href={`${SOCIAL_MAP[key].linkPrefix}${user}`}
            target="_blank"
            style={{ backgroundImage: `url("${config.root}assets/${SOCIAL_MAP[key].icon}.svg")` }}
          />
        </li>
      ))}
      <li style={{ flexGrow: 1 }} />
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
    <nav>
      <ul className="menu">
        {config.nav?.map(({ text, link, icon, target }: any) => (
          <li key={link}>
            <a
              className={classnames('flex_center', {
                active: outputPath === 'index.html' ? link === '/' : link !== '/' && `/${outputPath}`.startsWith(link)
              })}
              href={link}
              target={target}
            >
              <span
                className={`czs-${icon}-l`}
                style={{ backgroundImage: `url("${config.root}assets/czs-${icon}-l.svg")` }}
              />
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default Aside;
