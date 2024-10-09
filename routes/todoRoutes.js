const express = require('express');
const { getMethodName, postMethodName } = require('../controllers/emptyController');

const router = express.Router();

// GET 요청
router.get('/', postMethodName);

// POST 요청
router.post('/', getMethodName);

module.exports = router;