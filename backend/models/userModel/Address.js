// models/Address.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming your user model is named 'User'
    required: true
  },
  username: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  locality: {
    type: String,
    required: true
  },
  flatOrBuilding: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);
