import asyncHandler from 'express-async-handler';


const adminAuth = asyncHandler(async (req, res) => {
  res.send('auth user');
});


const adminRegister = asyncHandler(async (req, res) => {
  res.send('register user');
});


const adminLogout = (req, res) => {
  res.send('logout user');
};


export {
    adminAuth,
    adminRegister,
    adminLogout,

};