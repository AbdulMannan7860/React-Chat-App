import express from 'express'
import fetchUser from '../middleware/fetchUser.js'
import { sendMessage, getMessages } from '../controllers/message.controller.js';

const router = express.Router()

router.get("/:id", fetchUser, getMessages)
router.post("/send/:id", fetchUser, sendMessage)

export default router