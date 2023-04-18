process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const server = require('./server');

server.startServer();

if (process.env.NODE_ENV === 'production') {
    process.on('uncaughtException', (err) => {
      logger.error(`\n\nUncaught Exception thrown! Exiting with status 1...\n\n${err}`);
      process.exit(1);
    });
  }

// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// const server = require('./server');

// exports.handler = async function (event) {
// console.log("request <>", JSON.stringify(event, undefined, 2));
  
//   try {
//     server.startServer();

//     if (process.env.NODE_ENV === 'production') {
//       process.on('uncaughtException', (err) => {
//         logger.error(`\n\nUncaught Exception thrown! Exiting with status 1...\n\n${err}`);
//         process.exit(1);
//       });
//     }
//     return 

//   } catch (e) {
//     console.log("error:", e)
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: `Failed to perform operation`,
//         errorMsg: e.message,
//         errorStack: e.stack,
//       })
//     };
//   }
// }