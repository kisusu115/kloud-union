const express = require('express');
const { getUsers, redirectToKakao } = require('../controllers/userController');

const router = express.Router();

// GET 요청으로 모든 사용자 조회
router.get('/', getUsers);

// GET 요청으로 모든 사용자 조회
router.get('/login', redirectToKakao);

module.exports = router;
