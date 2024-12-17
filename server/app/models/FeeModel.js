const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Exam Fee', 'Application Fee'],
    required: true
  },
  category: {
    type: String,
    enum: ['INDIAN', 'FOREIGN', 'NRI', 'SAARC'],
    required: true
  },
  course: {
    type: String,
    enum: ['ALL_COURSES', 'UG', 'UG-DIPLOMA', 'PG'], 
    required: true
  },
  level: {
    type: String,
    enum: ['ALL_LEVEL', 'UG', 'UG-DIPLOMA', 'PG'],
    required: false 
  },
  amount: {
    type: Number,
    required: true
  }
});

const Fee = mongoose.model('Fee', FeeSchema);

module.exports = Fee;
