const jwt = require('jsonwebtoken');
const User = require('../models/userModel/User');
// const User = require('../models/userModel/User');

const authUserProtected = async (req, res, next) => {
  const token = req.cookies.token; 
console.log("user  token ",token);
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) return res.status(401).json({ message: 'Unauthorized: User not found' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authUserProtected;
