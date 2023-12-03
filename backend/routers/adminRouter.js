import express from 'express';
import {
  adminAuth,
  adminRegister,
  adminLogout,
  userData,
  toggleUserStatus,
  eventAdded,
  showEvents,
  deleteEvent
} from '../controllers/adminController.js';
import { protect } from '../middleware/adminAuthMId.js';
import multer from 'multer';




const router = express.Router();



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/register', adminRegister);
router.post('/auth', adminAuth);
router.post('/logout', adminLogout);
router.get('/userData',userData)
router.post('/toggleUserStatus',toggleUserStatus)
router.post('/eventAdded', upload.single('media'), eventAdded);
router.get('/showEvents',showEvents)
router.post('/deleteEvent',deleteEvent)

export default router;