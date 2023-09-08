const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1000,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model('Message', messageSchema);
