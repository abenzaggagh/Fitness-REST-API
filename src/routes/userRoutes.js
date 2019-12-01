const routes = (app) => {

    app.route('/user')
    .get((request, response, next) => {
        // Middleware
        console.log(`Request from:   ${request.originalUrl}`)
        console.log(`Request method: ${request.method}`)
        next();
    }, (request, response, next) => {
        response.send('GET Method')
    })
    .post((request, response, next) => {
        response.send('POST Method')
    });

    app.route('/user/:userID')
    .put((request, response, next) => {
        response.send('PUT Method')
    })
    .delete((request, response, next) => {
        response.send('DELETE Method')
    });

}

export default routes;