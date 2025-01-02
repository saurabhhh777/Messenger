import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,

    },
    media: {
        type: Array,
        default: []
    }

},{timestamps: true});


const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;