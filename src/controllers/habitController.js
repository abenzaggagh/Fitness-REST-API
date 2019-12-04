import mongoose from 'mongoose';
import { HabitSchema } from '../models/habitModel';

const Habit = mongoose.model('Users', HabitSchema);

export const addNewHabit = (request, response) => {
    let newHabit = new Habit(request.body);
    newHabit.save((error, habit) => {
        if (error) {
            response.send(error)
        }
        response.json(habit)
    });
};

// export const getUser = (request, response) => {
//     User.findById(request.params.userID, (error, user) => {
//         if (error) {
//             request.send(error)
//         }
//         response.json(user)
//     });
// }

// export const getUsers = (request, response) => {
//     User.find({}, (error, users) => {
//         if (error) {
//             request.send(error)
//         }
//         response.json(users)
//     });
// };

// export const updateUser = (request, response) => {
//     User.findOneAndUpdate({ _id: request.params.userID }, request.body, { new: true }, (error, user) => {
//         if (error) {
//             request.send(error)
//         }
//         response.json(user)
//     });
// }

// export const deleteUser = (request, response) => {
//     User.remove({ _id: request.params.userID }, (error, user) => {
//         if (error) {
//             request.send(error)
//         }
//         response.json({message: 'Successfully user deleted.'})
//     });
// }