import { React } from '../../../deps.ts';

import type { PagicLayout } from '../../Pagic.ts';
import Loading from './_loading.tsx';
import { dateFormatter } from './_utils.tsx';

const Main: PagicLayout = (props) => {
  const { config, content, contentTitle, contentBody, blog, author, date, loading } = props;

  return (
    <section className="main">
      {loading ? (
        <Loading />
      ) : blog?.isPost ? (
        <>
          {contentTitle}
          {date && (
            <div className="main_post_meta">
              <time dateTime={date.toString()}>{dateFormatter['yyyy-MM-dd'](date)}</time> · {author ?? 'unknown'}
            </div>
          )}
          {contentBody}
        </>
      ) : (
        content
      )}
    </section>
  );
};

export default Main;
