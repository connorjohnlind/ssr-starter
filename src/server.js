import path from 'path';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import compression from 'compression';

import Routes from './client/Routes';
import render from './helpers/render';
import createStore from './helpers/createStore';

const app = express();
const port = process.env.PORT || 8080;

app.use(compression());

app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore();

  // return all loadData functions for matching Routes
  // and wrap each promise in a new promise for the Promise.all catch all
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    .map(request => {
      if (request) {
        return new Promise((resolve, reject) => {
          request.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {}; // will be handled as staticContext by StaticRouter
    const content = render(req, store, context);

    if (context.url) { // for redirects
      return res.redirect(301, context.url);
    }

    if (context.notFound) { // notFound property applied on NotFoundPage
      res.status(404);
    }

    res.send(content);
  });
});

// Start
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port} in ${process.env.NODE_ENV}`);
});
