import User from "../models/user.model.js";
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

        });


        return res.json({ success: true, message });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

};



export const sendMessage = async (req, res) => {
  try {
    const {text,media} = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;


    let imageUrl;

    if(media){
      const uploadedResponse = await cloudinary.uploader.upload(media, {
        upload_preset: "dev_setups",
      });
      imageUrl = uploadedResponse.secure_url;
    }


    const message = new Message({
      senderId,
      receiverId,
      text,
      media:imageUrl,
    });


    await message.save();


    //adding socket.io code here


    return res.json({ success: true, message,success:true });

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error",success:false });
  }

}
