// https://github.com/egoist/markdown-it-highlight-lines

const RE = /{([\d,-]+)}/

export default md => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options, , self] = args
    const token = tokens[idx]

    if (!token.info || !RE.test(token.info)) {
      return fence(...args)
    }

    const lineNumbers = RE.exec(token.info)[1]
      .split(',')
      .map(v => v.split('-').map(v => parseInt(v, 10)))
    const langName = token.info.replace(RE, '').trim()

    let code = options.highlight ?
      options.highlight(token.content, langName) :
      token.content

    // #region Remove <pre><code>
    let codePrefix = ''
    let codeSuffix = ''
    if (code.startsWith('<pre')) {
      code = code.replace(/^<pre[^>]*><code[^>]*>/, ($0) => {
        codePrefix = $0
        return ''
      }).replace(/<\/code><\/pre>$/, ($0) => {
        codeSuffix = $0
        return ''
      })
    }
    // #endregion

    const codeSplits = code.split('\n').map((split, index) => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) => {
        if (start && end) {
          return lineNumber >= start && lineNumber <= end
        }
        return lineNumber === start
      })

      // #region Line may starts with </span>
      split = split.replace(/^(\s*)(<\/span>)+/, '$1')
      const spanCount = split.match(/<span[^>]/g)?.length ?? 0
      const endSpanCount = split.match(/<\/span>/g)?.length ?? 0
      if (spanCount > endSpanCount) {
        split += '</span>'.repeat(spanCount - endSpanCount)
      } else if (spanCount < endSpanCount) {
        split = split.replace(/^\s*/, `$&${'<span>'.repeat(endSpanCount - spanCount)}`)
      }
      // #endregion

      if (inRange) {
        return {
          code: `<span class="highlighted-line">${split}</span>`,
          highlighted: true
        }
      }
      return {
        code: split
      }
    })

    let highlightedCode = ''
    codeSplits.forEach((split, index) => {
      if (split.highlighted || index === codeSplits.length - 1) {
        highlightedCode += split.code
      } else {
        highlightedCode += `${split.code}\n`
      }
    })

    // #region Add prefix and suffix
    highlightedCode = `${codePrefix}${highlightedCode}${codeSuffix}`
    // #endregion

    // If custom highlighter wraps code with starting <pre..., don't wrap code
    if (highlightedCode.startsWith('<pre')) {
      return highlightedCode
    }
    const tmpToken = {
      attrs: [['class', langName ? `language-${langName}` : '']]
    }
    const attrs = self.renderAttrs(tmpToken)
    return `<pre${attrs}><code${attrs}>${highlightedCode.trim()}</code></pre>`
  }
}
