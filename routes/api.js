const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Deck = require('../models/Deck')

router.get('/api/decks', function(req, res) {
  Deck.find({userid: req.user.id})
  .then(function(decks) {
    res.json(decks)
  })
  .catch(function(error) {
    res.status(422).json(error)
  })
})

router.post('/api/decks', function(req, res) {
  const deck = new Deck()
  deck.userid = req.user.id
  deck.topic = req.body.topic
  deck.save()
  .then(function(deck) {
    res.json(deck)
  })
  .catch(function(error) {
    res.status(422).json(error)
  })
})

router.get('/api/decks/:id', function(req, res) {
  Deck.findOne({_id: req.params.id})
  .then(function(deck) {
    res.json(deck)
  })
  .catch(function(error) {
    res.status(422).json(error)
  })
})

router.post('/api/decks/:id', function(req, res) {
  Deck.findOne({_id: req.params.id})
  .then(function(deck) {
    deck.cards.push({
      question: req.body.question,
      answer: req.body.answer
    })
    deck.save()
    .then(function(deck) {
      res.json(deck)
    })
    .catch(function(error) {
      res.status(422).json(error)
    })
  })
})

router.put('/api/decks/:id', function(req, res) {
  Deck.findOne({_id: req.body.deckid})
  .then(function(deck) {
    for (var i = 0; i < deck.cards.length; i++) {
      const card = deck.cards[i]
      if (card._id = req.params.id) {
        card.question = req.body.question,
        card.answer = req.body.answer
      }
    }
    deck.save()
    .then(function(deck) {
      res.json(deck)
    })
    .catch(function(error) {
      res.status(422).json(error)
    })
  })
})

router.delete('/api/cards/:id', function(req, res) {
  Deck.update({_id: req.body.deckId}, {$pull: {cards: {_id: req.params.id}}})
  .then(function(deck) {
    res.json(deck)
  })
  .catch(function(error) {
    res.status(422).json(error)
  })
})

module.exports = router
