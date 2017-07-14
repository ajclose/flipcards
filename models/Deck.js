const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const deckSchema = new mongoose.Schema({
  userid: {type: String, required: true},
  topic: {type: String, required: true},
  cards: [{
    question: {type: String, required: true},
    answer: {type: String, required: true}
  }]
})

const Deck = mongoose.model("Deck", deckSchema)

module.exports = Deck
