const getOrder  = require('./getOrder');
const getOrders  = require('./getOrders');
const createOrder  = require('./createOrder');
const getUserOrders = require('./getUserOrders');
const updateOrderToPaid  = require('./updateOrderToPaid');
const updateOrderToDelivered  = require('./updateOrderToDelivered');
const getOrderForAnalysis  = require('./getOrderForAnalysis');

module.exports = {
    getUserOrders,
    getOrder,
    getOrders,
    getOrderForAnalysis,
    createOrder,
    updateOrderToDelivered,
    updateOrderToPaid
};

