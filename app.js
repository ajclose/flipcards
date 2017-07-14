const express = require('express')
const app = express()
const mustache = require('mustache-express')
const mongoose = require('mongoose')
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const bodyParser = require('body-parser')
const registrationRoute = require('./routes/registration')

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

app.use(registrationRoute)
