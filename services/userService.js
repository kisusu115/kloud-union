const User = require('../models/userModel');

// 모든 사용자 조회
const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error('Error fetching users');
    }
};

// 특정 사용자 조회
const findUserByUsername = async (username) => {
    try {
        return await User.findOne({ username });
    } catch (error) {
        throw error;
    }
};

// 사용자 정보 수정
const updateUserByUsername = async (username, updateData) => {
    try {
        return await User.findOneAndUpdate({ username }, updateData, { new: true, runValidators: true });
    } catch (error) {
        throw new Error('Error updating user');
    }
};

module.exports = {
    getAllUsers,
    findUserByUsername,
    updateUserByUsername,
};
