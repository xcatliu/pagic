module.exports = function ({ title, content, frontMatter }) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        ${content}
        <footer>
          Author: ${frontMatter.author},
          Published: ${frontMatter.published}
        </footer>
      </body>
    </html>
  `;
};
