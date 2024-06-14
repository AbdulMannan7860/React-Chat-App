import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'

import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import userRoute from './routes/user.route.js'

import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
const port = process.env.PORT || 8000;

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);


// app.get("/", (req, res) => {
//     // root route
//     res.send("Hello World!");
// })


app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server running on port ${port}`);
})