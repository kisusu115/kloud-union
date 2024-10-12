const express = require('express');
const { getUsers, getUserProfile, updateUserProfile, redirectToKakao } = require('../controllers/userController');

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
 *     description: snsId를 사용하여 특정 사용자의 정보를 조회합니다.
 *     parameters:
 *       - in: query
 *         name: snsId
 *         required: true
 *         description: 카카오 발급 ID
 *         schema:
 *           type: string
 *           example: '3739609966'
 *     responses:
 *       200:
 *         description: 성공적으로 사용자 정보를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
router.get('/profile', getUserProfile);

/**
 * @swagger
 * /api/user/profile:
 *   post:
 *     summary: 사용자 정보 수정
 *     tags: [User]
 *     description: 사용자 정보를 수정합니다. snsId로 사용자를 식별하고 나이, 성별, 키 등의 정보를 수정할 수 있습니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               snsId:
 *                 type: string
 *                 description: 카카오 발급 ID
 *                 example: '3739609966'
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
