module.exports = function ({ title, content, relativeToRoot }) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="${relativeToRoot}/css/mobi.css/mobi.min.css" />
        <link rel="stylesheet" href="${relativeToRoot}/css/prism.css" />
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
};
