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
const IndexPage = ({ config, language }) => {
    var _a, _b;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null,
            React.createElement("style", { dangerouslySetInnerHTML: { __html: style } }),
            React.createElement("h1", { style: {
                    marginTop: '3.5rem',
                    textAlign: 'center',
                    fontSize: '64px',
                    color: 'hsl(210, 70%, 50%)',
                } },
                React.createElement("img", { alt: "P", src: "/assets/pagic_logo.png", style: {
                        width: 128,
                        verticalAlign: 'bottom',
                        margin: -16,
                        opacity: 1,
                    } }),
                "agic"),
            React.createElement("p", { style: {
                    fontSize: '28px',
                    marginTop: '2rem',
                    textAlign: 'center',
                    color: 'var(--color-text-muted)',
                } }, t('A static site generator powered by Deno + React')),
            React.createElement("div", { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2rem',
                } },
                React.createElement("a", { className: "btn btn-primary", href: `${config.root}${(_a = language === null || language === void 0 ? void 0 : language.root.slice(1)) !== null && _a !== void 0 ? _a : ''}docs/introduction.html` }, t('Get Started')),
                React.createElement("a", { className: "btn", href: `${config.root}${(_b = language === null || language === void 0 ? void 0 : language.root.slice(1)) !== null && _b !== void 0 ? _b : ''}docs/demos.html` }, t('Demos')))),
        React.createElement("div", { className: "cards" },
            React.createElement("div", null,
                React.createElement("h2", null, t('Easy to configure')),
                React.createElement("ul", null,
                    React.createElement("li", null, t('Convention over configuration')),
                    React.createElement("li", null,
                        t('Single config file'),
                        " ",
                        React.createElement("code", null, "pagic.config.ts")),
                    React.createElement("li", null, t('Intuitive design')))),
            React.createElement("div", null,
                React.createElement("h2", null, t('Support md and tsx')),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement(Trans, null,
                            "Render ",
                            React.createElement("code", null, "md/tsx"),
                            " to static HTML page")),
                    React.createElement("li", null, t('Support React Hooks')),
                    React.createElement("li", null, t('Pre-render to static HTML, run as an SPA once loaded')))),
            React.createElement("div", null,
                React.createElement("h2", null, t('Themes and plugins')),
                React.createElement("ul", null,
                    React.createElement("li", null, t('Official themes default/docs/blog with dark mode')),
                    React.createElement("li", null, t('Combine plugins to build process')),
                    React.createElement("li", null, t('Import third-party themes or plugins through URL'))))),
        React.createElement("h2", null, t('Get up and running in seconds')),
        React.createElement("pre", { style: {
                fontSize: '1rem',
            } },
            React.createElement("code", { dangerouslySetInnerHTML: {
                    __html: `# ${t('Install pagic')}
deno install --allow-read --allow-write --allow-net --allow-env --allow-run --name=pagic https://deno.land/x/pagic/mod.ts

# ${t('Create pagic.config.ts and README.md')}
mkdir site && cd site && echo "export default {};" > pagic.config.ts && echo "# Hello world" > README.md

# ${t('Run pagic')}
pagic build --watch --serve`,
                } }))));
};
export default IndexPage;
