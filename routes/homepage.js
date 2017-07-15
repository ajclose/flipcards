const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')
const session = require('express-session')
const User = require('../models/User')
const Deck = require('../models/Deck')

// const sess = {
//   secret: 'ASKDFJAISDFYAKNFQ#$%(@*#@23$)',
//   resave: true,
//   saveUninitialized: true
// }
//
// router.use(session(sess))
// router.use(authenticate)

router.get('/', function(req, res) {
  Deck.find({userid: req.user._id})
  .then(function(decks) {
      res.render('homepage', {
        decks: decks
      })
  })
})

router.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login')
  })
})

module.exports = router
