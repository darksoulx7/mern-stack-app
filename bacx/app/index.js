process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const server = require('./server');

server.startServer();

if (process.env.NODE_ENV === 'production') {
    process.on('uncaughtException', (err) => {
      logger.error(`\n\nUncaught Exception thrown! Exiting with status 1...\n\n${err}`);
      process.exit(1);
    });
  }
  