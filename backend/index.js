import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToMongoDB from './db/connectToMongoDB.js';
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import userRoute from './routes/user.route.js';
import { app, server } from './socket/sockets.js';

dotenv.config();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: `${process.env.CLIENT_URL}`, // Your frontend URL
    credentials: true,
}));

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

server.listen(port, () => {
    connectToMongoDB();
    console.log(`Server running on port ${port}`);
});
