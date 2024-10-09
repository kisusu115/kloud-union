const express = require('express');
const { getUsers, redirectToKakao } = require('../controllers/userController');

const router = express.Router();

// GET 요청으로 모든 사용자 조회
router.get('/', getUsers);

// 로그인 요청 카카오로 리다이렉트
router.post('/login', redirectToKakao);

// 라우팅에 USER ID 정보 추가되어야 할 듯?
// 자신의 정보 조회
//router.get('/profile', getUserInfo);

// 사용자 키, 나이, 보폭 등 사용자 정보 수정 >> patch와 통합
//router.post('/profile', addUserInfo);

// 회원 탈퇴
//router.delete('/profile', getUserInfo);

module.exports = router;
