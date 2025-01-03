import express from "express";
import cors from "cors";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv, { parse } from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./Routes/user.route.js";
import messageRouter from "./Routes/message.route.js";



const app = express();

dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

``
// Connect to MongoDB
connectDB();



//api point 
app.use("/api/v1/user",userRouter);
app.use("/api/v2/message",messageRouter);



const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});