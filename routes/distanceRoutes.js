const express = require('express');
const { calculateDistance, calculateTime } = require('../controllers/distanceController');

const router = express.Router();

/**
 * @swagger
 * /api/distance/meter:
 *   post:
 *     summary: "이동 거리(m) 계산"
 *     tags: [Distance]
 *     description: "주어진 시작 좌표와 종료 좌표 간의 거리(m)를 계산합니다."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startLongitude:
 *                 type: number
 *                 description: "시작 경도"
 *                 example: 127.143983
 *               startLatitude:
 *                 type: number
 *                 description: "시작 위도"
 *                 example: 37.493208
 *               endLongitude:
 *                 type: number
 *                 description: "종료 경도"
 *                 example: 127.134817
 *               endLatitude:
 *                 type: number
 *                 description: "종료 위도"
 *                 example: 37.498093
 *     responses:
 *       200:
 *         description: "거리 계산 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 distance:
 *                   type: number
 *                   description: "계산된 거리 (미터)"
 *                   example: 1001
 *       500:
 *         description: "서버 내부 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 message:
 *                   type: string
 *                   example: "서버 내부 오류 발생"
 */
router.post('/meter', calculateDistance);

/**
 * @swagger
 * /api/distance/seconds:
 *   post:
 *     summary: "이동 소요시간(초) 계산"
 *     tags: [Distance]
 *     description: "주어진 시작 좌표와 종료 좌표 간의 이동 시간(s)을 계산합니다."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startLongitude:
 *                 type: number
 *                 description: "시작 경도"
 *                 example: 127.143983
 *               startLatitude:
 *                 type: number
 *                 description: "시작 위도"
 *                 example: 37.493208
 *               endLongitude:
 *                 type: number
 *                 description: "종료 경도"
 *                 example: 127.134817
 *               endLatitude:
 *                 type: number
 *                 description: "종료 위도"
 *                 example: 37.498093
 *               speed:
 *                 type: number
 *                 description: "이동 속도 (km/h)"
 *                 example: 30
 *     responses:
 *       200:
 *         description: "이동 시간 계산 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 moveTime:
 *                   type: number
 *                   description: "계산된 이동 시간 (초)"
 *                   example: 763
 *       500:
 *         description: "서버 내부 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 message:
 *                   type: string
 *                   example: "서버 내부 오류 발생"
 */
router.post('/seconds', calculateTime);

module.exports = router;
