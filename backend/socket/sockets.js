import { Server } from 'socket.io';
import dotenv from 'dotenv';
import http from 'http';
import express from 'express';

dotenv.config();

const app = express();

const server = http.createServer(app);
const client = process.env.CLIENT_URL;

const io = new Server(server, {
    cors: {
        origin: [`${client}`],
        methods: ['GET', 'POST'],
    },
});

export const getReceiverId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") userSocketMap[userId] = socket.id;

    io.emit('user-ids', Object.keys(userSocketMap));

    // socket.on() is used to listen for events, can be used on client and server
    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete userSocketMap[userId];
        io.emit('user-ids', Object.keys(userSocketMap));
    });
});

export { app, server, io }
