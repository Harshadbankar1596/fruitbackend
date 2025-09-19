const express = require('express');
const {  verifyOTP, getAllUsers, deleteUser, resendOTP,  sendOTP, getUserById, logoutUser } = require('../../controllers/userController/authController');
const router = express.Router();


// router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', sendOTP);

// routes/userRoutes.js
router.post('/logout', logoutUser);

router.get('/',getAllUsers);
router.get('/user/:userId', getUserById);
router.get('/delete/:id', deleteUser);
router.post('/resent-otp', resendOTP);
module.exports = router;
