export * as fs from 'https://deno.land/std@0.111.0/fs/mod.ts';
export * as path from 'https://deno.land/std@0.111.0/path/mod.ts';
export * as colors from 'https://deno.land/std@0.111.0/fmt/colors.ts';
export * as server from 'https://deno.land/std@0.111.0/http/server.ts';
export * as fileServer from 'https://deno.land/std@0.111.0/http/file_server.ts';
export * as httpStatus from 'https://deno.land/std@0.111.0/http/http_status.ts';
export * as asserts from 'https://deno.land/std@0.111.0/testing/asserts.ts';
// EventEmitter
export { EventEmitter } from 'https://deno.land/std@0.177.0/node/events.ts';

import * as React from 'https://esm.sh/react@18.2.0';
import * as ReactDOM from 'https://esm.sh/react-dom@18.2.0';
import * as ReactDOMServer from 'https://esm.sh/react-dom@18.2.0/server';

(window as any).React = React;
(window as any).ReactDOM = ReactDOM;

export { React, ReactDOM, ReactDOMServer };

// @deno-types="./src/types/any.d.ts"
import frontMatter from 'npm:front-matter@4.0.2';
// @deno-types="./src/types/any.d.ts"
import htmlToTextMod from 'npm:html-to-text@6.0.0';
const { htmlToText } = htmlToTextMod;
// @deno-types="./src/types/any.d.ts"
import MarkdownIt from 'npm:markdown-it@11.0.1';
// @deno-types="./src/types/any.d.ts"
import reactElementToJSXStringMod from 'npm:react-element-to-jsx-string@14.3.1';
const reactElementToJSXString = reactElementToJSXStringMod.default;
// @deno-types="./src/types/any.d.ts"
import reactHtmlParserMod from 'npm:react-html-parser@2.0.2';
const reactHtmlParser = reactHtmlParserMod.default;
// @deno-types="./src/types/any.d.ts"
import * as typescriptMod from 'npm:typescript@4.9.4';
const typescript = typescriptMod.default;

export { frontMatter, htmlToText, MarkdownIt, reactElementToJSXString, reactHtmlParser, typescript };
