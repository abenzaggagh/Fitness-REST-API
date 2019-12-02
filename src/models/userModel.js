import moongose from 'mongoose';

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
        type: String,
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
    },
    phone: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});