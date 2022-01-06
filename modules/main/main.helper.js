const config = require('../../config/config')()

function welcomeMessage() {
    return {
        meessage: `You are at route : http://localhost:${config.PORT}`
    }
}

function welcomeMessageWithId(id) {
    return {
        meessage: `Hey, ${id}, you are at route : http://localhost:${config.PORT}`
    }
}


module.exports = { welcomeMessage, welcomeMessageWithId }