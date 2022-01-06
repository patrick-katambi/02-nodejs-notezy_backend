const express = require('express')
const router = express.Router()
const usersController = require('./users.controller')

// get all users
router.post('/', usersController.validateUserInputs, usersController.registerUser)

module.exports = router