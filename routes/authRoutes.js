const express = require('express');
const { kakaoAuthenticate, kakaoAuthenticateCallback } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 카카오 관련 API(서버 로직)
 */

/**
 * @swagger
 * /auth/kakao:
 *   get:
 *     summary: 카카오 인증 페이지로 리다이렉트
 *     tags: [Auth]
 *     description: 사용자가 카카오 로그인 페이지로 리다이렉트됩니다.
 *     responses:
 *       302:
 *         description: 카카오 로그인 페이지로 성공적으로 리다이렉트됩니다.
 *       500:
 *         description: 서버 오류 발생.
 */
router.get('/kakao', kakaoAuthenticate);

/**
 * @swagger
 * /auth/kakao/callback:
 *   get:
 *     summary: 카카오 로그인 인증 콜백
 *     tags: [Auth]
 *     description: 카카오 로그인이 성공하면 카카오가 이 URL로 리다이렉트합니다. 실패하면 `/`로 리다이렉트됩니다.
 *     responses:
 *       302:
 *         description: 성공적으로 인증된 후 환영 페이지로 리다이렉트됩니다.
 *       400:
 *         description: 인증이 실패하여 루트 페이지로 리다이렉트됩니다.
 *       500:
 *         description: 서버 오류 발생.
 */
router.get('/kakao/callback', kakaoAuthenticateCallback);

module.exports = router;
