const express = require('express');
const path = require('path');
const { authenticateSession } = require('../middlewares/authMiddleware');
const { findUserBySnsId } = require('../services/userService');

const router = express.Router();

/**
 * @swagger
 * /api/page/login:
 *   get:
 *     summary: 로그인 페이지 반환 - 기존 동적페이지 반환 로직
 *     description: 로그인 페이지를 클라이언트에게 반환합니다.
 *     tags: [Page]
 *     responses:
 *       200:
 *         description: 로그인 페이지가 성공적으로 반환되었습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 서버 오류가 발생했습니다.
 */
router.get('/login', (req, res) => {
    res.sendFile('loginPage.html', { root: 'public' });
});

/**
 * @swagger
 * /api/page/main:
 *   get:
 *     summary: 메인 페이지 렌더링 - 기존 동적페이지 반환 로직
 *     description: 인증된 사용자 정보를 기반으로 메인 페이지를 렌더링합니다.
 *     tags: [Page]
 *     responses:
 *       200:
 *         description: 메인 페이지가 성공적으로 렌더링되었습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 서버 오류가 발생했습니다.
 */
router.get('/main', authenticateSession, async (req, res) => {
    try {
        const user = await getUserProfile(req, res); // getUserProfile 호출하여 사용자 정보 가져오기
        res.render('mainPage', { user }); // 가져온 사용자 정보로 mainPage 렌더링
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
});

/**
 * @swagger
 * /api/page/my:
 *   get:
 *     summary: 마이페이지 렌더링 - 기존 동적페이지 반환 로직
 *     description: 인증된 사용자 정보를 기반으로 마이페이지를 렌더링합니다.
 *     tags: [Page]
 *     responses:
 *       200:
 *         description: 마이페이지가 성공적으로 렌더링되었습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 서버 오류가 발생했습니다.
 */
router.get('/my', authenticateSession, async (req, res) => {
    try {
        const user = await getUserProfile(req, res); // getUserProfile 호출하여 사용자 정보 가져오기
        res.render('myPage', { user }); // 가져온 사용자 정보로 myPage 렌더링
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
});

const getUserProfile = async (req) => {
    const snsId = req.user ? req.user.snsId : null; // snsId 가져오기
    if (!snsId) {
        throw new Error('snsId is required'); // 에러 처리
    }
    console.log(snsId);
    
    // 사용자 정보를 가져오는 로직
    const user = await findUserBySnsId(snsId); // 예시로 MongoDB에서 사용자 찾기
    console.log(user);
    return user; // 사용자 정보를 반환
};

module.exports = router;
