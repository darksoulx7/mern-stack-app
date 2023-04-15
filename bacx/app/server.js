const express = require('express');
const routes = require('./route'); 
const restServer = require('./commons/config/apiserver');
const path = require('path');
const logger = require('./commons/utils/logger');
const connectdb = require('./commons/config/connect')
const { internalError } = require('./commons/utils/response-format/format');

const name = "Mern Project";
connectdb()

const errorHandler = (error, req, res, next) => {
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
};

server.listen(process.env.PORT , () => logger.info(name))
.on("error", function (err) {
  process.once("SIGUSR2", function () {
    process.kill(process.pid, "SIGUSR2");
  });
  process.on("SIGINT", function () {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, "SIGINT");
  });
});

module.exports = { server, startServer, errorHandler }

if (require.main === module) {
  startServer().catch(err => logger.error(err, 'There was a problem starting the server'));
}
