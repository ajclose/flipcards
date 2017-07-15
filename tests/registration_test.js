const chai = require("chai");
const assert = chai.assert;
const supertest = require("supertest");
const app = require("../app")
const User = require("../models/User")

// describe("Account registration", function() {
//
//   let user = false;
// afterEach(function(done){
//   User.deleteMany().then( function(){
//     done()
//   })
// })
// beforeEach(function(done){
//   const u = new User()
//   u.username = "testuser"
//   u.password = "password"
//   u.email = "user@user.com"
//   u.save()
//   .then( function(a){
//     user = u
//     done();
//   })
// })
//
// it("returns error message", function(done){
//   registrationData = {
//     username: user.username,
//     password: user.name,
//     email: user.city
//   }
//   supertest(app)
//   .post("register")
//   .send(registrationData)
//   .expect(function(res){
//     assert.include(res, "That username already exists")
//   })
//   .end(done)
// })
// })
