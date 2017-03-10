const assert = require('assert');
const parseFrontMatter = require('../../../src/plugin/parseFrontMatter');

describe('parseFrontMatter', () => {
  it('should keep other properties on context', () => {
    assert.equal(parseFrontMatter({
      otherKey: 'otherValue',
    }).otherKey, 'otherValue');
  });
  it('should return `frontMatter: {}` if there are no frontMatter', () => {
    assert.deepEqual(parseFrontMatter({
      content: `# Pagic

The easiest way to generate static html page from markdown`,
    }).frontMatter, {});
  });
  it('should return `frontMatter: { author: xcatliu }` if there have frontMatter', () => {
    assert.deepEqual(parseFrontMatter({
      content: `---
author: xcatliu
---

# Pagic

The easiest way to generate static html page from markdown`,
    }).frontMatter, {
      author: 'xcatliu',
    });
  });
  it('should have content if there are no frontMatter', () => {
    assert.equal(parseFrontMatter({
      content: `# Pagic

The easiest way to generate static html page from markdown`,
    }).content, `# Pagic

The easiest way to generate static html page from markdown`);
  });
  it('should have content if there have frontMatter', () => {
    assert.equal(parseFrontMatter({
      content: `---
author: xcatliu
---

# Pagic

The easiest way to generate static html page from markdown`,
    }).content, `
# Pagic

The easiest way to generate static html page from markdown`);
  });
});
