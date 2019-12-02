import { addNewUser, getUsers, getUser, updateUser, deleteUser } from "../controllers/userController";

const routes = (app) => {

    app.route('/users')
    .get(getUsers);

    app.route('/user')
    .get(getUser)
    .post(addNewUser);

    app.route('/user/:userID')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

}

export default routes;





/*

.get((request, response, next) => {
    // Middleware
    console.log(`Request from:   ${request.originalUrl}`)
    console.log(`Request method: ${request.method}`)
    next();
}, (request, response, next) => {
    response.send('GET Method')
})

*/