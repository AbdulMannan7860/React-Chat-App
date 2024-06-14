import User from "../models/user.model.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')
        res.status(200).json(users)
    } catch (error) {
        console.error(`Error in Users Controller: ${error}`)
        res.status(500).send({ error: 'Internal Server Error' })
    }
}

