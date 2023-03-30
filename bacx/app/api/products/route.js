const express = require('express');
const {  getProducts } = require('./services');

const app = express();
const router = express.Router();

app.use(express.json());

router.get('/', getProducts);

module.exports = router;

