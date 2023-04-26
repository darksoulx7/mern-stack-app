const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { version } = require('../package.json');
const logger = require('../app/commons/utils/logger');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Mern Stack App",
            version,
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [`${__dirname}/../app/route.js`],
};

const swaggerSpec = swaggerJsDoc(options)

function swaggerDocs(server, port) {
    // Swagger page
    server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    server.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    logger.info(`Docs available at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs