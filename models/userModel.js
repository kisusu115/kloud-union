const mongoose = require('mongoose');

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