const mainHelper = require('./main.helper')

class MainController {
    welcome(req, res) {
        const message = mainHelper.welcomeMessage()
        res.send(message)
    }

    welcomeWithId(req, res) {
        const id = req.params['id']
        const message = mainHelper.welcomeMessageWithId(id)
        res.send(message)
    }
}

module.exports = new MainController()