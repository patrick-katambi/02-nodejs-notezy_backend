var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Users route invoked')
  next()
})

// get all users
router.get('/', function (req, res) {
  res.send({
      message: "getting all users"
  })
})

module.exports = router