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
const findUserBySnsId = async (snsId) => {
    try {
        return await User.findOne({ snsId });
    } catch (error) {
        throw error;
    }
};

// 사용자 정보 수정
const updateUserBySnsId = async (snsId, updateData) => {
    try {
        return await User.findOneAndUpdate({ snsId }, updateData, { new: true, runValidators: true });
    } catch (error) {
        throw new Error('Error updating user');
    }
};

module.exports = {
    getAllUsers,
    findUserBySnsId,
    updateUserBySnsId,
};
