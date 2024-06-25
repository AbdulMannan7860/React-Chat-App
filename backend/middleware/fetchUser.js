import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const fetchUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    // console.log('Token:', token);

    if (!token) {
        // console.log('No token found');
        return res.status(401).send('Access Denied');
    }

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if (!verify) {
            // console.log('Token verification failed');
            return res.status(401).send('Invalid Token');
        }
        
        const user = await User.findById(verify.id).select('-password');
        // console.log(user);
        if (!user) {
            // console.log('User not found');
            return res.status(401).send('User Not Found');
        }

        req.user = user;
        // console.log('User authenticated:', user);
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).send('Invalid Token');
    }
};

export default fetchUser;
