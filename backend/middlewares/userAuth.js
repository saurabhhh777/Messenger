import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized" });
    }

};


// export default protect;
