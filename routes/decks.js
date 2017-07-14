const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Deck = require('../models/Deck')

router.post('/decks', function(req, res) {
  const deck = new Deck()
  deck.userid = req.user._id
  deck.topic = req.body.topic
  deck.save()
  .then(function(deck) {
    res.redirect("/decks")
  })
})

router.get('/decks/:id', function(req, res) {
  Deck.findOne({_id: req.params.id})
  .then(function(deck) {
    res.render('deck', {
      deck: deck
    })
  })
})

router.post('/decks/:id/card', function(req, res) {
  Deck.findOne({_id: req.params.id})
  .then(function(deck) {
    deck.cards.push({
      question: req.body.question,
      answer: req.body.answer
    })
    deck.save()
    .then(function(deck) {
      res.redirect(`/decks/${req.params.id}`)
    })
  })
})

router.get('/decks/:id/edit', function(req, res) {
  Deck.findOne({_id: req.params.id})
  .then(function(deck) {
    res.render('edit-deck', {
      deck: deck
    })
  })
})

router.put('/decks/:id', function(req, res) {
  console.log(req.body.topic);
  Deck.findOne({_id: req.params.id})
  .then(function(deck) {
    deck.topic = req.body.topic
    deck.save()
    .then(function(deck) {
      res.render('deck', {
        deck: deck
      })
    })
  })
})

module.exports = router
