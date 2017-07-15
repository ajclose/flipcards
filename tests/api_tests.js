const chai = require("chai");
const assert = chai.assert;
const supertest = require("supertest");
const app = require("../app")
const User = require("../models/User")
const Deck = require("../models/Deck")

describe("test api", function() {

  let user = false;
  let deck = false
  afterEach(function(done){
    User.deleteMany().then( function(){
      done()
    })
  })
  beforeEach(function(done){
    const u = new User()
    u.username = "theusername"
    u.password = "12345678"
    u.email = "test@test.com"
    u.save()
    .then( function(u){
      user = u;
      const d = new Deck()
      d.topic = "test"
      d.userid = user._id
      d.cards[0] = {question: "question", answer: "answer"}
      d.save()
      .then(function(d) {
        deck = d
        done();
      })
    })
  })

  it("displays all of the decks the user has created", function(done) {
    supertest(app)
    .get('/api/decks')
    .auth(user.username, user.password)
    .expect(200)
    .expect(function(res) {
      assert.include(res.body[0].topic, "test")
    })
    .end(done)
  })

  it("displays questions for a specific topic", function(done) {
    supertest(app)
    .get(`/api/decks/${deck._id}`)
    .auth(user.username, user.password)
    .expect(200)
    .expect(function(res) {
      assert.include(res.body.cards[0].question, "question")
    })
    .end(done)
  })

  it("adds a question to the deck", function(done) {
    const formData = {
      question: "test question",
      answer: "test answer"
    }
    supertest(app)
    .post(`/api/decks/${deck._id}`)
    .auth(user.username, user.password)
    .send(formData)
    .expect(200)
    .expect(function(res) {
      assert.equal(res.body.cards[1].question, "test question")
      assert.equal(res.body.cards[1].answer, "test answer")
    })
    .end(done)
  })

  it("adds a topic to the user's decks", function(done) {
    const formData = {
      topic: "new topic",
    }
    supertest(app)
    .post('/api/decks')
    .auth(user.username, user.password)
    .send(formData)
    .expect(200)
    .expect(function(res) {
      assert.equal(res.body.topic, "new topic")
    })
    .end(done)
  })

  it("edits a card in a deck", function(done) {
    const formData = {
      question: "updated question",
      answer: "updated answer",
      deckid: deck._id
    }
    supertest(app)
    .put(`/api/decks/${deck.cards[0]._id}`)
    .auth(user.username, user.password)
    .send(formData)
    .expect(200)
    .expect(function(res) {
      assert.equal(res.body.cards[0].question, "updated question")
      assert.equal(res.body.cards[0].answer, "updated answer")
    })
    .end(done)
  })

  it("deletes a card from a deck", function(done) {
    const formData = {
      deckid: deck._id,
    }
    supertest(app)
    .delete(`/api/cards/${deck.cards[0]._id}`)
    .auth(user.username, user.password)
    .send(formData)
    .expect(200)
    .end(done)
  })
})
