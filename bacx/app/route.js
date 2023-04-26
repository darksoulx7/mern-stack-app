const { productsRoute, usersRoute, categoriesRoute, ordersRoute } = require('./api')

module.exports = (server) =>  {


server.get("/healthcheck", (req, res) => res.sendStatus(200));
/**
 * @openapi
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */

server.use('/products', productsRoute)

/**
 * @openapi
 * '/categories':
 *  get:
 *     tags:
 *     - Category
 *     summary: get all categories
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * '/categories':
 *  post:
 *     tags:
 *     - Category
 *     summary: Register a new category
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  category:
 *                      type: string
 *              required:
 *                  - category
 *     responses:
 *      200:
 *        description: ok
 *      400:
 *        description: Bad request
 */


server.use('/categories', categoriesRoute)


/**
 * @openapi
 * '/users/login':
 *  post:
 *     tags:
 *     - User
 *     summary: login user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *              required:
 *                  - email;
 *                  - password
 *     responses:
 *      200:
 *        description: ok
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * '/users/register':
 *  post:
 *     tags:
 *     - User
 *     summary: register user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *              required:
 *                  - email;
 *                  - password
 *     responses:
 *      200:
 *        description: ok
 *      400:
 *        description: Bad request
 */
server.use('/users', usersRoute)
server.use('/orders', ordersRoute)

};

