const mongoose = require('mongoose');


const exerciseSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true },
  description: { 
    type: String, 
    required: true },
  duration: { 
    type: Number,
    default: 1, 
    required: true 
  },
  reps: {
    type: Number,
    default: 0,
    required: false
  },
  sets: {
    type: Number,
    default: 0,
    required: false
  },
  distance: {
    type: Number,
    default: 0,
    required: false
  },
  date: { 
    type: Date, 
    required: true },
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;