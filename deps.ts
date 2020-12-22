export * as fs from 'https://deno.land/std@0.81.0/fs/mod.ts';
export * as path from 'https://deno.land/std@0.81.0/path/mod.ts';
export * as colors from 'https://deno.land/std@0.81.0/fmt/colors.ts';
export * as server from 'https://deno.land/std@0.81.0/http/server.ts';
export * as asserts from 'https://deno.land/std@0.81.0/testing/asserts.ts';

// @deno-types="https://cdn.pagic.org/@types/react@16.9.50/index.d.ts"
import * as React from 'https://cdn.pagic.org/react@16.13.1/esnext/react.development.js';
// @deno-types="https://cdn.pagic.org/@types/react-dom@16.9.8/index.d.ts"
import * as ReactDOM from 'https://cdn.pagic.org/react-dom@16.13.1/esnext/react-dom.development.js';
// @deno-types="https://cdn.pagic.org/@types/react-dom@16.9.8/server/index.d.ts"
import * as ReactDOMServer from 'https://cdn.pagic.org/react-dom@16.13.1/esnext/server.development.js';

(window as any).React = React;
(window as any).ReactDOM = ReactDOM;

export { React, ReactDOM, ReactDOMServer };

// @deno-types="./src/types/any.d.ts"
import frontMatter from 'https://dev.jspm.io/front-matter@4.0.2';
// @deno-types="./src/types/any.d.ts"
import htmlToTextMod from 'https://dev.jspm.io/html-to-text@6.0.0';
const { htmlToText } = htmlToTextMod;
// @deno-types="./src/types/any.d.ts"
import MarkdownIt from 'https://dev.jspm.io/markdown-it@11.0.1';
// @deno-types="./src/types/any.d.ts"
import reactElementToJSXStringMod from 'https://dev.jspm.io/react-element-to-jsx-string@14.3.1';
const reactElementToJSXString = reactElementToJSXStringMod.default;
// @deno-types="./src/types/any.d.ts"
import reactHtmlParserMod from 'https://dev.jspm.io/react-html-parser@2.0.2';
const reactHtmlParser = reactHtmlParserMod.default;
// @deno-types="./src/types/any.d.ts"
import * as typescriptMod from 'https://dev.jspm.io/typescript@4.0.3';
const typescript = typescriptMod.default;

export { frontMatter, htmlToText, MarkdownIt, reactElementToJSXString, reactHtmlParser, typescript };
