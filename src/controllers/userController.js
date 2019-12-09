import mongoose from 'mongoose';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserSchema } from '../models/userModel';

const User = mongoose.model('Users', UserSchema);

export const addNewUser = (request, response) => {
    let newUser = new User(request.body);
    newUser.password = bycrypt.hashSync(request.body.password, 10);
    newUser.save((error, user) => {
        if (error) {
            response.status(400).send(error)
        }
        newUser.password = undefined; 
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

export const updateUserPassword = (request, response) => {
    User.updateOne({'email': request.params.email }, {
        $set: { password: request.params.password } 
    })
    User.findOneAndUpdate({ _id: request.params.userID }, request.body, { new: true }, (error, user) => {
        if (error) {
            request.send(error)
        }
        response.json(user)
    });
}

export const loginUser = (request, response) => {
    // Most Important Part: Generate User's Token(s)
    User.findOne({ email: request.body.email }, function(error, user) {
        if (error) {
            throw error
        }
        if (!user) {
            response.status(401).json(
                { message: 'Authentication failed. User not found.' }
            );
        } else if (user) {
            if (!user.comparePassword(request.body.password)) {
                response.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
                let userToken = jwt.sign({ email: user.email, _id: user._id}, 'FITNESS_REST_API')
                // $set: { tok: request.params.password } 
                return response.json({token: user.token});
            }
        }
    });
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