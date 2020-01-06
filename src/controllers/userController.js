
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { jwtKey, hashCode } from '../configuration';

import { UserSchema } from '../models/userModel';

const User = mongoose.model('Users', UserSchema);

export const addNewUser = (request, response) => {
    let newUser = new User(request.body);
    newUser.password = user.hashPassword(request.body.password)
    newUser.save((error, user) => {
        if (error) {
            response.status(400).send(error)
        }
        newUser.password = undefined;
        // TODO: Generate new Token
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
    jwt.verify(request.token, jwtKey, (error) => { 
        if (error) {
            response.json({ message: 'Unauthorized. Write access forbidden.' })
            response.sendStatus(403);
        } else {
            User.findOneAndUpdate({ _id: request.params.userID }, request.body, { new: true }, (error, user) => {
                if (error) {
                    request.send(error)
                }
                response.json(user)
            });
        }
    })  
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
            response.status(500).json({ message: ' Internal Server Error'} )
            throw error
        }
        if (!user) {
            response.status(401).json(
                { message: 'Authentication failed. User not found.' }
            );
        } else if (user) {
            if (!user.comparePassword(request.body.password)) {
                response.status(401).json(
                    { message: 'Authentication failed. Wrong password.' }
                );
            } else {
                const token = jwt.sign({ email: user.email, _id: user._id }, jwtKey)
                User.updateOne({'email': request.params.email }, {
                    $set: { token: token }
                })
                return response.status(201).json({ token: token })
            }
        }
    });
}


// TODO: HTTP Method that return a Bool depending on the exsitence of the email address of an user
export const verifyExistingUser = (request, response) => {
    User.find({ email: request.body.email }, function(error, user) {
        if (error) {
            response.status(500).json({ message: ' Internal Server Error'} )
            throw error
        }
        if (Object.keys(user).length === 0) {
            response.status(400).json({ message: 'False'} );
        } else {
            response.status(201).json({ message: 'True'} );
        }
    });
}

export const signUser = (request, response) => {
    // Most Important Part: Hash Password 
    //                      Insert User's Information
    bycrypt.hash(request.body.password, 10, (error, hash) => {
        // Store hash in your password DB.
        if (error) { 
            response.status(500).json({ message: ' Internal Server Error'} )
        }

        const newUser = new User({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: hash,
            gender: request.body.gender,
            birthday: request.body.birthday,
            height: request.body.height,
            weight: request.body.weight
        });

        newUser.save((error, user) => {
            if (error) {
                response.status(400).send(error)
            } else {
                const token = jwt.sign({ email: user.email, _id: user._id }, jwtKey)
                User.updateOne({'email': user.email }, {
                    $set: { token: token }
                })
                return response.status(201).json({ token: token })
            }
        })

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