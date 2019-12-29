import moongose from 'mongoose';
import bcrypt from 'bcrypt';

import {
    hashCode, jwtKey
} from '../configuration'

const Schema = moongose.Schema;

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'First name required'
    },
    lastName: {
        type: String,
        required: 'Last name required'
    },
    gender: {
        type: String,
        required: 'Gender required'
    },
    birthday: {
        type: Date,
        min: '1900-01-01',
        required: 'Birthday required'
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: 'Email required'
    },
    password: {
        minLength: 7,
        type: String,        
        required: 'Password required' 
    },
    token: {
        type: String,
        // required: true
    },
    phone: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastActiveAt: {
        type: Date
    }
});

UserSchema.methods.hashPassword = function (password) {
    return bycrypt.hashSync(password, hashCode);
}

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.generateToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({ email: user.email, _id: user._id }, jwtKey)
    user.tokens = user.tokens.concat({ token })

    await user.save()
    return token
}

// UserSchema.pre('save', async function (next) {
//     const user = this
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//     next()
// })