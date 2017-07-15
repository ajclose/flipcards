const chai = require("chai");
const assert = chai.assert;
const supertest = require("supertest");
const app = require("../app")
const User = require("../models/User")

describe("get decks", function() {

  let user = false;
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
      done();
    })
  })

  it("displays all of the decks the user has created", function(done) {
    supertest(app)
    .get('/api/decks')
    .auth(user.username, user.password)
    .expect(200)
    .end(done)
  })
})
