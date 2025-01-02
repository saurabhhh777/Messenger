import express from 'express';
import { register,login,getUserProfile,updateUserProfile } from "../controllers/user.controller.js";
import { protect } from "../middlewares/userAuth.js";

const router = express.Router(); 

router.post('/signup', register);
router.post('/signin', login);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);


export default router;