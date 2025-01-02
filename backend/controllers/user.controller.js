import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js"; // Import your user model
import cloudinary from "../utils/cloudinary.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter email and password" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res
      .cookie("token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite:"Strict",
        secure: process.env.NODE_ENV === "production" ? true : false,
      })
      .json({ 
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email }, // Exclude password
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error",success:false });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter name, email, and password" });
    }

    const userExists = await userModel.findOne({email});

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res
      .cookie("token", token, { 
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite:"Strict",
        secure: process.env.NODE_ENV === "production" ? true : false,
      })
      .json({ 
        message: "User created successfully",
        user: { id: user._id, name: user.name, email: user.email },
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error",success:false });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found",success:false });
    }



    return res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error",success:false });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email,profilepic } = req.body;

    const userId = req.user._id;

    if(!name || ! email || !profilepic){
      return res.status(400).json({ message: "Please enter name , email,profilepic",success:false });
    }


    
    if(name){
      const userExists = await userModel.findByIdAndUpdate(userId, {name:name},{new:true});
    }
    
    let user;

    if(profilepic){
      const uploadedResponse = await cloudinary.uploader.upload(profilepic, {
        upload_preset: "dev_setups",
      });
      user = await userModel.findByIdAndUpdate(userId, {profilePic:uploadedResponse.secure_url },{new:true});

    }


    return res.json({
      message:"User updated successfully",
      success:true,
      user,
    });
    


  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error",
    success:false
    });
  }
};



export const logout = async (req, res) => {
  try {

    return res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite:"Strict",
        secure: process.env.NODE_ENV === "production" ? true : false,
      })
      .json({ message: "Logged out", success: true });
    
  } catch (error) {
    console.log(error);
    return res.status(5000).json({
      message:"Internal Server Error",
      success:false
    });
  }

};
