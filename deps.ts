export * as fs from 'https://deno.land/std@0.71.0/fs/mod.ts';
export * as path from 'https://deno.land/std@0.71.0/path/mod.ts';
export * as colors from 'https://deno.land/std@0.71.0/fmt/colors.ts';
export * as asserts from 'https://deno.land/std@0.71.0/testing/asserts.ts';

// @deno-types="https://cdn.pagic.org/@types/react@16.9.50/index.d.ts"
import React from 'https://cdn.pagic.org/react@16.13.1/esnext/react.development.js';
// @deno-types="https://cdn.pagic.org/@types/react-dom@16.9.8/index.d.ts"
import ReactDOM from 'https://cdn.pagic.org/react-dom@16.13.1/esnext/react-dom.development.js';
// @deno-types="https://cdn.pagic.org/@types/react-dom@16.9.8/server/index.d.ts"
import ReactDOMServer from 'https://cdn.pagic.org/react-dom@16.13.1/esnext/server.development.js';

(window as any).React = React;
(window as any).ReactDOM = ReactDOM;

export { React, ReactDOM, ReactDOMServer };
