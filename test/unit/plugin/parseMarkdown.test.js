const assert = require('assert');
const parseMarkdown = require('../../../src/plugin/parseMarkdown');

describe('parseMarkdown', () => {
  it('should keep other properties on context', () => {
    assert.equal(parseMarkdown({
      content: 'q',
      otherKey: 'otherValue',
    }).otherKey, 'otherValue');
  });
  it('should contain title', () => {
    assert.equal(parseMarkdown({
      content: `# Pagic

The easiest way to generate static html page from markdown`,
    }).title, 'Pagic');
  });
  it('should contain undefined title', () => {
    assert.equal(parseMarkdown({
      content: 'The easiest way to generate static html page from markdown',
    }).title, undefined);
  });
  it('should contain content', () => {
    assert.equal(parseMarkdown({
      content: `# Pagic

The easiest way to generate static html page from markdown`,
    }).content, `<h1 id="pagic">Pagic</h1>
<p>The easiest way to generate static html page from markdown</p>
`);
  });
});
