import projectConfig from '/pagic.config.js';
import Hello from './hello_content.js';
export default {
    config: { "srcDir": "src", "publicDir": "public", "base": "/", ...projectConfig },
    'pagePath': "hello.tsx",
    'layoutPath': "_layout.tsx",
    'outputPath': "hello.html",
    'title': "Hello World",
    'content': React.createElement(Hello, null),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'author': "xcatliu"
};
