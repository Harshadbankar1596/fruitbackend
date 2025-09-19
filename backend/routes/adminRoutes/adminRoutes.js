const express = require('express');
const { registerAdmin, loginAdmin } = require('../../controllers/adminController/adminController');
const router = express.Router();
// const { registerAdmin, loginAdmin } = require('../controllers/adminController');

router.post('/register', registerAdmin); // Optional: for first time setup
router.post('/login', loginAdmin);

module.exports = router;
