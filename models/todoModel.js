const mongoose = require('mongoose');

// 사용자 스키마 정의
const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema); // const User = mongoose.model('Todo', todoSchema, 'todo_collection_name');

module.exports = Todo;
