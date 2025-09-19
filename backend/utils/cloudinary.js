const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dregpys2y',
  api_key: '372246168222655',
  api_secret: 'UTjZNZd9OI-nd_FSUGOjOcfr_js'
});

module.exports = cloudinary;
