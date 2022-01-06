const express = require('express')
const router = express.Router()
const mainController = require('./main.controller')

router.get('/', mainController.welcome)
router.get('/:id', mainController.welcomeWithId)

module.exports = router