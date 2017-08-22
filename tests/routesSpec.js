process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../server');
var knex = require('../api/models/knex');

chai.use(chaiHttp);

describe('Routes', function() {
  // create database before each test.
  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        done();
      });
    });
  });
// destroy database after each test
afterEach(function(done) {
  knex.migrate.rollback()
  .then(function() {
    done();
  });
});

  describe('user routes', function() {

    describe('/register', function() {

      beforeEach(function(done) {
        chai.request(server)
        .post('/api/users/register')
        .send({username: 'testusernametaken', password: 'password'})
        .end(function(err, res) {
          done();
        });
      });

      it('register a user', function(done) {
       chai.request(server)
       .post('/api/users/register')
       .send({username: 'testusername', password: 'password'})
       .end(function(err, res) {
         res.should.have.status(200);
         res.body.should.have.property('token');
         done();
       });
     });

     it('should reject user with taken username', function(done) {
       chai.request(server)
       .post('/api/users/register')
       .send({username: 'testusernametaken', password: 'password'})
       .end(function (err, res) {
         console.log(err);
         res.should.have.status(400);
         done();
       });
     });

    });

    describe('/login', function() {

      beforeEach(function(done) {
        chai.request(server)
        .post('/api/users/register')
        .send({username: 'testusername', password: 'password'})
        .end(function(err, res) {
          done();
        });
      });

      it('should login a user', function(done) {
        chai.request(server)
        .post('/api/users/authenticate')
        .send({username: 'testusername', password: 'password'})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.have.property('token');
          done();
        });
      });

      it('should reject a user with incorrect credentials', function(done) {
        chai.request(server)
        .post('/api/users/authenticate')
        .send({username: 'testusername', password: 'wrongpassword'})
        .end(function(err, res) {
          res.should.have.status(401);
          done();
        });
      });
    });

  });

});
