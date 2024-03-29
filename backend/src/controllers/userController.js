const expressAsyncHandler = require('express-async-handler');
const { updateUserValidation } = require('../validation/userValidation');
const { hashPassword, comparedPassword } = require('../middlewares/hashing');
const { PrismaClient } = require('@prisma/client');
const {
  AppError
} = require('../utils/AppErrors');
const prisma = new PrismaClient();

// Update user details without password
const updateUser = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    const { fullname, email } = req.body;

    // Validate the user input
    const { error } = updateUserValidation.validate({ fullname, email });
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    // Update the user details
    const updatedUser = await prisma.User.update({
      where: { id },
      data: { fullname, email },
    });

    // Return the updated user object
    res.status(200).json({ updatedUser, message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    throw new AppError(error);
  }
});

// Update user password
const updatePassword = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    const { oldpassword, newpassword, confirmnewpassword } = req.body;

    // Check if old password matches
    const user = await prisma.User.findUnique({
      where: { id },
    });
    const validPassword = await comparedPassword(oldpassword, user.password);
    if (!validPassword) throw new AppError('Invalid old password', 400);

    // Check if new password and confirm new password match
    if (newpassword !== confirmnewpassword)
      throw new AppError('Password does not match', 400);

    // Hash the new password
    const hashedPassword = await hashPassword(newpassword);

    // Update the password
    await prisma.User.update({
      where: { id },
      data: { password: hashedPassword },
    });
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    throw new AppError(error);
  }
});

const userMetrics = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: 'user metrics page' });
});


const userProfile = expressAsyncHandler(async (req, res) => {
  try {
    let locations = await prisma.location.findMany({
      where: {
        userId: req.user?.id
      },
      orderBy: { timestamp: 'desc' },
    })

    res.json({
      id: req.user?.id,
      fullname: req.user?.fullname,
      email: req.user.email,
      fullname: req.user.fullname,
      locations
    }) 

  } catch (error) {
    throw new AppError(error)
  }
});



const discover = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: 'user discover page' });
});

module.exports = { updateUser, updatePassword, userMetrics, discover, userProfile };
