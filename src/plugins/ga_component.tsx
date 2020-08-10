// @deno-types="https://deno.land/x/pagic@v0.8.3/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

interface GaProps {
  id: string;
}

declare global {
  interface Window {
    ga: any;
  }
}
const Ga = ({ id }: GaProps) => {
  React.useEffect(() => {
    window.addEventListener('rerender', () => {
      // @ts-ignore
      window.ga('set', 'page', location.pathname);
      window.ga('send', 'pageview');
    });
  }, []);
  return (
    <>
      <script async src="https://www.google-analytics.com/analytics.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.GoogleAnalyticsObject="ga";(window.ga=window.ga||function(){(window.ga.q=window.ga.q||[]).push(arguments);}),(window.ga.l=1*new Date());

            ga('create', '${id}', 'auto');
            ga('send', 'pageview');`
        }}
      />
    </>
  );
};

export default Ga;
