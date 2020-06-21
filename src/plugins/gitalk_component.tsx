// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/react-dom.d.ts"
import ReactDOM from 'https://dev.jspm.io/react-dom@16.13.1';

interface GitalkProps {
  clientID: string;
  clientSecret: string;
  repo: string;
  owner: string;
  admin: string[];
  id: string;
  title: string;
}

const Gitalk = (props: GitalkProps) => {
  React.useEffect(() => {
    // https://pegasaas.com/how-to-defer-render-blocking-css/
    // @ts-ignore
    const css = document.getElementById('gitalk-css');
    css.rel = 'stylesheet';
  });
  React.useEffect(() => {
    // @ts-ignore
    const container = document.getElementById('gitalk-container');
    ReactDOM.unmountComponentAtNode(container);
    container.innerHTML = '';
    new (window as any).Gitalk(props).render(container);
  }, [props.id]);
  return (
    <>
      <div id="gitalk-container" />
      <link id="gitalk-css" rel="preload" href="https://unpkg.com/gitalk@1.6.2/dist/gitalk.css" />
      <script defer src="https://unpkg.com/gitalk@1.6.2/dist/gitalk.min.js" />
    </>
  );
};

export default Gitalk;
