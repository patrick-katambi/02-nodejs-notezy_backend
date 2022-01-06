const mainRoute = require('../routes/main.route')
const usersRoute = require('../routes/users.route')

function setupRoutes (app) {
    app.use('/', mainRoute);
    app.use('/users', usersRoute);

    app.use('/*', (req, res) => {
        const error = 'Requested route does not exist.';
        const statusCode = 404;
        res.status(statusCode).send(error);
    });
}

module.exports = setupRoutes