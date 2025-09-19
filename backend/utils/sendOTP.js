const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  await transporter.sendMail({
    from: `"Verify Email 👋" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'OTP Verification',
    html: `<h2>Your OTP is: ${otp}</h2>`,
  });
};

module.exports = sendOTP;
