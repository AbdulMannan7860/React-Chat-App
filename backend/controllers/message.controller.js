import Conversation from '../models/conversation.modal.js'
import Message from '../models/message.modal.js'
import { getReceiverId, io } from '../socket/sockets.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }


        //  This will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO FUNCTIONALITY WILL BE IMPLEMENTED HERE

        const receiverSocketId = getReceiverId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('new-message', newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log(`Error in Message Controller: ${error.message}`);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

export const getMessages = async (req, res) => {
    try {

        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate('messages');

        if (!conversation) return res.status(200).json([]);

        const messages = await Message.find({ _id: { $in: conversation.messages } });

        res.status(200).json(messages);

    } catch (error) {
        console.log(`Error in Message Controller: ${error.message}`);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}