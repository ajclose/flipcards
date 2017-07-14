const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Deck = require('../models/Deck')

router.get('/decks', function(req, res) {
  Deck.find({userid: req.user._id})
  .then(function(decks) {
      res.render('homepage', {
        decks: decks
      })
  })
})

router.get('/logout', function(req, res) {
  req.logOut()
  console.log("logged out");
  res.redirect('/login',)
})

module.exports = router
