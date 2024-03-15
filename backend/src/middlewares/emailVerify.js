// generate verification code to be sent to the user's email
const nodemailer = require('nodemailer');
const { AppError } = require('../utils/AppErrors');

// Generate verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
// Send verification email to the user's email address
const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SECRET,
        pass: process.env.PASSWORD_SECRET,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_SECRET,
      to: email,
      subject: 'Email Verification',
      html: `<html><head><link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" /></head><body><p>Dear user,</p>
         <p>Thank you for registering with wander-watch. Please use the following verification code to verify your email address:</p>
         <p><strong>${verificationCode}</strong></p>
         <p>Your verification code expires in 5 minutes</p>
         <p>Alternatively, if the code doesn't work, you can click<a href="link_to_verification_page"> here</a> to verify your email address.</p>
         <p>If you didn't register with wander-watch, please ignore this email.</p></body></html>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new AppError('Error sending verification email', 500);
  }
};

module.exports = { generateVerificationCode, sendVerificationEmail };
