const express = require('express');
const { getStationChoices } = require('../controllers/subwayController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Subway
 *   description: 지하철 관련 API
 */

/**
 * @swagger
 * /api/subway/choices:
 *   get:
 *     summary: 특정 역 이름으로 지하철 노선과 상하행 정보 조회
 *     tags: [Subway]
 *     description: 주어진 지하철 역 이름으로 해당 역에 대한 노선 번호와 상행/하행 정보를 조회합니다.
 *     parameters:
 *       - in: query
 *         name: stationName
 *         schema:
 *           type: string
 *         required: true
 *         description: 조회할 지하철 역 이름
 *         example: "건대입구"
 *     responses:
 *       200:
 *         description: 주어진 역 이름에 해당하는 노선과 상하행 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   stationName:
 *                     type: string
 *                     example: "건대입구"
 *                   line:
 *                     type: number
 *                     example: 2
 *                   upDown:
 *                     type: number
 *                     example: 1
 *             examples:
 *               example-1:
 *                 value:
 *                   - stationName: "건대입구"
 *                     line: 2
 *                     upDown: 1
 *                   - stationName: "건대입구"
 *                     line: 2
 *                     upDown: 2
 *                   - stationName: "건대입구"
 *                     line: 7
 *                     upDown: 1
 *                   - stationName: "건대입구"
 *                     line: 7
 *                     upDown: 2
 *       400:
 *         description: stationName 파라미터가 필요합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "stationName is required"
 *       404:
 *         description: 해당 역에 대한 노선을 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No lines found for the given station name"
 *       500:
 *         description: 서버 오류 발생
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error"
 */

router.get('/choices', getStationChoices);

module.exports = router;
