/* @flow */

import 'babel-polyfill';
import { colorfulLog, logServerConfig } from './lib/logger';
import { config } from './config';
import api from './api';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import initializeDb from './db';
import morgan from 'morgan';

let app = express();

// 3rd party middlewares
app.use(compression());
app.use(cors());
app.use(morgan(colorfulLog));

// parse application/json
app.use(bodyParser.json(config.bodyParser.json));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));

// connect to db
initializeDb(db => {
  // api router
  app.use('/api', api({ config, db }));

  app.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0', () =>
    logServerConfig(),
  );
});

module.exports = app;
