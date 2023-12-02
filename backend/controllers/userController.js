import asyncHandler from 'express-async-handler';
import User from '../schema/userModel.js';
import generateToken from '../utils/generateToken.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'


//send otp email
const sendOtpEmail = async (toEmail, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: toEmail,
    subject: 'OTP Verification',
    html: `<p>Your OTP is: ${otp}</p>`,
  };

  return transporter.sendMail(mailOptions);
};




// Orginal sign in
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
      if (user.status) {
          res.status(401);
          throw new Error('Your account is temporarily blocked');
      }

      if (!user.verified) {
        res.status(401);
        throw new Error('Your account is not verified');
      }

      if (await user.matchPassword(password)) {
          // Generate and send token
      generateToken(res, user._id);

      // Send user data in the response
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
      });
      } else {
          res.status(401);
          throw new Error('Invalid email or password');
      }
  } else {
      res.status(401);
      throw new Error('Invalid email or password');
  }
});










// Register a new user or update user data if already exists
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // User exists, update user data if verified is false
    if (!existingUser.verified) {
      existingUser.name = name;
      existingUser.password = password;
      existingUser.otp = Math.floor(100000 + Math.random() * 900000);
      await existingUser.save();

      // Send OTP to user's email
      await sendOtpEmail(email, existingUser.otp);

      res.status(200).json({
        message: 'User data updated successfully',
        otp: existingUser.otp, // You may choose to include the OTP in the response
      });
    } else {
      res.status(400).json({ message: 'User already exists and is verified' });
    }
  } else {
    // User doesn't exist, create a new user
    const newUser = await User.create({
      name,
      email,
      password,
      otp: Math.floor(100000 + Math.random() * 900000),
    });

    if (newUser) {
      // Send OTP to user's email
      await sendOtpEmail(email, newUser.otp);

      res.status(201).json({
        message: 'User registered successfully',
        otp: newUser.otp, // You may choose to include the OTP in the response
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  }
});






//logout user
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };


const verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
  
    // Find user by email
    const user = await User.findOne({ email });
  
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      // Check if the OTP matches
      if (user.otp === otp) {
        // Mark user as verified
        user.verified = true;
        await user.save();
         
        // Generate and send token
      generateToken(res, user._id);

      // Send user data in the response
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
      });
      } else {
        res.status(400).json({ message: 'Incorrect OTP. Please try again.' });
      }
    }
  });
  


  const resendOtp = asyncHandler(async (req, res) => {
    try {
      const { email } = req.body; 
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newOtp = Math.floor(1000 + Math.random() * 9000);
      user.otp = newOtp;
      await user.save();
  
      await sendOtpEmail(email, newOtp);
  
      res.status(200).json({ message: 'OTP resent successfully' });
    } catch (error) {
      console.error('Error while resending OTP:', error);
      res.status(500).json({ message: 'An error occurred while resending OTP' });
    }
  });
  


export { 
  authUser,
  registerUser,
  logoutUser,
  verifyOTP,
  resendOtp,
 }