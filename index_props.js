import projectConfig from '/pagic.config.js';
export default {
    config: { "srcDir": "src", "publicDir": "public", "base": "/", ...projectConfig },
    'pagePath': "README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': "Pagic",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Pagic</h1>\n<p>The easiest way to generate static html page from markdown, built with Deno! 🦕</p>\n<ul>\n<li><a href="./index.html">to README.md</a></li>\n<li><a href="./hello.html">to hello.html</a></li>\n</ul>\n'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'author': "xcatliu",
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol></ol></nav>'
        } })
};
