import moongose from 'mongoose';
import bcrypt from 'bcrypt';

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
        required: true
    },
    phone: {
        type: Number
    },
    tokent: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastActiveAt: {
        type: Date
    }
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}