const expressAsyncHandler = require('express-async-handler');
const {
  registrationValidation,
  loginValidation,
} = require('../validation/userValidation');
const { hashPassword, comparedPassword } = require('../middlewares/hashing');
const { generateToken } = require('../middlewares/jwt');
const { PrismaClient } = require('@prisma/client');

const {
  InvalidRequestError,
  AppError,
  NotFoundError,
} = require('../utils/AppErrors');
const {
  generateVerificationCode,
  sendVerificationEmail,
} = require('../middlewares/emailVerify');
=
const prisma = new PrismaClient();

// Register a new user
const registerUser = expressAsyncHandler(async (req, res) => {

  const { error } = registrationValidation.validate(req.body);
  if (error) {
    throw new InvalidRequestError(error.details[0].message);
  }
  const { fullname, email, password, confirmpassword } = req.body;
  const user = await prisma.User.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    throw new InvalidRequestError('User already exists');
  }
  const verificationCode = generateVerificationCode();
  const hashedVerificationCode = await hashPassword(
    verificationCode.toString()
  );
  const hashedPassword = await hashPassword(password);
  await prisma.User.create({
    data: {
      fullname,
      email,
      password: hashedPassword,
      confirmpassword,
      verificationCode: hashedVerificationCode,
    },
  });
  await sendVerificationEmail(email, verificationCode);
  res.json({
    status: 'PENDING',
    message: 'Verification OTP email sent',
    data: { email },
  });
});

// Verify OTP
const verifyOTP = expressAsyncHandler(async (req, res) => {
  const { email, verificationCode } = req.body;
  const user = await prisma.User.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new NotFoundError('User not found');
  }
  if (user.isVerified) {
    return res.status(400).json({
      message: 'User already verified',
    });
  }
  const matchedVerificationCode = await comparedPassword(
    verificationCode.toString(),
    user.verificationCode
  );

  if (!matchedVerificationCode) {
    throw new InvalidRequestError('Invalid verification code');
  }

  const verificationCodeExpirationTime = new Date(user.createdAt);
  verificationCodeExpirationTime.setMinutes(
    verificationCodeExpirationTime.getMinutes() + 5
  );

  if (verificationCodeExpirationTime < new Date()) {
    throw new InvalidRequestError('Verification code has expired');
  }

  await prisma.User.update({
    where: {
      email,
    },
    data: {
      isVerified: true,
    },
  });

  res.status(200).json({
    message: 'User verified successfully',
  });
});

// Login User
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate the user input
    const { error } = loginValidation.validate(req.body);
    if (error) throw new InvalidRequestError(error.details[0].message);
    // Check if user exists
    const user = await prisma.User.findUnique({
      where: { email },
    });
    if (!user) throw new NotFoundError('User')

    // Compare password
    const validPassword = await comparedPassword(password, user.password);
    if (!validPassword)
      throw new InvalidRequestError('Invalid password');

    // Generate token
    const token = generateToken(user.id);
    res.header('auth-token', token);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new AppError(error)
  }
});

module.exports = { registerUser, verifyOTP, loginUser };
