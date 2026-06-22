
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js'
import { getReceiverSocketId, io } from '../socket/socket.js';
import { sendError, sendServerError } from '../utils/apiResponse.js';
import { isValidObjectId, normalizeText } from '../utils/validation.js';


export const sendMessage = async (req,res)=>{
    try {
        const message = normalizeText(req.body.message);
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        if (!isValidObjectId(receiverId)) {
            return sendError(res, 400, "Invalid recipient")
        }

        if (senderId.toString() === receiverId) {
            return sendError(res, 400, "You cannot send messages to yourself")
        }

        if (!message) {
            return sendError(res, 400, "Message cannot be empty")
        }

        if (message.length > 2000) {
            return sendError(res, 400, "Message must be 2000 characters or fewer")
        }
        
        let conversation =   await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newMessage = new Message({
            senderID:senderId,
            receiverID:receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(),newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage);

    } catch (error) {
        return sendServerError(res, "sendMessage", error)
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        if (!isValidObjectId(userToChatId)) {
            return sendError(res, 400, "Invalid conversation")
        }

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages");

        if(!conversation){
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages)
        
    } catch (error) {
        return sendServerError(res, "getMessages", error)
    }
}
