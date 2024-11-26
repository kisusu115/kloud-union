const axios = require('axios');
const express = require('express');
const querystring = require('querystring');
const { verifyToken } = require('../middlewares/cognitoMiddleware');
const { cognitoAuthenticate, cognitoAuthenticateCallback } = require('../controllers/cognitoController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cognito
 *   description: Cognito 관련 API
 */

/**
 * @swagger
 * /api/cognito/login:
 *   get:
 *     summary: Cognito 로그인 페이지로 리다이렉트
 *     tags: [Cognito]
 *     description: 사용자가 Cognito 로그인 페이지로 리다이렉트됩니다.
 *     responses:
 *       302:
 *         description: Cognito 로그인 페이지로 성공적으로 리다이렉트됩니다.
 *       500:
 *         description: 서버 오류 발생.
 */
router.get('/login', cognitoAuthenticate);

/**
 * @swagger
 * /api/cognito/callback:
 *   get:
 *     summary: Cognito 로그인 페이지에서의 콜백 지정 API
 *     tags: [Cognito]
 *     description: 인증 성공 시, 클라이언트에게 JWT 토큰 발급
 *     responses:
 *       200:
 *         description: 정상적으로 인증 진행 시 클라이언트에게 JWT 토큰 발급한다.
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 summary: 인증 성공
 *                 value:
 *                   access_token: "eyJraWQiOiJtaWFwdnlidGZHUUpo..."
 *                   id_token: "eyJraWQiOiIwNm1GbTR6dVhRTjB5..."
 *                   refresh_token: "eyJjdHkiOiJKV1QiLCJlbmMiOiJ..."
 *       500:
 *         description: 서버 오류 발생.
 */

router.get('/callback', cognitoAuthenticateCallback);

router.get('/test', verifyToken, (req, res) => {
    // JWT 토큰 검증을 통과한 후, 사용자의 정보를 사용할 수 있습니다.
    const { username } = req.user; // 이미 JWT에서 디코드된 사용자 정보가 req.user에 저장됨
    res.json({ message: `Hello, ${username}` });
});

module.exports = router;
