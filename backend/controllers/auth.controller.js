import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

const addSaltAndPepper = async (password) => {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const pepper = process.env.PEPPER || 'default_pepper';
    const hashedPassword = bcrypt.hashSync(password + pepper, salt);
    return hashedPassword;
};

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

        const profilePic = gender === 'Male'
            ? `https://avatar.iran.liara.run/public/boy?username=${userName}`
            : `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic,
        });

        await newUser.save();

        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic,
        });
    } catch (error) {
        console.error(`Error in Signup Controller: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error(`Error in Login Controller: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({ message: 'Logout Successfully' });
    } catch (error) {
        console.error(`Error in Logout Controller: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};
