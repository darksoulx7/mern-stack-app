const express = require('express');
const { getCategories, createCategory, deleteCategory, saveAttr } = require('./services');

const app = express();
const router = express.Router();

app.use(express.json());

router.get('/', getCategories);
router.post('/', createCategory);
router.delete('/:category', deleteCategory);
router.post('/attr', saveAttr);

module.exports = router;

