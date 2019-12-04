import { addNewHabit } from "../controllers/habitController";

const habitRoutes = (app) => {

    app.route('/habits')
    // .get(getUsers)
    // .get(getUser)
    .post(addNewHabit);

    // app.route('/habit/:habitID')
    // .get(getUser)
    // .put(updateUser)
    // .delete(deleteUser)

}

export default habitRoutes;