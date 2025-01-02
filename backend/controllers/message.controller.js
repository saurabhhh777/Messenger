import User from "../models/user.model";
import Message from "../models/message.model.js";

export const getUser = async (req, res) => {
  try {
    const loggedUserId = req.user.id; // logged in user id
    const filterUsers = await User.find({ _id: { $ne: loggedUserId } }).select(
      "-password"
    ); // filter out the logged in user


    //return the users except the logged in user
    return res.json({ success: true, users: filterUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getMessages = async (req, res) => {
    try {
        const {id} = req.params;
        const senderId = req.user._id;

        const message = await Message.find({
            $or: [
                { $and: [{ sender: senderId }, { receiver: id }] },
                { $and: [{ sender: id }, { receiver: senderId }] },
            ],

        })



        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

};
