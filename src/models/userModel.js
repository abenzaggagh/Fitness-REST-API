import moongose from 'mongoose';
// import { bcrypt } from 'bcryptjs';
// import { jwt } from 'jsonwebtoken';

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
/*        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email'})
            }
        }, 
*/
        required: 'Email required'
    },
    password: {
        minLength: 7,
        type: String,        
        required: 'Password required' 
    },
    tokens: [{
        token: {
            type: String,
            // required: true
        }
    }],
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