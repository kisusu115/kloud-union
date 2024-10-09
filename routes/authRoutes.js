const express = require('express');
const { kakaoAuthenticate, kakaoAuthenticateCallback } = require('../controllers/authController');

const router = express.Router();

router.get('/kakao', kakaoAuthenticate);

// 위에서 카카오 서버 로그인이 되면, 카카오 redirect url 설정에 따라 자동으로 이 라우터로 오게 됨.
router.get('/kakao/callback', kakaoAuthenticateCallback);

module.exports = router;