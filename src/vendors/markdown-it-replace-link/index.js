// https://github.com/martinheidegger/markdown-it-replace-link

function replaceAttr (token, attrName, replace, env) {
  token.attrs.forEach(function (attr) {
    if (attr[0] === attrName) {
      attr[1] = replace(attr[1], env, token)
    }
  })
}

export default function (md, opts) {
  md.core.ruler.after(
    'inline',
    'replace-link',
    function (state) {
      var replace

      if (md.options.replaceLink && typeof md.options.replaceLink === 'function') {
        // Use markdown options (default so far)
        replace = md.options.replaceLink
      } else if (opts && opts.replaceLink && typeof opts.replaceLink === 'function') {
        // Alternatively use plugin options provided upon .use(..)
        replace = opts.replaceLink
      } else {
        return false
      }

      if (typeof replace === 'function') {
        state.tokens.forEach(function (blockToken) {
          if (blockToken.type === 'html_block') {
            blockToken.content = blockToken.content.replace(/(<a.*href=")([^"]+)(")/gm, function (match, $1, $2, $3) {
              return $1 + replace($2) + $3
            }).replace(/(<a.*href=')([^']+)(')/gm, function (match, $1, $2, $3) {
              return $1 + replace($2) + $3
            })
          }
          else if (blockToken.type === 'inline' && blockToken.children) {
            blockToken.children.forEach(function (token) {
              var type = token.type
              if (type === 'link_open') {
                replaceAttr(token, 'href', replace, state.env)
              } else if (type === 'image') {
                replaceAttr(token, 'src', replace, state.env)
              } else if (type === 'html_inline') {
                token.content = token.content.replace(/(<a.*href=")([^"]+)(")/gm, function (match, $1, $2, $3) {
                  return $1 + replace($2) + $3
                }).replace(/(<a.*href=')([^']+)(')/gm, function (match, $1, $2, $3) {
                  return $1 + replace($2) + $3
                })
              }
            })
          }
        })
      }
      return false
    }
  )
}