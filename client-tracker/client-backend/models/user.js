const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  currentweight: {
    type: Number,
    required: false
  },
  goalweight: {
    type: Number,
    required: false
  },
  daysperweek: {
    type: Number,
    required: false
  },
  poundslost: {
    type: Number,
    required: false
  },
  ontrack: {
    type: String,
    required: true
  }
  
}, {
  timestamps: true,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
