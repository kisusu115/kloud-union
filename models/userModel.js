const mongoose = require('mongoose');

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *            description: 사용자 MongoDB ID
 *            example: '670a061f58d6a0a0526021c7'
 *          snsId:
 *            type: string
 *            description: kakao 발급 id
 *            example: '3745557996'
 *          nickname:
 *            type: string
 *            description: kakao username
 *            example: '홍길동'
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
  snsId: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
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
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
