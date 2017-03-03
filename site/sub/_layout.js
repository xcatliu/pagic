module.exports = function ({ title, content }) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <h1>Sub</h1>
        <hr/>
        ${content}
      </body>
    </html>
  `;
};
