const express = require('express');
const {  getCategories } = require('./services');

const app = express();
const router = express.Router();

app.use(express.json());

router.get('/', getCategories);

module.exports = router;

