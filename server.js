import express from 'express';
import path from 'path';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './ssr/App';

const app = express();

app.use(express.static(path.join(__dirname)));

app.get('*', (req, res) => {
  const context = {};

  const renderedApp = ReactDomServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>,
  );

  res.send(
    `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Web site created using create-snowpack-app" />
        <title>Snowpack App</title>
      </head>
      <body>
        <div id="root"></div>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <script type="module" src="/_dist_/index.js"></script>
      </body>
    </html>
    `.replace('<div id="root"></div>', `<div id="root">${renderedApp}</div>`),
  );
});

app.listen(5000, '127.0.0.1', (err) => {
  if (err) console.log(err);
  console.log('Listening on 5000');
});
