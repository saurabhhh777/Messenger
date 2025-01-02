import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./Routes/user.route.js";



const app = express();

dotenv.config();

app.use(cors());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
connectDB();



//api point 
app.use("/api/v1/user",userRouter);
app.use("/api/v2/message",messageRouter);



const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});