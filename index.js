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
app.listen(port)
  .on('listening', () => serverSuccess())
  .on('error', (error) => serverError(error))

function serverSuccess() {
  console.log('✔ Application Started')
}

function serverError(error) {
  console.log('✘ Application failed to start');
  console.error('✘', err.message);
  process.exit(0);
}