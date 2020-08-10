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
const IndexPage = () => (React.createElement(React.Fragment, null,
    React.createElement("div", null,
        React.createElement("style", { dangerouslySetInnerHTML: { __html: style } }),
        React.createElement("h1", { style: {
                marginTop: '3.5rem',
                textAlign: 'center',
                fontSize: '64px',
                color: 'hsl(210, 70%, 50%)'
            } },
            React.createElement("img", { src: "/assets/pagic_logo.png", style: {
                    width: 128,
                    verticalAlign: 'bottom',
                    margin: -16,
                    opacity: 1
                } }),
            "agic"),
        React.createElement("p", { style: {
                fontSize: '28px',
                marginTop: '2rem',
                textAlign: 'center',
                color: 'var(--color-text-muted)'
            } }, "Deno + React \u9A71\u52A8\u7684\u9759\u6001\u7F51\u7AD9\u751F\u6210\u5668"),
        React.createElement("div", { style: {
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2rem'
            } },
            React.createElement("a", { className: "btn btn-primary", href: "/docs/introduction.html" }, "\u5F00\u59CB\u4F7F\u7528"),
            React.createElement("a", { className: "btn", href: "/demos/" }, "\u793A\u4F8B\u7F51\u7AD9"))),
    React.createElement("div", { className: "cards" },
        React.createElement("div", null,
            React.createElement("h2", null, "\u914D\u7F6E\u7B80\u5355"),
            React.createElement("ul", null,
                React.createElement("li", null, "\u7EA6\u5B9A\u4F18\u4E8E\u914D\u7F6E"),
                React.createElement("li", null,
                    "\u4E00\u4E2A\u5165\u53E3 ",
                    React.createElement("code", null, "pagic.config.ts")),
                React.createElement("li", null, "\u7B26\u5408\u76F4\u89C9\u7684\u8BBE\u8BA1"))),
        React.createElement("div", null,
            React.createElement("h2", null, "\u652F\u6301 md \u548C tsx"),
            React.createElement("ul", null,
                React.createElement("li", null, "\u652F\u6301 md \u6587\u4EF6\u6E32\u67D3\u6210\u9875\u9762"),
                React.createElement("li", null, "\u652F\u6301 tsx \u6587\u4EF6\u6E32\u67D3\u6210\u9875\u9762"),
                React.createElement("li", null, "\u9884\u6E32\u67D3\u751F\u6210\u9759\u6001 HTML\uFF0C\u52A0\u8F7D\u540E\u4F5C\u4E3A SPA \u8FD0\u884C"))),
        React.createElement("div", null,
            React.createElement("h2", null, "\u4E3B\u9898\u548C\u63D2\u4EF6"),
            React.createElement("ul", null,
                React.createElement("li", null, "\u5185\u7F6E default, docs, blog \u7B49\u4E3B\u9898\uFF0C\u652F\u6301\u9ED1\u6697\u6A21\u5F0F"),
                React.createElement("li", null, "\u6784\u5EFA\u8FC7\u7A0B\u7531\u63D2\u4EF6\u7EC4\u6210\uFF0C\u53EF\u968F\u610F\u7EC4\u5408"),
                React.createElement("li", null, "\u901A\u8FC7 url \u5F15\u5165\u7B2C\u4E09\u65B9\u4E3B\u9898\u6216\u63D2\u4EF6")))),
    React.createElement("h2", null, "\u53EA\u9700\u51E0\u884C\u547D\u4EE4\uFF0C\u5FEB\u6765\u4F53\u9A8C\u5427"),
    React.createElement("pre", { style: {
            fontSize: '1rem'
        } },
        React.createElement("code", { dangerouslySetInnerHTML: {
                __html: `# 安装 pagic
deno install --unstable --allow-read --allow-write --allow-net https://deno.land/x/pagic@v0.8.6/mod.ts

# 创建 pagic.config.ts 和 README.md
mkdir site && cd site && echo "export default {};" > pagic.config.ts && echo "# Hello world" > README.md

# 运行 pagic
pagic build`
            } }))));
export default IndexPage;
