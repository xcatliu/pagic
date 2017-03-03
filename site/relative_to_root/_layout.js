module.exports = function ({ title, content, relativeToRoot }) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="${relativeToRoot}/css/site.css" />
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
};
