const express = require('express');
const {  getOrders } = require('./services');

const app = express();
const router = express.Router();

app.use(express.json());

router.get('/', getOrders);

module.exports = router;

