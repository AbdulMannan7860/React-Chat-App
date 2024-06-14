import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import generateTokenAndSetCookie from '../utils/generateToken.js'

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

const addSaltAndPepper = async (password) => {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const pepper = process.env.PEPPER || 'default_pepper'; // Ensure PEPPER is a string
    const hashedPassword = bcrypt.hashSync(password + pepper, salt);
    return hashedPassword;
}
export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await addSaltAndPepper(password);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === 'Male' ? boyProfilePic : girlProfilePic
        });

        await newUser.save();
        generateTokenAndSetCookie(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic
        });
    } catch (error) {
        console.error(`Error in Signup Controller: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const pepper = process.env.PEPPER || 'default_pepper';
        const isPasswordCorrect = bcrypt.compareSync(password + pepper, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Incorrect password' });
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.error(`Error in Login Controller: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 })
        res.status(200).send('Logout Sccessfully')
    } catch (error) {
        console.error(`Error in Signup Controller: ${error}`)
        console.log(error)
    }
}