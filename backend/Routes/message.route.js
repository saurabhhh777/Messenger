import express from 'express';
import { protect } from '../middlewares/userAuth.js';
import { getUser,getMessages,sendMessage } from '../controllers/message.controller.js';  

const router = express.Router();   



//message api end point 

router.get("/user",protect,getUser);
router.get("/:id",protect,getMessages);
router.post("/send/:id",protect,sendMessage);





export default router;