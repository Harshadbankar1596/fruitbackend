const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  contact: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
