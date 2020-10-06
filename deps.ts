export * as fs from 'https://deno.land/std@0.72.0/fs/mod.ts';
export * as path from 'https://deno.land/std@0.72.0/path/mod.ts';
export * as colors from 'https://deno.land/std@0.72.0/fmt/colors.ts';
export * as server from 'https://deno.land/std@0.72.0/http/server.ts';
export * as asserts from 'https://deno.land/std@0.72.0/testing/asserts.ts';

// @deno-types="https://cdn.pagic.org/@types/react@16.9.50/index.d.ts"
import * as React from 'https://cdn.pagic.org/react@16.13.1/esnext/react.development.js';
// @deno-types="https://cdn.pagic.org/@types/react-dom@16.9.8/index.d.ts"
import * as ReactDOM from 'https://cdn.pagic.org/react-dom@16.13.1/esnext/react-dom.development.js';
// @deno-types="https://cdn.pagic.org/@types/react-dom@16.9.8/server/index.d.ts"
import * as ReactDOMServer from 'https://cdn.pagic.org/react-dom@16.13.1/esnext/server.development.js';

(window as any).React = React;
(window as any).ReactDOM = ReactDOM;

export { React, ReactDOM, ReactDOMServer };

import frontMatter from 'https://dev.jspm.io/front-matter@4.0.2';
import MarkdownIt from 'https://dev.jspm.io/markdown-it@11.0.1';
import reactElementToJSXStringMod from 'https://dev.jspm.io/react-element-to-jsx-string@14.3.1';
const reactElementToJSXString = (reactElementToJSXStringMod as any).default;
import * as typescriptMod from 'https://dev.jspm.io/typescript@4.0.3';
const typescript = (typescriptMod as any).default;

export { frontMatter, MarkdownIt, reactElementToJSXString, typescript };
