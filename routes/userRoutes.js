const express = require('express');
const { getUsers, getUserProfile, updateUserProfile, redirectToKakao } = require('../controllers/userController');
const { authenticateSession } = require('../middlewares/authMiddleware');
const router = express.Router();

// GET 요청으로 모든 사용자 조회
router.get('/', getUsers);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: 유저 계정 관련 API
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: 카카오 로그인 요청
 *     tags: [User]
 *     description: 사용자가 카카오 로그인 페이지로 리다이렉트됩니다.
 *     responses:
 *       302:
 *         description: 카카오 로그인 페이지로 성공적으로 리다이렉트됩니다.
 *       500:
 *         description: 서버 오류 발생.
 */
router.post('/login', redirectToKakao);

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: 특정 사용자 정보 조회
 *     tags: [User]
 *     description: session을 통해 snsId를 사용하여 특정 사용자의 정보를 조회합니다.
 *     responses:
 *       200:
 *         description: 성공적으로 사용자 정보를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               user:
 *                 value: {
 *                   "_id": "670a82d3149a8c0f5689f57f",
 *                   "snsId": "3739459145",
 *                   "nickname": "제형",
 *                   "weight": 1,
 *                   "age": null,
 *                   "gender": null,
 *                   "height": null,
 *                   "stationName": null,
 *                   "line": null,
 *                   "upDown": null,
 *                   "createdAt": "2024-10-12T14:08:19.219Z",
 *                   "updatedAt": "2024-10-12T14:08:19.219Z",
 *                   "__v": 0
 *                 }
 *       400:
 *         description: session에 snsId가 포함되지 않았습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'snsId is required'
 *       404:
 *         description: 해당 사용자 정보를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'User not found'
 *       500:
 *         description: 서버 오류 발생.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Server error'
 */
router.get('/profile', authenticateSession, getUserProfile);

/**
 * @swagger
 * /api/user/profile:
 *   post:
 *     summary: 사용자 정보 수정
 *     tags: [User]
 *     description: 사용자 정보를 수정합니다. 나이, 성별, 키 등의 정보를 수정할 수 있습니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               age:
 *                 type: number
 *                 description: 사용자의 나이
 *                 example: 30
 *               gender:
 *                 type: string
 *                 description: 사용자의 성별
 *                 example: 'male'
 *               height:
 *                 type: number
 *                 description: 사용자의 키
 *                 example: 175
 *     responses:
 *       200:
 *         description: 성공적으로 사용자 정보가 수정되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               user:
 *                 value: {
 *                   "_id": "670a82d3149a8c0f5689f57f",
 *                   "snsId": "3739459145",
 *                   "nickname": "제형",
 *                   "weight": 1,
 *                   "age": null,
 *                   "gender": null,
 *                   "height": null,
 *                   "stationName": null,
 *                   "line": null,
 *                   "upDown": null,
 *                   "createdAt": "2024-10-12T14:08:19.219Z",
 *                   "updatedAt": "2024-10-12T14:08:19.219Z",
 *                   "__v": 0
 *                 }
 *       400:
 *         description: 요청에 snsId가 포함되지 않았습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'snsId is required'
 *       404:
 *         description: 해당 사용자 정보를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'User not found'
 *       500:
 *         description: 서버 오류 발생.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Server error'
 */
router.post('/profile', updateUserProfile);

// 회원 탈퇴 (주석 처리된 부분)
// router.delete('/profile', getUserInfo);

module.exports = router;
