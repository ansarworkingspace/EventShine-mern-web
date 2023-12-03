import asyncHandler from 'express-async-handler';
import generateAdminToken from '../utils/adminGenToken.js'
import admin from '../schema/adminSchema.js'
import jwt from 'jsonwebtoken'
import User from '../schema/userModel.js';
import Event from '../schema/eventSchema.js'


const adminAuth = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const foundAdmin = await admin.findOne({ email }); // Rename the variable here

    if (foundAdmin && (await foundAdmin.matchPassword(password))) {
      generateAdminToken(res, foundAdmin._id);
        res.status(201).json({
            _id: foundAdmin._id,
            name: foundAdmin.name,
            email: foundAdmin.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


const adminRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const adminExists = await admin.findOne({ email: email })

    if (adminExists) {
        res.status(400)
        throw new Error('Admin already exists');
    }

    const newAdmin = await admin.create({
        name,
        email,
        password
    });

    if (newAdmin) {
      generateAdminToken(res, newAdmin._id)
        res.status(201).json({
            _id: newAdmin._id,
            name: newAdmin.name,
            email: newAdmin.email
        });
    } else {
        res.status(400)
        throw new Error('Invalid admin data');
    }
});


const adminLogout = (req, res) => {
    res.cookie('adminJwt','',{
        httpOnly:true,
        expires:new Date(0)
       })
       
       
    res.status(200).json({message:'admin logged out'});
};

const userData = asyncHandler(async(req,res)=>{
    try {
        const userData = await User.find({ verified: true });
        res.json(userData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
})

const toggleUserStatus = asyncHandler(async(req,res)=>{
    try {
        const userId = req.body.userId; // Assuming userId is sent in the request body
    
        // Find the user by ID
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Toggle user status
        if (!user.status) {
          user.status = true;
        } else {
          user.status = false;
        }
    
        await user.save();
    
        // Send a response indicating success
        res.status(200).json({ message: 'User status toggled successfully' });
      } catch (error) {
        console.error('Error toggling user status:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
})


const eventAdded = asyncHandler(async (req, res) => {
  
  const { eventName, description, youtubeLink, scheduleDate, scheduleTime } = req.body;
 

  // You can access the uploaded file information using req.file
  const imagePath = req.file;

  // Create a new event
  const newEvent = new Event({
    eventName,
    description,
    youtubeLink,
    scheduleDate,
    scheduleTime,
    image: imagePath.filename,
  });
  
  // Save the event to the database
  await newEvent.save();
  
  res.status(201).json({ message: 'Event added successfully' });
});


export {
    adminAuth,
    adminRegister,
    adminLogout,
    userData,
    toggleUserStatus,
    eventAdded
};