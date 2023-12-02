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



// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    
    res.status(400).json({ message: 'User already exists' });
  } else {
    // Generate OTP (you may use a library for this)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Create the user (you may need to hash the password)
    const user = await User.create({
      name,
      email,
      password,
      otp,
    });

    // Send OTP email
    try {
      await sendOtpEmail(email, otp);

      // For development, you may send the OTP in the response (remove in production)
      res.status(201).json({
        message: 'User registered successfully',
        otp,
      });
    } catch (error) {
      // Handle email sending errors
      console.error('Error sending OTP email:', error);
      res.status(500).json({ message: 'Error sending OTP email' });
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
  

export { 
  authUser,
  registerUser,
  logoutUser,
  verifyOTP,
 }