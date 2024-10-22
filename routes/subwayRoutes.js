const express = require('express');
const { getStationChoices, getStationTimeTable, getProperTime, getRealTimes, getCoordinate } = require('../controllers/subwayController');

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

/**
 * @swagger
 * /api/subway/properTime:
 *   post:
 *     summary: 출발 전 적절한 지하철 시간 조회
 *     tags: [Subway]
 *     description: 주어진 역 이름, 노선 번호, 상하행 정보 및 출발 시각을 기준으로 적절한 지하철 시간을 조회합니다.
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
 *               timeToLeave:
 *                 type: string
 *                 description: 사용자가 출발해야 할 시각 (HH:mm:ss 형식)
 *                 example: "06:25:00"
 *     responses:
 *       200:
 *         description: 출발 시각에 맞는 적절한 지하철 시간 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 properTime:
 *                   type: string
 *                   description: 가장 가까운 지하철 도착 시간
 *                   example: "06:19:20"
 *       400:
 *         description: 요청 파라미터가 잘못되었거나 누락되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "stationName, line, upDown, or timeToLeave is required"
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
router.post('/properTime', getProperTime);

/**
 * @swagger
 * /api/subway/realTime:
 *   post:
 *     summary: 지하철 실시간 도착 정보 조회
 *     tags: [Subway]
 *     description: 주어진 역 이름, 노선 번호 및 상하행 정보를 기준으로 지하철의 실시간 도착 정보를 조회합니다.
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
 *         description: 요청한 지하철의 실시간 도착 정보 반환, 결과 값이 2개면 first/second로, 1개면 first로 응답
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first:
 *                   type: number
 *                   description: 첫 번째 지하철 도착 시간 (초 단위)
 *                   example: 60
 *                 second:
 *                   type: number
 *                   description: 두 번째 지하철 도착 시간 (초 단위)
 *                   example: 330
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
 *         description: 해당 역의 실시간 도착 정보를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No arrival data found for the given station"
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
router.post('/realTime', getRealTimes);

/**
 * @swagger
 * /api/subway/coordinate:
 *   post:
 *     summary: 특정 역의 좌표 정보 조회
 *     tags: [Subway]
 *     description: 주어진 역 이름과 노선 번호를 기반으로 해당 역의 좌표(위도, 경도)를 조회합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stationName:
 *                 type: string
 *                 description: 조회할 지하철 역 이름
 *                 example: "건대입구"
 *               line:
 *                 type: number
 *                 description: 조회할 지하철 노선 번호
 *                 example: 2
 *     responses:
 *       200:
 *         description: 해당 역의 좌표 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 latitude:
 *                   type: number
 *                   description: 지하철 역의 위도
 *                   example: 37.540705
 *                 longitude:
 *                   type: number
 *                   description: 지하철 역의 경도
 *                   example: 127.07047
 *       400:
 *         description: 역 이름이나 노선 번호가 누락되었거나 잘못되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "stationName and line are required"
 *       404:
 *         description: 해당 역을 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Station not found"
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
router.post('/coordinate', getCoordinate);

module.exports = router;
