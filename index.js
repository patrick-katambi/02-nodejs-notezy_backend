const dotenv = require('dotenv')
dotenv.config()

// initializing the connection to Mongo DB Atlas
require('./config/database')

// server configuration variables
const config = require('./config/config')()
const port = config.PORT
const mode = config.MODE
console.log(`✔ Port: ${port}`);
console.log(`✔ Mode: ${mode}`);

// running server
const app = require('./config/app')
const indexHelpers = require('./index.helper')
app.listen(port)
  .on('listening', () => indexHelpers.serverSuccess())
  .on('error', (error) => indexHelpers.serverError(error))