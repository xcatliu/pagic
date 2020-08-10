// @deno-types="https://deno.land/x/pagic@v0.8.6/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import Pagic from '../Pagic.ts';
import md from './md.tsx';

Deno.test('[md]', async () => {
  const pagic = new Pagic();
  pagic.config = { srcDir: 'test/fixtures' } as any;
  pagic.pagePaths = ['README.md', 'no_toc.md', 'no_toc2.md', 'foo.tsx'];
  pagic.pagePropsMap = {
    'README.md': {
      config: pagic.config,
      pagePath: 'README.md',
      layoutPath: '_layout.tsx',
      outputPath: 'index.html',
      title: '',
      content: null,
      script: null,
      toc: null
    },
    'no_toc.md': {
      config: pagic.config,
      pagePath: 'no_toc.md',
      layoutPath: '_layout.tsx',
      outputPath: 'no_toc.html',
      title: '',
      content: null,
      script: null,
      toc: null
    },
    'no_toc2.md': {
      config: pagic.config,
      pagePath: 'no_toc2.md',
      layoutPath: '_layout.tsx',
      outputPath: 'no_toc2.html',
      title: '',
      content: null,
      script: null,
      toc: null
    },
    'foo.tsx': {
      config: pagic.config,
      pagePath: 'foo.tsx',
      layoutPath: '_layout.tsx',
      outputPath: 'foo.html',
      title: '',
      content: null,
      script: null,
      toc: null
    }
  };
  await md.fn(pagic);

  const pagePropsREADME = pagic.pagePropsMap['README.md'];
  assertEquals(pagePropsREADME.title, 'Text Fixtures');
  assertEquals(pagePropsREADME.author, 'xcatliu');
  assertEquals(pagePropsREADME.publicPath, 'foo/bar.html');
  assertEquals(
    pagePropsREADME.content!.props.dangerouslySetInnerHTML.__html,
    `<h1>Text Fixtures</h1>
<pre class="language-ts"><code class="language-ts"><span class="token keyword">const</span> foo<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre>
<h2 id="header-2">Header 2<a class="anchor" href="#header-2">§</a></h2>
<h3 id="header-3">Header 3<a class="anchor" href="#header-3">§</a></h3>
<h4 id="header-4">Header 4<a class="anchor" href="#header-4">§</a></h4>`
  );
  assertEquals(
    pagePropsREADME.toc!.props.dangerouslySetInnerHTML.__html,
    `<nav class="toc"><ol><li><a href="#header-2">Header 2</a><ol><li><a href="#header-3">Header 3</a><ol></ol></li></ol></li></ol></nav>`
  );

  const pageProps_no_toc = pagic.pagePropsMap['no_toc.md'];
  assertEquals(pageProps_no_toc.title, undefined);
  assertEquals(pageProps_no_toc.content!.props.dangerouslySetInnerHTML.__html, `<p>foo</p>`);
  assertEquals(pageProps_no_toc.toc, null);

  const pageProps_no_toc2 = pagic.pagePropsMap['no_toc2.md'];
  assertEquals(pageProps_no_toc2.title, 'foo');
  assertEquals(pageProps_no_toc2.content!.props.dangerouslySetInnerHTML.__html, `<h1>foo</h1>`);
  assertEquals(pageProps_no_toc2.toc, null);

  const pageProps_foo = pagic.pagePropsMap['foo.tsx'];
  assertEquals(pageProps_foo.content, null);
});
