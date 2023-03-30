const { productsRoute, usersRoute, categoriesRoute, ordersRoute } = require('./api')

module.exports = (server) =>  {

server.use('/products', productsRoute)
server.use('/categories', categoriesRoute)
server.use('/users', usersRoute)
server.use('/orders', ordersRoute)

};

