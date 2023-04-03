const express = require('express');
const { getCategories, createCategory, deleteCategory } = require('./services');

const app = express();
const router = express.Router();

app.use(express.json());

router.get('/', getCategories);
router.post('/', createCategory);
router.delete('/:category', deleteCategory);

module.exports = router;

