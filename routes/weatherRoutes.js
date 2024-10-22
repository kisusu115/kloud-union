const express = require('express');
const { getHourlyPrecipitation } = require('../controllers/weatherController');

const router = express.Router();

/**
 * @swagger
 * /api/weather/info:
 *   get:
 *     summary: "시간별 강수량 조회"
 *     tags: [Weather]
 *     description: "주어진 X, Y 좌표에 대한 시간별 강수량 정보를 조회합니다."
 *     parameters:
 *       - in: query
 *         name: nx
 *         required: true
 *         schema:
 *           type: string
 *         description: "X 좌표 (gridX 형태)"
 *         example: "60"
 *       - in: query
 *         name: ny
 *         required: true
 *         schema:
 *           type: string
 *         description: "Y 좌표 (gridY 형태)"
 *         example: "127"
 *     responses:
 *       200:
 *         description: "강수량 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 precipitationList:
 *                   type: string
 *                   description: "1시간 강수량 정보"
 *                   example: "0.5"
 *       400:
 *         description: "잘못된 요청 (nx, ny 값이 누락됨)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "nx, ny 값이 필요합니다."
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
 *                   example: "Error fetching weather data"
 */
router.get('/info', getHourlyPrecipitation);

module.exports = router;