var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Main route invoked')
  next()
})

router.get('/', function (req, res) {
  res.send({
      message: "main route invoked"
  })
})

module.exports = router