import { React, t, Trans } from '../mod.ts';
import type { PagicLayout } from '../src/Pagic.ts';

const style = `
h2 {
  font-weight: normal;
}
.main_article {
  width: 960px;
  max-width: 960px;
  padding-bottom: 0;
}
.cards {
  display: flex;
  justify-content: center;
  margin: 3rem -1rem 0 -1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}
.cards > div {
  width: 20rem;
  padding: 0 1rem;
}
.cards ul {
  color: var(--color-text-muted);
}
.btn {
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  border: 0;
  cursor: pointer;
  opacity: 0.9;
  font-size: 14px;
  text-decoration: none;
  background-color: var(--color-border);
  color: var(--color-text);
}
.btn:hover {
  text-decoration: none;
}
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-background);
}
.btn:hover {
  opacity: 1;
}
@media screen and (max-width: 44rem) {
  h2 {
    text-align: center;
  }
  .cards {
    flex-direction: column;
  }
  .cards > div {
    width: 100vw;
  }
  .cards ul {
    text-align: center;
    padding-left: 0;
    list-style: none;
  }
  pre {
    margin-left: -1rem;
    margin-right: -1rem;
  }
}
`;

const IndexPage: PagicLayout = ({ config, language }) => (
  <>
    <div>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <h1
        style={{
          marginTop: '3.5rem',
          textAlign: 'center',
          fontSize: '64px',
          color: 'hsl(210, 70%, 50%)'
        }}
      >
        <img
          alt="P"
          src="/assets/pagic_logo.png"
          style={{
            width: 128,
            verticalAlign: 'bottom',
            margin: -16,
            opacity: 1
          }}
        />
        agic
      </h1>
      <p
        style={{
          fontSize: '28px',
          marginTop: '2rem',
          textAlign: 'center',
          color: 'var(--color-text-muted)'
        }}
      >
        {t('A static site generator powered by Deno + React')}
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2rem'
        }}
      >
        <a className="btn btn-primary" href={`${config.root}${language?.root.slice(1) ?? ''}docs/introduction.html`}>
          {t('Get Started')}
        </a>
        <a className="btn" href={`${config.root}${language?.root.slice(1) ?? ''}docs/demos.html`}>
          {t('Demos')}
        </a>
      </div>
    </div>
    <div className="cards">
      <div>
        <h2>{t('Easy to configure')}</h2>
        <ul>
          <li>{t('Convention over configuration')}</li>
          <li>
            {t('Single config file')} <code>pagic.config.ts</code>
          </li>
          <li>{t('Intuitive design')}</li>
        </ul>
      </div>
      <div>
        <h2>{t('Support md and tsx')}</h2>
        <ul>
          <li>
            <Trans>
              Render <code>md/tsx</code> to static HTML page
            </Trans>
          </li>
          <li>{t('Support React Hooks')}</li>
          <li>{t('Pre-render to static HTML, run as an SPA once loaded')}</li>
        </ul>
      </div>
      <div>
        <h2>{t('Themes and plugins')}</h2>
        <ul>
          <li>{t('Official themes default/docs/blog with dark mode')}</li>
          <li>{t('Combine plugins to build process')}</li>
          <li>{t('Import third-party themes or plugins through URL')}</li>
        </ul>
      </div>
    </div>
    <h2>{t('Get up and running in seconds')}</h2>
    <pre
      style={{
        fontSize: '1rem'
      }}
    >
      <code
        dangerouslySetInnerHTML={{
          __html: `# ${t('Install pagic')}
deno install --unstable --allow-read --allow-write --allow-net --allow-run --name=pagic https://deno.land/x/pagic/mod.ts

# ${t('Create pagic.config.ts and README.md')}
mkdir site && cd site && echo "export default {};" > pagic.config.ts && echo "# Hello world" > README.md

# ${t('Run pagic')}
pagic build --watch --serve`
        }}
      />
    </pre>
  </>
);

export default IndexPage;
