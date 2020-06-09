import './standalone.js';
import './parser-babel.js';
import './parser-html.js';

import { createRequire } from "https://deno.land/std@0.56.0/node/module.ts";
const require = createRequire(import.meta.url);

const prettier = (window as any).prettier;
export default prettier;

const prettierPlugins = (window as any).prettierPlugins;

const prettierConfig = require('../../../.prettierrc.js');

export { prettierConfig, prettierPlugins };
