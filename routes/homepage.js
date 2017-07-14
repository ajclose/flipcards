const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', function(req, res) {
  res.send("HIIIIIII")
})

module.exports = router
