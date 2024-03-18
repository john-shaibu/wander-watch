const expressAsyncHandler = require('express-async-handler');
const {
  registrationValidation,
  loginValidation,
} = require('../validation/userValidation');
const { hashPassword, comparedPassword } = require('../middlewares/hashing');
const { generateToken } = require('../middlewares/jwt');

const { AppError } = require('../utils/AppErrors');
const {
  generateVerificationCode,
  sendVerificationEmail,
} = require('../middlewares/emailVerify');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    errorFormat: 'minimal'
})

const pingLogin = expressAsyncHandler(async (req, res) => { 
    if (!req.user) throw new AppError('Not Logged In', 403)

     res.json({ email: req.user.email })
})


// const main = async () => {
// await prisma.user.deleteMany({})
// }

// main()

// Register a new user
const registerUser = expressAsyncHandler(async (req, res) => {

  const { error } = registrationValidation.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }
  const { fullname, email, password, confirmpassword } = req.body;
  const user = await prisma.User.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    throw new AppError('User already exists', 400);
  }
  console.log(user);
  try {
    const verificationCode = generateVerificationCode();
    const hashedVerificationCode = await hashPassword(
      verificationCode.toString()
    );
    const verificationCodeCreationTime = new Date()
    const verificationCodeExpirationTime = verificationCodeCreationTime.setMinutes(verificationCodeCreationTime.getMinutes() + 5)
    const hashedPassword = await hashPassword(password);
    await prisma.User.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        confirmpassword,
        verificationCode: hashedVerificationCode,
        verificationCodeExpirationTime: String(verificationCodeExpirationTime)
      },
    });
    // await sendVerificationEmail(email, verificationCode); // Uncomment this when going live
    res.json({
      status: 'PENDING',
      message: 'Verification OTP email sent',
      data: { email, verificationCode }, // Remove the verificationCode
    });
  } catch (error) {
    throw new AppError(error)
  }
});

const resendVerificationCode = expressAsyncHandler(async (req, res) => {
  const { email } = req.query;

  const user = await prisma.User.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.isVerified) {
    throw new AppError('User already verified', 403)
  }

  try {
    const verificationCode = generateVerificationCode();
    const hashedVerificationCode = await hashPassword(
      verificationCode.toString()
    );
    const verificationCodeCreationTime = new Date()
    const verificationCodeExpirationTime = verificationCodeCreationTime.setMinutes(verificationCodeCreationTime.getMinutes() + 5)

    await prisma.user.update({
      where: {
        email: user.email
      },
      data: {
        verificationCode: hashedVerificationCode,
        verificationCodeExpirationTime: String(verificationCodeExpirationTime)
      }
    })
    await sendVerificationEmail(email, verificationCode);
    res.json({
      status: 'PENDING',
      message: 'Verification OTP email sent',
      data: { email },
    });
  } catch (error) {
    throw new AppError(error)
  }
})

// Verify OTP
const verifyOTP = expressAsyncHandler(async (req, res) => {
  const { email, verificationCode } = req.body;
  const user = await prisma.User.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new AppError('User not found', 404);
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
    throw new AppError('Invalid verification code', 400);
  }

  if (user.verificationCodeExpirationTime < new Date()) {
    throw new AppError('Verification code has expired', 403);
  }

  try {
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
  } catch (error) {
    throw new AppError(error)
  }
});

// Login User
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate the user input
  const { error } = loginValidation.validate(req.body);
  if (error) throw new AppError(error.details[0].message, 403);
  // Check if user exists
  const user = await prisma.User.findUnique({
    where: { email },
  });
  if (!user) throw new AppError('User not found', 404)

  try {
    // Compare password
    const validPassword = await comparedPassword(password, user.password);
    if (!validPassword)
      throw new AppError('Invalid password', 400);

    // Generate token
    const token = generateToken(user.id);
    
    res.cookie('LIT', token, {
      maxAge: 1000 * 60 * 60 * 24 * 5,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'none',
    })

    console.log('success');

    res.status(200).json({ message: 'Login successful', user: { email, fullname: user.fullname, location : user.locations } });
  } catch (error) {
    throw new AppError(error)
  }
});

module.exports = { registerUser, verifyOTP, loginUser, resendVerificationCode, pingLogin };
