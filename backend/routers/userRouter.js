import express from 'express'
import { authUser,registerUser,logoutUser, verifyOTP} from '../controllers/userController.js'
import { protect } from '../middleware/authMidlleware.js';
const router = express.Router()


router.post('/register', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/verifyOtp',verifyOTP)

export default router