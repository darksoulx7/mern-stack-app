const express = require('express');
const { getCategories, createCategory } = require('./services');

const app = express();
const router = express.Router();

app.use(express.json());

router.get('/', getCategories);
router.post('/', createCategory);

module.exports = router;

