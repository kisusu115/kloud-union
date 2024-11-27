const express = require('express');
const { getHourlyPrecipitation, sendWeatherInfo } = require('../controllers/weatherController');

const router = express.Router();

/**
 * @swagger
 * /api/weather/info:
 *   get:
 *     summary: "요청 시각에 따른 날씨 정보 조회"
 *     tags: [Weather]
 *     description: "요청 시각에 해당하는 하늘 상태 코드(맑음(1), 구름많음(3), 흐림(4))와 해당일 시간별 기온 리스트, 강수확률 리스트를 반환합니다."
 *     parameters:
 *       - in: query
 *         name: longitude
 *         required: true
 *         schema:
 *           type: string
 *         description: "X 좌표 (경도 값), 로직 내부에선 gridX로 변환되어 사용됨"
 *         example: "127.071089"
 *       - in: query
 *         name: latitude
 *         required: true
 *         schema:
 *           type: string
 *         description: "Y 좌표 (위도 값), 로직 내부에선 gridY로 변환되어 사용됨"
 *         example: "37.540578"
 *     responses:
 *       200:
 *         description: "날씨 정보 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 skyStatus:
 *                   type: number
 *                   description: "하늘 상태 코드 (1: 맑음, 3: 구름많음, 4: 흐림)"
 *                   example: 1
 *                 tmpList:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *                   description: "시간별 기온 정보 (시간: 기온)"
 *                   example:
 *                     "0600": -1
 *                     "0700": 3
 *                     "0800": 5
 *                     "0900": 8
 *                     "1000": 10
 *                     "1100": 12
 *                     "1200": 15
 *                     "1300": 17
 *                     "1400": 19
 *                     "1500": 20
 *                     "1600": 18
 *                     "1700": 16
 *                     "1800": 14
 *                     "1900": 12
 *                     "2000": 10
 *                     "2100": 8
 *                     "2200": 5
 *                     "2300": 3
 *                 popList:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *                   description: "시간별 강수 확률 정보 (시간: 강수 확률)"
 *                   example:
 *                     "0600": 0
 *                     "0700": 0
 *                     "0800": 0
 *                     "0900": 0
 *                     "1000": 10
 *                     "1100": 10
 *                     "1200": 20
 *                     "1300": 20
 *                     "1400": 20
 *                     "1500": 20
 *                     "1600": 10
 *                     "1700": 10
 *                     "1800": 10
 *                     "1900": 0
 *                     "2000": 0
 *                     "2100": 0
 *                     "2200": 0
 *                     "2300": 0
 *       400:
 *         description: "잘못된 요청 (longitude, latitude 값이 누락됨)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "longitude, latitude 값이 필요합니다."
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
router.get('/info', sendWeatherInfo);

module.exports = router;