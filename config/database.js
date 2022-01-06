const mongoose = require('mongoose')
const config = require('./config')

class MongoConnection {
    constructor() {
        const uri = config().MONGO_CONNECTION

        mongoose.connect(uri, { useNewUrlParser: true })
            .then(this.success())
            .catch(error => this.failed(error))
    }

    success() {
        console.log(`✔ Database Connected`);
    }

    failed(error) {
        console.log(error)
    }
}

module.exports = new MongoConnection()