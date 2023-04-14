const express = require('express');
const router = express.Router();

const { getCategories, createCategory, deleteCategory, saveAttr } = require('./services');
const { verifyIsLoggedIn, verifyIsAdmin } = require('../../commons/middleware/verifyAuthToken');

router.get('/', getCategories);

router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.post('/', createCategory);
router.delete('/:category', deleteCategory);
router.post('/attr', saveAttr);

module.exports = router;

