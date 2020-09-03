export * as fs from 'https://deno.land/std@0.67.0/fs/mod.ts';
export * as path from 'https://deno.land/std@0.67.0/path/mod.ts';
export * as colors from 'https://deno.land/std@0.67.0/fmt/colors.ts';
export * as asserts from 'https://deno.land/std@0.67.0/testing/asserts.ts';

// @deno-types="https://deno.land/x/pagic@v0.8.6/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import ReactDOM from 'https://dev.jspm.io/react-dom@16.13.1';
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server.js';

export { React, ReactDOM, ReactDOMServer };
