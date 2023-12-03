import express from 'express';
import {
  adminAuth,
  adminRegister,
  adminLogout,
} from '../controllers/adminController.js';
import { protect } from '../middleware/adminAuthMId.js';


const router = express.Router();

router.post('/register', adminRegister);
router.post('/auth', adminAuth);
router.post('/logout', adminLogout);


export default router;