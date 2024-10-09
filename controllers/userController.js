const User = require('../models/userModel');

// 카카오 로그인 창으로 리다이렉트
const redirectToKakao = async (req, res) => {
  try {
    res.status(302).redirect('/auth/kakao');
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

// 모든 사용자 조회
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

module.exports = {
  getUsers,
  redirectToKakao,
};
