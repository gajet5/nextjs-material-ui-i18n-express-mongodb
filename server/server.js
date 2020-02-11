require('dotenv').config();

const express = require('express');
const { connection } = require('./services/mongo');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;

const nextI18Next= require('../plugin/i18n');

const app = next({ dev: true });
const handle = app.getRequestHandler();

const api = require('./api');

connection.once('open', async () => {
  try {
    await app.prepare();
    const server = express();

    await nextI18Next.initPromise;
    server.use(nextI18NextMiddleware(nextI18Next));
    server.use(express.json());

    server.use('/api', api);

    server.all('*', (req, res) => {
      return handle(req, res)
    });

    try {
      await server.listen(3000);
      console.log('> Ready on http://localhost:3000');
    } catch (e) {
      console.log(e);
    }

  } catch (e) {
    console.log(e);
  }
});
