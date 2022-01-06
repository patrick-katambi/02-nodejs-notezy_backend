const express = require('express')
const dotenv = require('dotenv')
const setupRoutes = require('./routes')
const app = express()
dotenv.config()

app.use(express.json())
setupRoutes(app)

module.exports = app