const expressAsyncHandler = require('express-async-handler');
const {
  registrationValidation,
  loginValidation,
  updateUserValidation,
} = require('../validation/userValidation');
const { hashPassword, comparedPassword } = require('../middlewares/hashing');
const { generateToken } = require('../middlewares/jwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Register User
const registerUser = expressAsyncHandler(async (req, res) => {
  try {
    const { fullname, email, password, confirmpassword } = req.body;

    // Validate the user input
    const { error } = registrationValidation.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Check if user exists
    const userExists = await prisma.User.findUnique({
      where: { email },
    });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if password and confirm password match
    if (password !== confirmpassword)
      return res.status(400).json({ message: 'Password does not match' });

    // Hash the password
    const hashedPassword = await hashPassword(password);

    const user = await prisma.User.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        confirmpassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login User
const loginUser = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the user input
    const { error } = loginValidation.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Check if user exists
    const user = await prisma.User.findUnique({
      where: { email },
    });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Compare password
    const validPassword = await comparedPassword(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: 'Invalid password' });

    // Generate token
    const token = generateToken(user.id);
    res.header('auth-token', token);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user details without password
const updateUser = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    const { fullname, email } = req.body;

    // Validate the user input
    const { error } = updateUserValidation.validate({ fullname, email });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
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
    res.status(500).json({ message: 'Internal server error' });
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
    if (!validPassword)
      return res.status(400).json({ message: 'Invalid old password' });

    // Check if new password and confirm new password match
    if (newpassword !== confirmnewpassword)
      return res.status(400).json({ message: 'Password does not match' });

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
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = { registerUser, loginUser, updateUser, updatePassword };
