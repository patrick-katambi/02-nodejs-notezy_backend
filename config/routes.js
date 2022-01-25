const mainRoute = require('../modules/main/main.route')
const usersRoute = require('../modules/users/users.route')

function setupRoutes (app) {
    app.get('/', (req, res) => res.send("You are at the root route"))
    app.use('/api/v1/', mainRoute);
    app.use('/api/v1/users', usersRoute);

    app.use('/*', (req, res) => {
        const error = 'Requested route does not exist.';
        const statusCode = 404;
        res.status(statusCode).send(error);
    });
}

module.exports = setupRoutes