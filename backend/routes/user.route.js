import express from 'express'
import fetchUser from '../middleware/fetchUser.js'
import { getUsersForSidebar } from '../controllers/users.controller.js';

const router = express.Router()

router.get("/:id", fetchUser, getUsersForSidebar)

export default router