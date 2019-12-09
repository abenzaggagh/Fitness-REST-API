import { addNewHabit } from "../controllers/habitController";

const habitRoutes = (app) => {

    app.route('/users/habits')
    // Get user's habits from database.
    .post(addNewHabit);

}

export default habitRoutes;