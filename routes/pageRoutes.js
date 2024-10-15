const express = require('express');
const { authenticateSession } = require('../middlewares/authMiddleware');
const { findUserBySnsId } = require('../services/userService');

const router = express.Router();

// 메인 페이지 라우트
router.get('/main', authenticateSession, async (req, res) => {
    try {
        const user = await getUserProfile(req, res); // getUserProfile 호출하여 사용자 정보 가져오기
        res.render('mainPage', { user }); // 가져온 사용자 정보로 mainPage 렌더링
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
});

// 마이페이지 라우트
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
