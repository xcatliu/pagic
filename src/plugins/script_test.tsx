import { asserts, fs, React, ReactDOMServer } from '../../deps.ts';

import Pagic from '../Pagic.ts';
import script from './script.tsx';
import Hello from '../../test/fixtures/hello.tsx';
import Ga from './ga_component.tsx';

// Empty test/fixtures/test_script_dir before output files to it
fs.emptyDirSync('test/fixtures/test_script_dir');

Deno.test('[script]', async () => {
  const pagic = new Pagic();
  pagic.config.srcDir = 'test/fixtures';
  pagic.config.outDir = 'test/fixtures/test_script_dir';
  pagic.config.root = '/';
  pagic.pagePaths = ['hello.tsx'];
  pagic.layoutPaths = ['_layout.tsx'];
  pagic.pagicConfigPath = 'pagic.config.tsx';
  pagic.pagePropsMap = {
    'hello.tsx': {
      config: pagic.config,
      pagePath: 'hello.tsx',
      layoutPath: '_layout.tsx',
      outputPath: 'hello.html',
      title: '',
      content: <Hello />,
      head: (
        <>
          <Ga id="G-JPPPP5EF38" />
          <>
            <link rel="icon" type="image/png" href="/favicon.png" />
            <script src="/assets/custom.js" />
          </>
        </>
      ),
      script: null,
      footer: null,
    },
  };

  await script.fn(pagic);
  asserts.assertEquals(
    pagic.writeFiles['_layout.js'],
    'const Layout = ({ title, content }) => (React.createElement("html", null,\n    React.createElement("head", null,\n        React.createElement("title", null, title)),\n    React.createElement("body", null, content)));\nexport default Layout;\n',
  );
  asserts.assertEquals(
    pagic.writeFiles['hello_content.js'],
    `const Hello = () => React.createElement("h1", null, "Hello world");\nexport default Hello;\nexport const frontMatter = {\n    outputPath: 'foo/bar.html',\n};\n`,
  );
  asserts.assertEquals(
    pagic.writeFiles['hello_props.js'],
    `import projectConfig from '/pagic.config.js';\nimport Hello from './hello_content.js';\nimport Ga from '/_ga.js';\nexport default {\n    config: { "root": "/", ...projectConfig, branch: 'undefined' },\n    'pagePath': "hello.tsx",\n    'layoutPath': "_layout.tsx",\n    'outputPath': "hello.html",\n    'title': "",\n    'content': React.createElement(Hello, null),\n    'head': React.createElement(React.Fragment, null,\n        React.createElement(Ga, { id: "G-JPPPP5EF38" }),\n        React.createElement(React.Fragment, { key: ".1" },\n            React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),\n            React.createElement("script", { src: "/assets/custom.js" }))),\n    'script': React.createElement(React.Fragment, null,\n        React.createElement("script", { src: "https://cdn.pagic.org/react@18.2.0/umd/react.production.min.js" }),\n        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@18.2.0/umd/react-dom.production.min.js" }),\n        React.createElement("script", { src: "/index.js", type: "module" })),\n    'footer': null\n};\n`,
  );
  asserts.assertEquals(typeof pagic.writeFiles['pagic.config.js'], 'string');
  asserts.assertEquals(
    ReactDOMServer.renderToStaticMarkup(pagic.pagePropsMap['hello.tsx'].script!),
    '<script src="https://cdn.pagic.org/react@18.2.0/umd/react.production.min.js"></script><script src="https://cdn.pagic.org/react-dom@18.2.0/umd/react-dom.production.min.js"></script><script type="module" src="/index.js"></script>',
  );

  asserts.assert(await fs.exists('test/fixtures/test_script_dir/index.js'));
});
