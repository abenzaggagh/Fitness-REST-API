import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('Users', UserSchema);

export const addNewUser = (request, response) => {
    let newUser = new User(request.body);
    newUser.save((error, user) => {
        if (error) {
            response.send(error)
        }
        response.json(user)
    });
};

export const getUser = (request, response) => {
    User.findById(request.params.userID, (error, user) => {
        if (error) {
            request.send(error)
        }
        response.json(user)
    });
}

export const getUsers = (request, response) => {
    User.find({}, (error, users) => {
        if (error) {
            request.send(error)
        }
        response.json(users)
    });
};

export const updateUser = (request, response) => {
    User.findOneAndUpdate({ _id: request.params.userID }, request.body, { new: true }, (error, user) => {
        if (error) {
            request.send(error)
        }
        response.json(user)
    });
}

export const deleteUser = (request, response) => {
    User.remove({ _id: request.params.userID }, (error, user) => {
        if (error) {
            request.send(error)
        }
        response.json({message: 'Successfully user deleted.'})
    });
}

export const loginUser = (request, response) => {
    // Most Important Part: Generate User's Token(s)
}

export const profileUser = (request, response) => {
    // Same as GetUserByID but this one...
}

export const logoutUser = (request, response) => {
    // Same as GetUserByID but this one...
}

export const logoutAllUser = (request, response) => {
    // Same as GetUserByID but this one...
}