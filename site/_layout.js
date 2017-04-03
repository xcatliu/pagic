module.exports = function ({ title, content, relativeToRoot }) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0,
          maximum-scale=1.0, user-scalable=no">
        
        <title>${title}</title>

        <link rel="stylesheet" href="${relativeToRoot}/css/mobi.css/mobi.min.css" />
        <link rel="stylesheet" href="${relativeToRoot}/css/prism.css" />
      </head>
      <body>
        <div class="flex-center">
          <div class="container">
            ${content}
          </div>
        </div>
      </body>
    </html>
  `;
};
