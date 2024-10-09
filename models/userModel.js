const mongoose = require('mongoose');

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  snsId: {
    type: String,
    required: true,
    unique: true, // 소셜 플랫폼에서 제공하는 고유 ID
  },
  providerType: {
    type: String,
    enum: ['kakao', 'google', 'facebook'], // 일단 kakao 만 구현 예정이긴함
    required: true,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;