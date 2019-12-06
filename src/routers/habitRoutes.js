import { addNewHabit } from "../controllers/habitController";

const habitRoutes = (app) => {

    app.route('/habits')
    .post(addNewHabit);

}

export default habitRoutes;