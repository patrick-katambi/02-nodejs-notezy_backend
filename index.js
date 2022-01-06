const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
const uri = process.env.MONGO_CONNECTION
mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
    console.log('connected successfully')
}).catch(error => console.log(error))

const users = require('./routes/users.route')
const main = require('./routes/main.route')
const app = express()

const port = process.env.SERVER_PORT || 3000

app.use('/', main)
app.use('/users', users)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})