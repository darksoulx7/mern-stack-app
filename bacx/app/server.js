const express = require('express');
const routes = require('./route'); 
const restServer = require('./commons/apiserver');
const { internalError } = require('./commons/utils/response-format/format');
const path = require('path');
const logger = require('./commons/utils/logger');
 
const name = "Mern Project";
const connectToMongoDB = require('./commons/db/connect')
connectToMongoDB()

const errorHandler = (error, req, res, next) => {
    logger.error(error, `${error.message}`);
    if (error.message) {
      error.code = res.status;
    } else if (error.name && !error.message) {
      error.message = error.name;
    }
    res.body = error;
    internalError(req, res, error);
    next();
  };

const server = restServer({name})

 server.use(express.static(path.resolve(__dirname, '../assets')));

const startServer = async () => {
  routes(server);
  server.use(errorHandler);
  server.listen(process.env.PORT || 9090, () => logger.info(name));
};

module.exports = { server, startServer, errorHandler }

if (require.main === module) {
  startServer().catch(err => logger.error(err, 'There was a problem starting the server'));
}

