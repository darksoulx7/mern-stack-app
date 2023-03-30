const express = require('express');
const {  getUsers } = require('./services');

const app = express();
const router = express.Router();

app.use(express.json());

router.get('/', getUsers);

module.exports = router;

