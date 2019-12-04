import moongose from 'mongoose';

const Schema = moongose.Schema;

export const HabitSchema = new Schema({
    habitName: {
        type: String,
        required: 'Habit name required'
    }
});