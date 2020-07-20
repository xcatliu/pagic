import projectConfig from '/pagic.config.js';
export default {
    config: Object.assign({ "root": "/" }, projectConfig),
    'pagePath': "docs/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/index.html",
    'title': "文档",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>文档</h1>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': null
};
