const express = require('express');
const { getStationChoices, getStationTimeTable } = require('../controllers/subwayController');

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

/**
 * @swagger
 * /api/subway/timeTable:
 *   post:
 *     summary: 특정 역의 지하철 시간표 조회
 *     tags: [Subway]
 *     description: 주어진 역 이름, 노선 번호, 상하행 정보를 기반으로 해당 역의 지하철 시간표를 조회합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stationName:
 *                 type: string
 *                 description: 사용자가 선택한 지하철 역 이름
 *                 example: "건대입구"
 *               line:
 *                 type: number
 *                 description: 사용자가 선택한 지하철 노선 번호
 *                 example: 2
 *               upDown:
 *                 type: number
 *                 description: 상행선(1) 또는 하행선(2)
 *                 example: 1
 *     responses:
 *       200:
 *         description: 해당 역의 지하철 시간표 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "05:43:20"
 *             examples:
 *               example-1:
 *                 value: [
 *                   "05:43:20",
 *                   "05:54:30",
 *                   "06:07:30",
 *                   "06:19:20",
 *                   "06:29:20",
 *                   "06:40:50",
 *                   "06:48:20",
 *                   "06:55:50",
 *                   "07:02:50"
 *                 ]
 *       400:
 *         description: 요청 파라미터가 잘못되었거나 누락되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "stationName, line, or upDown is required"
 *       404:
 *         description: 해당 역의 시간표를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No timetable found for the given station"
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
router.post('/timeTable', getStationTimeTable);

module.exports = router;
