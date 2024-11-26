const mongoose = require('mongoose');

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *            description: cognito 설정 id
 *            example: 'usernameExample'
 *          weight:
 *            type: number
 *            description: 거리 계산 가중치값
 *            example: 1
 *          age:
 *            type: number
 *            description: 사용자 나이
 *            example: 24
 *          gender:
 *            type: string
 *            description: 사용자 성별
 *            enum:
 *              - Male
 *              - Female
 *            example: 'Male'
 *          height:
 *            type: number
 *            description: 사용자 키 (cm 단위)
 *            example: 175
 *          stationName:
 *            type: string
 *            description: 사용자가 지정한 역 이름
 *            example: '건대입구'
 *          line:
 *            type: number
 *            description: 사용자가 사용하는 호선 번호
 *            example: 2
 *          upDown:
 *            type: number
 *            description: 사용자 이용 노선 상/하행 정보
 *            example: 1
 *          timeToLeave:
 *            type: number
 *            description: 사용자가 해당 역에서 열차에 탑승해야 할 최소 시각, "hh:mm:ss" 형식
 *            example: '06:25:00'
 *          createdAt:
 *            type: string
 *            format: date-time
 *            description: 사용자 생성 날짜
 *            example: '2024-10-12T05:16:15.261Z'
 *          updatedAt:
 *            type: string
 *            format: date-time
 *            description: 사용자 정보 수정 날짜
 *            example: '2024-10-12T05:16:15.261Z'
 *          __v:
 *            type: number
 *            description: MongoDB 내부 버전 키
 *            example: 0
 *        required:
 *          - snsId
 *          - nickname
 *          - weight
 */

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  weight: {
    type: Number,
    required: true,
    default: 1,
  },
  age: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    default: null,
  },
  height: {
    type: Number,
    default: null,
  },
  latitude: {
    type: Number,
    default: null,
  },
  longitude: {
    type: Number,
    default: null,
  },
  stationName: {
    type: String,
    default: null,
  },
  line: {
    type: Number,
    default: null,
  },
  upDown: {
    type: Number,
    enum: [1, 2],
    default: null,
  },
  timeToLeave: {
    type: String,
    default: null,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
