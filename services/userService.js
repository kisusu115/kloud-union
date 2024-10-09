const User = require('../models/userModel');

// 사용자 생성 서비스
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error('User creation failed: ' + error.message);
  }
};

// 모든 사용자 조회 서비스
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error('Fetching users failed: ' + error.message);
  }
};

// 특정 사용자 조회 서비스
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Fetching user by ID failed: ' + error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById
};
