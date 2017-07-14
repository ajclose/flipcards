const express = require('express')
const app = express()
const mustache = require('mustache-express')
const mongoose = require('mongoose')
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const bodyParser = require('body-parser')
const registrationRoute = require('./routes/registration')
const loginRoute = require('./routes/login')
const homepageRoute = require('./routes/homepage')
const deckRoute = require('./routes/decks')
const User = require('./models/User')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set("layout", 'layout')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/flipcards')

app.listen(3000, function() {
  console.log("app is live!");
})

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({username: username, password: password})
    .then( function(user){
      if(user){
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  }
));



app.use(registrationRoute)
app.use(loginRoute)
app.use(passport.authenticate('basic', {session: false}))
app.use(homepageRoute)
app.use(deckRoute)
