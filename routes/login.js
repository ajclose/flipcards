const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/login', function(req, res) {
  res.render('login')
})

router.post('/login', function(req, res) {
  User.findOne({
      username: req.body.username,
      password: req.body.password
    })
    .then(function(user) {
      if (user) {
        res.redirect('/user')
      } else {
        res.render('login')
      }
    })
})


module.exports = router
