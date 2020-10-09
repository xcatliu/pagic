import projectConfig from '/pagic.config.js';
var _a, _b;
export default {
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['zh-CN'] },
    'pagePath': "zh-CN/blog/test.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "zh-CN/blog/test.html",
    'title': "Test",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Test</h1>\n<p>hello</p>\n<p>world</p>\n<h2 id="title2">Title2<a class="anchor" href="#title2">§</a></h2>\n<p>title2 hello</p>\n<p>title2 world</p>\n<h3 id="title3">title3<a class="anchor" href="#title3">§</a></h3>\n<p>title2 world\ntitle2 world\ntitle2 world</p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "/i18n.js", type: "module" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#title2">Title2</a><ol><li><a href="#title3">title3</a></li></ol></li></ol></nav>'
        } }),
    'language': {
        "code": "zh-CN",
        "name": "简体中文",
        "path": "zh-CN/"
    },
    'contentTitle': React.createElement("h1", { key: "0" }, "Test"),
    'contentText': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '\n<p>hello</p>\n<p>world</p>\n<h2 id="title2">Title2<a class="anchor" href="#title2">§</a></h2>\n<p>title2 hello</p>\n<p>title2 world</p>\n<h3 id="title3">title3<a class="anchor" href="#title3">§</a></h3>\n<p>title2 world\ntitle2 world\ntitle2 world</p>'
        } }),
    'date': "2020-10-08T16:28:03.000Z",
    'updated': null,
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'blog': {
        "isPost": true,
        "isPosts": false,
        "posts": [
            {
                "pagePath": "zh-CN/blog/test.md",
                "title": "Test",
                "link": "zh-CN/blog/test.html",
                "date": "2020-10-08T16:28:03.000Z",
                "updated": null
            }
        ]
    }
};
