import { React } from '../../../deps.ts';

import { PagicLayout } from '../../Pagic.ts';

const Tools: PagicLayout = ({ config, pagePath }) => {
  if (!config.tools) {
    return null;
  }
  return (
    <div className="tools flex_center hide_on_mobile">
      {config.tools.editOnGithub && (
        <a
          className="czs-pen button"
          href={`${config.github}/edit/master/${pagePath}`}
          target="_blank"
          style={{ backgroundImage: `url("${config.root}assets/czs-pen.svg")` }}
        />
      )}
      {config.tools.backToTop && (
        <a
          className="czs-angle-up-l button"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            (window as any).scrollTo(0, 0);
          }}
          style={{ backgroundImage: `url("${config.root}assets/czs-angle-up-l.svg")` }}
        />
      )}
    </div>
  );
};

export default Tools;
