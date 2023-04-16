const {  getUserOrders, getOrder, getOrders, getOrderForAnalysis, createOrder, updateOrderToDelivered, updateOrderToPaid } = require('./services');
const { verifyIsAdmin, verifyIsLoggedIn } = require('../../commons/middleware/verifyAuthToken');

const express = require('express');
const router = express.Router();

// user routes
router.use(verifyIsLoggedIn);
router.get('/', getUserOrders);
router.get("/user/:id", getOrder);
router.post("/", createOrder);
router.put("/paid/:id", updateOrderToPaid);

// admin routes
router.use(verifyIsAdmin)
router.use(verifyIsAdmin)
router.put("/delivered/:id", updateOrderToDelivered);
router.get("/admin", getOrders);
router.get("/analysis/:date", getOrderForAnalysis);

module.exports = router;