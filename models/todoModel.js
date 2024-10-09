const todoSchema = new mongoose.Schema({
  userSnsId: {
    type: String,
    required: true,
    ref: 'User',
  },
  timeTaken: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

 const Todo = mongoose.model('Todo', todoSchema);

 module.exports = Todo
