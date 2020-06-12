import * as path from 'https://deno.land/std@0.56.0/path/mod.ts';

import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { compile, compileFile, compilePagicFile } from './compile.ts';

Deno.test('[compile] should remove types', () => {
  const input = `const foo: number = 1;`;
  const output = compile(input);
  assertEquals(output, 'const foo = 1;\n');
});

Deno.test('[compile] should replace `.tsx` to `.js` in `import` statement', () => {
  const input = `
    import foo from './foo.ts';
    import bar from './bar.tsx';
    console.log(foo, bar);
  `;
  const output = compile(input);
  assertEquals(output, `import foo from './foo.js';\nimport bar from './bar.js';\nconsole.log(foo, bar);\n`);
});

Deno.test('[compile] should remove react and react-dom imports', () => {
  const input = `
    // @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
    import React from 'https://dev.jspm.io/react@16.13.1';
    // @deno-types="https://deno.land/x/types/react-dom/v16.13.1/react-dom.d.ts"
    import ReactDOM from 'https://dev.jspm.io/react-dom@16.13.1';

    ReactDOM.render(<div />, document.getElementById('foo'));
  `;
  const output = compile(input);
  assertEquals(
    output,
    `// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"\n\n// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/react-dom.d.ts"\n\nReactDOM.render(React.createElement("div", null), document.getElementById('foo'));\n`
  );
});

Deno.test('[compileFile] should read input file and compile it', async () => {
  const output = await compileFile(path.resolve(Deno.cwd(), 'test/fixtures/foo.tsx'));
  assertEquals(
    output,
    `// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"\n\n// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/react-dom.d.ts"\n\nReactDOM.render(React.createElement("div", null), document.getElementById('foo'));\n`
  );
});

Deno.test('[compilePagicFile] should compile the input pagic file', async () => {
  const output = await compilePagicFile('test/fixtures/foo.tsx');
  assertEquals(
    output,
    `// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"\n\n// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/react-dom.d.ts"\n\nReactDOM.render(React.createElement("div", null), document.getElementById('foo'));\n`
  );
});
