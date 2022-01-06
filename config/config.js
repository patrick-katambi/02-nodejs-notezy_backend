function getConfig() {
    const config = {
        MODE: process.env.NODE_ENV || 'development',
        PORT: process.env.SERVER_PORT || 3000,
        MONGO_CONNECTION: process.env.MONGO_CONNECTION,
    }

    return config
}

module.exports = getConfig