import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const fetchUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        res.status(401).send('Access Denied');
    }

    try {

        const verify = jwt.verify(token, process.env.JWT_SECRET);

        if (!verify) return res.status(401).send('Invalid Token');

        const user = await User.findById(verify.userId).select('-password');

        if (!user) return res.status(401).send('User Not Found');

        req.user = user;

        next();

    } catch (error) {

        res.status(401).send('Invalid Token');

    };
};

export default fetchUser;