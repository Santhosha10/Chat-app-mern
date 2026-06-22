
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js'
import { getReceiverSocketId, io } from '../socket/socket.js';
import { sendError, sendServerError } from '../utils/apiResponse.js';
import { isValidObjectId, normalizeText } from '../utils/validation.js';

const allowedReactions = ["👍", "❤️", "😂", "😮", "😢", "👏"];

const emitMessageUpdate = (message, actorUserId, eventName) => {
    const targetUserId = message.senderID.toString() === actorUserId.toString()
        ? message.receiverID.toString()
        : message.senderID.toString();
    const targetSocketId = getReceiverSocketId(targetUserId);

    if(targetSocketId){
        io.to(targetSocketId).emit(eventName,message)
    }
}

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

export const toggleReaction = async(req,res)=>{
    try {
        const {id:messageId} = req.params;
        const userId = req.user._id;
        const emoji = normalizeText(req.body.emoji);

        if (!isValidObjectId(messageId)) {
            return sendError(res, 400, "Invalid message")
        }

        if (!allowedReactions.includes(emoji)) {
            return sendError(res, 400, "Unsupported reaction")
        }

        const message = await Message.findById(messageId);
        if (!message) {
            return sendError(res, 404, "Message not found")
        }

        const isParticipant =
            message.senderID.toString() === userId.toString() ||
            message.receiverID.toString() === userId.toString();

        if (!isParticipant) {
            return sendError(res, 403, "You cannot react to this message")
        }

        const existingReactionIndex = message.reactions.findIndex(
            (reaction) => reaction.userId.toString() === userId.toString()
        );

        if (existingReactionIndex >= 0) {
            const existingReaction = message.reactions[existingReactionIndex];
            if (existingReaction.emoji === emoji) {
                message.reactions.splice(existingReactionIndex, 1);
            } else {
                existingReaction.emoji = emoji;
            }
        } else {
            message.reactions.push({ userId, emoji });
        }

        await message.save();

        emitMessageUpdate(message, userId, "messageReactionUpdated");

        res.status(200).json(message)
    } catch (error) {
        return sendServerError(res, "toggleReaction", error)
    }
}

export const editMessage = async(req,res)=>{
    try {
        const {id:messageId} = req.params;
        const userId = req.user._id;
        const nextMessage = normalizeText(req.body.message);

        if (!isValidObjectId(messageId)) {
            return sendError(res, 400, "Invalid message")
        }

        if (!nextMessage) {
            return sendError(res, 400, "Message cannot be empty")
        }

        if (nextMessage.length > 2000) {
            return sendError(res, 400, "Message must be 2000 characters or fewer")
        }

        const message = await Message.findById(messageId);
        if (!message) {
            return sendError(res, 404, "Message not found")
        }

        if (message.senderID.toString() !== userId.toString()) {
            return sendError(res, 403, "You can only edit your own messages")
        }

        if (message.deletedAt) {
            return sendError(res, 400, "Deleted messages cannot be edited")
        }

        message.message = nextMessage;
        message.editedAt = new Date();
        await message.save();

        emitMessageUpdate(message, userId, "messageEdited");
        res.status(200).json(message)
    } catch (error) {
        return sendServerError(res, "editMessage", error)
    }
}

export const deleteMessage = async(req,res)=>{
    try {
        const {id:messageId} = req.params;
        const userId = req.user._id;

        if (!isValidObjectId(messageId)) {
            return sendError(res, 400, "Invalid message")
        }

        const message = await Message.findById(messageId);
        if (!message) {
            return sendError(res, 404, "Message not found")
        }

        if (message.senderID.toString() !== userId.toString()) {
            return sendError(res, 403, "You can only delete your own messages")
        }

        message.message = "This message was deleted";
        message.deletedAt = new Date();
        message.reactions = [];
        await message.save();

        emitMessageUpdate(message, userId, "messageDeleted");
        res.status(200).json(message)
    } catch (error) {
        return sendServerError(res, "deleteMessage", error)
    }
}
