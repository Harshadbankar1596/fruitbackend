

const twilio = require('twilio');
const User = require('../../models/userModel/User');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const otpStore = {}; // In-memory store (replace with Redis in production)

// ✅ Send OTP (login or create user)
// exports.sendOTP = async (req, res) => {
//   const { name, contact } = req.body;

//   try {
//     let user = await User.findOne({ name, contact });

//     // If user not found, create one
//     if (!user) {
//       user = await User.create({ name, contact });
//     }

//     const otp = Math.floor(1000 + Math.random() * 9000);
// console.log("user  Otp ",otp);
//     // Send OTP using Twilio
//     await client.messages.create({
//       body: `Your OTP is: ${otp}`,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: contact.startsWith('+') ? contact : `+91${contact}`,
//     });

//     otpStore[user._id] = otp;

//     res.status(200).json({ message: 'OTP sent successfully', userId: user._id });
//   } catch (error) {
//     console.error('Send OTP Error:', error);
//     res.status(500).json({ message: 'Failed to send OTP' });
//   }
// };

exports.sendOTP = async (req, res) => {
  const { name, contact } = req.body;

  try {
    let user = await User.findOne({ name, contact });

    if (!user) {
      user = await User.create({ name, contact });
    }

    const otp = 1234; // ✅ Static OTP
    console.log("Static OTP for user:", otp);

    // ❌ Remove Twilio sending part

    otpStore[user._id] = otp;

    res.status(200).json({ message: 'Static OTP set successfully', userId: user._id });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};


// ✅ Verify OTP and login
exports.verifyOTP = async (req, res) => {
  const { userId, otp } = req.body;
  console.log(req.body);

  const storedOtp = otpStore[userId]
  if (!storedOtp || parseInt(otp) !== storedOtp) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
console.log("user token vvv",token);
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  });

  delete otpStore[userId];

  res.status(200).json({ message: 'Login successful' });
};

// ✅ Resend OTP (using userId)
exports.resendOTP = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(1000 + Math.random() * 9000);

    await client.messages.create({
      body: `Your new OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: user.contact.startsWith('+') ? user.contact : `+91${user.contact}`,
    });

    otpStore[user._id] = otp;

    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    console.error('Resend OTP Error:', error);
    res.status(500).json({ message: 'Failed to resend OTP' });
  }
};

// ✅ Optional: get all users
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-otp');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Fetch User Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// ✅ Optional: delete user
// exports.deleteUser = async (req, res) => {
//   try {
//     const deleted = await User.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Delete User Error:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };







exports.deleteUser = asyncHandler(async (req, res) => {
  // console.log(req.params.id);
  // const user = await User.findByIdAndDelete(req.params._id);
  // console.log("Deleted user:", user);
    const user1 = await User.findById(req.params._id)
  // console.log(user1)

  // console.log(user);
  // if (!user) {  
  //     return res.status(404).json({ message: "user not found" });
  // }
  res.status(200).json({ message: "user deleted successfully" });
});







// ✅ Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-otp'); // Exclude OTP if stored in DB
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error('Get All Users Error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};


// ✅ Logout user (clear token cookie)
exports.logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({ message: 'Logged out successfully' });
};
























// const twilio = require('twilio');
// const User = require('../../models/userModel/User');
// // const User = require('../models/User');
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// const otpStore = {}; // In-memory storage (use Redis in production)
// const jwt = require('jsonwebtoken');

// exports.sendOTP = async (req, res) => {
//   const { name, contact } = req.body;

//   try {
//     // Check if user exists, if not create one
//     let user = await User.findOne({ name, contact });
//     if (!user) {
//       user = await User.create({ name, contact });
//     }

//     const otp = Math.floor(1000 + Math.random() * 9000);

//     await client.messages.create({
//       body: `Your OTP is: ${otp}`,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: contact.startsWith('+') ? contact : `+91${contact}`,
//     });

//     otpStore[user._id] = otp;

//     res.status(200).json({ message: 'OTP sent successfully', userId: user._id });
//   } catch (error) {
//     console.error('Send OTP Error:', error);
//     res.status(500).json({ message: 'Failed to send OTP' });
//   }
// };


// exports.verifyOTP = async (req, res) => {
//   const { userId, otp } = req.body;

//   const storedOtp = otpStore[userId];
//   if (!storedOtp || parseInt(otp) !== storedOtp) {
//     return res.status(400).json({ message: 'Invalid or expired OTP' });
//   }

//   // ✅ Generate JWT and set cookie
//   const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//   });

//   delete otpStore[userId]; // Clear OTP after use

//   res.status(200).json({ message: 'Login successful' });
// };

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find(); // You can also add `.select('-password -otp')` to exclude sensitive fields
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const deletedUser = await User.findByIdAndDelete(userId);

//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// exports.resendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // 1. Validate email presence
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     // 2. Optional: Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email))
//       return res.status(400).json({ message: "Invalid email format" });

//     // 3. Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // 4. Check if already verified
//     if (user.isVerified)
//       return res.status(400).json({ message: "Email is already verified" });

//     // 5. Generate new OTP
//     const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
//     user.otp = newOtp;

//     await user.save();
//     await sendOTP(email, newOtp);

//     res.status(200).json({ message: "OTP resent to your email" });
//   } catch (error) {
//     console.error('Resend OTP Error:', error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
