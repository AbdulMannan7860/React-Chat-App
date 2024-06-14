// USER Model 
import mongoose from 'mongoose'
// fullName, userName, email, password, confirmPassword, gender
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    profilePic: {
        type: String,
        default: ' '
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema)