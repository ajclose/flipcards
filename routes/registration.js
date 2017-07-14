const express = require('express')
const router = express.Router()
const User = require("../models/User")

router.get("/register", function(req, res) {
  res.render("registration")
})

router.post('/register', function(req, res) {
  User.findOne({
    username: req.body.username
  })
  .then(function(user) {
    if (user) {
      res.render("registration", {
        userError: "That username already exists"
      })
    } else {
      const user = new User()
      user.username = req.body.username
      user.email = req.body.email
      user.password = req.body.password
      user.save()
      .then(function(user) {
        res.redirect('/login')
      })
    }
  })
  .catch(function(error) {
    res.render('registration', {
      error: error
    })
  })
})

module.exports = router
