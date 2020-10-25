import { asserts, ReactDOMServer } from '../../deps.ts';

import Pagic from '../Pagic.ts';
import md from './md.tsx';

Deno.test('[md]', async () => {
  const pagic = new Pagic();
  pagic.config.srcDir = 'test/fixtures';
  pagic.pagePaths = ['README.md', 'no_toc.md', 'no_toc2.md'];
  pagic.pagePropsMap = {
    'README.md': {
      config: pagic.config,
      pagePath: 'README.md',
      layoutPath: '_layout.tsx',
      outputPath: 'index.html',
      title: '',
      content: null,
      head: null,
      script: null
    }
  };
  await md.fn(pagic);

  const pagePropsREADME = pagic.pagePropsMap['README.md'];
  asserts.assertEquals(pagePropsREADME.title, 'Text Fixtures');
  asserts.assertEquals(
    ReactDOMServer.renderToString(pagePropsREADME.content!),
    '<article data-reactroot=""><h1>Text Fixtures</h1>\n<pre class="language-autoit"><code class="language-autoit"><span class="token keyword">const</span> foo<span class="token punctuation">:</span> number <span class="token operator">=</span> <span class="token number">1</span><span class="token comment">;</span>\n</code></pre>\n<h2 id="header-2">Header 2<a class="anchor" href="#header-2">§</a></h2>\n<h3 id="header-3">Header 3<a class="anchor" href="#header-3">§</a></h3>\n<h4 id="header-4">Header 4<a class="anchor" href="#header-4">§</a></h4></article>'
  );
  asserts.assertEquals(
    ReactDOMServer.renderToString(pagePropsREADME.contentTitle!),
    '<h1 data-reactroot="">Text Fixtures</h1>'
  );
  asserts.assertEquals(
    ReactDOMServer.renderToString(pagePropsREADME.contentBody!),
    '<article data-reactroot=""><pre class="language-autoit"><code class="language-autoit"><span class="token keyword">const</span> foo<span class="token punctuation">:</span> number <span class="token operator">=</span> <span class="token number">1</span><span class="token comment">;</span>\n</code></pre>\n<h2 id="header-2">Header 2<a class="anchor" href="#header-2">§</a></h2>\n<h3 id="header-3">Header 3<a class="anchor" href="#header-3">§</a></h3>\n<h4 id="header-4">Header 4<a class="anchor" href="#header-4">§</a></h4></article>'
  );
  asserts.assertEquals(pagePropsREADME.contentHasKatex, false);
  asserts.assertEquals(
    ReactDOMServer.renderToString(pagePropsREADME.toc!),
    '<aside data-reactroot=""><nav class="toc"><ol><li><a href="#header-2">Header 2</a><ol><li><a href="#header-3">Header 3</a><ol></ol></li></ol></li></ol></nav></aside>'
  );
  asserts.assertEquals(pagePropsREADME.date, new Date('Sat Jul 11 20:13:54 2020 +0800'));
  asserts.assertEquals(pagePropsREADME.author, 'Tom');
  asserts.assertEquals(pagePropsREADME.publicPath, 'foo/bar.html');
});

Deno.test('[md] no_toc', async () => {
  const pagic = new Pagic();
  pagic.config.srcDir = 'test/fixtures';
  pagic.pagePaths = ['no_toc.md', 'no_toc2.md'];
  pagic.pagePropsMap = {
    'no_toc.md': {
      config: pagic.config,
      pagePath: 'no_toc.md',
      layoutPath: '_layout.tsx',
      outputPath: 'no_toc.html',
      title: '',
      content: null,
      head: null,
      script: null
    },
    'no_toc2.md': {
      config: pagic.config,
      pagePath: 'no_toc2.md',
      layoutPath: '_layout.tsx',
      outputPath: 'no_toc2.html',
      title: '',
      content: null,
      head: null,
      script: null
    }
  };
  await md.fn(pagic);

  const pageProps_no_toc = pagic.pagePropsMap['no_toc.md'];
  asserts.assertEquals(pageProps_no_toc.title, undefined);
  asserts.assertEquals(
    ReactDOMServer.renderToString(pageProps_no_toc.content!),
    `<article data-reactroot=""><p>foo</p></article>`
  );
  asserts.assertEquals(pageProps_no_toc.contentTitle, undefined);
  asserts.assertEquals(
    ReactDOMServer.renderToString(pageProps_no_toc.contentBody!),
    `<article data-reactroot=""><p>foo</p></article>`
  );
  asserts.assertEquals(pageProps_no_toc.contentHasKatex, false);
  asserts.assertEquals(pageProps_no_toc.toc, null);

  const pageProps_no_toc2 = pagic.pagePropsMap['no_toc2.md'];
  asserts.assertEquals(pageProps_no_toc2.title, 'foo');
  asserts.assertEquals(
    ReactDOMServer.renderToString(pageProps_no_toc2.content!),
    `<article data-reactroot=""><h1>foo</h1></article>`
  );
  asserts.assertEquals(
    ReactDOMServer.renderToString(pageProps_no_toc2.contentTitle!),
    '<h1 data-reactroot="">foo</h1>'
  );
  asserts.assertEquals(
    ReactDOMServer.renderToString(pageProps_no_toc2.contentBody!),
    '<article data-reactroot=""></article>'
  );
  asserts.assertEquals(pageProps_no_toc2.contentHasKatex, false);
  asserts.assertEquals(pageProps_no_toc2.toc, null);
});

Deno.test('[md] LaTeX', async () => {
  const pagic = new Pagic();
  pagic.config.srcDir = 'test/fixtures';
  pagic.pagePaths = ['latex.md'];
  pagic.pagePropsMap = {
    'latex.md': {
      config: pagic.config,
      pagePath: 'latex.md',
      layoutPath: '_layout.tsx',
      outputPath: 'latex.html',
      title: '',
      content: null,
      head: null,
      script: null
    }
  };
  await md.fn(pagic);

  const pagePropsLaTeX = pagic.pagePropsMap['latex.md'];
  asserts.assertEquals(
    ReactDOMServer.renderToString(pagePropsLaTeX.content!),
    `<article data-reactroot=""><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mo>=</mo><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">E=mc^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.68333em;vertical-align:0em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:0.8141079999999999em;vertical-align:0em;"></span><span class="mord mathnormal">m</span><span class="mord"><span class="mord mathnormal">c</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141079999999999em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></p></article>`
  );
});
