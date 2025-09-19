
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthAdmin = require('../../models/adminModel/AuthAdmin');

// 🔐 Register Admin (use only once or restrict)
exports.registerAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("admin data ", req.body);
  
      const existingAdmin = await AuthAdmin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ success: false, message: 'Admin already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new AuthAdmin({ email, password: hashedPassword });
  
      await newAdmin.save();
  
      res.status(201).json({ success: true, message: 'Admin registered successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
  };
  

// 🔐 Login Admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AuthAdmin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id }, 'yourSecretKey', { expiresIn: '1d' });

    res.status(200).json({ success: true, message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};
