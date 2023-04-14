const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('../utils/logger');
const fileUpload = require('express-fileupload');

/**
 * Restify server with common configuration for REST Apis.
 *
 * @param {Object} opts - options for the Express server
 * @returns {*|Server}
 */

const restServer = (opts) => {
  const server = express()
  server.use(cors());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());
  server.use(fileUpload());

  process.on('uncaughtException', (error) => {
    logger.error(`Error: %s', ${error}`);
    if (error.stack) {
      logger.error(error.stack);
    }
  });

  return server;
}

module.exports = restServer;