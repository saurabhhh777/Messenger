import express from 'express';
import { protect } from '../middlewares/userAuth';
import { getUser,getMessages } from '../controllers/message.controller.js';  

const router = express.Router();   



//message api end point 

router.get("/user",protect,getUser);
router.get("/:id",protect,getMessages);





export default router;