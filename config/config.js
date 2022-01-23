function getConfig() {
    const config = {
        MODE: process.env.NODE_ENV || 'development',
        PORT: process.env.PORT || 3000,
        MONGO_CONNECTION: process.env.MONGO_CONNECTION || "mongodb+srv://patrick-katambi:perpheloconupus@cluster0.xzcp5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    }

    return config
}

module.exports = getConfig