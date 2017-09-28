process.env.NODE_ENV = 'test';

var chai     = require('chai');
var should   = chai.should();
var chaiHttp = require('chai-http');
var server   = require('../server');
var knex     = require('../api/models/knex');
var JWT      = require('jsonwebtoken');
var config   = require('../config');

chai.use(chaiHttp);

describe('Routes:\n', function() {
  // create database before each test.
  beforeEach(function(done) {
     knex.migrate.rollback()
     .then(function() {
       knex.migrate.latest()
       .then(function() {
         return knex.seed.run()
         .then(function() {
           done();
         });
       });
     });
   });
// destroy database after each test.
   afterEach(function(done) {
     knex.migrate.rollback()
     .then(function() {
       done();
     });
   });
   /////-------AUTH ROUTES---------//////

  describe('auth routes', function() {

    describe('/register', function() {

      beforeEach(function(done) {
        chai.request(server)
        .post('/api/auth/register')
        .send({username: 'testusernametaken', password: 'password'})
        .end(function(err, res) {
          done();
        });
      });

      it('register a user', function(done) {
       chai.request(server)
       .post('/api/auth/register')
       .send({username: 'testusername', password: 'password'})
       .end(function(err, res) {
         res.should.have.status(200);
         res.body.should.have.property('token');
         done();
       });
     });

     it('should reject user with taken username', function(done) {
       chai.request(server)
       .post('/api/auth/register')
       .send({username: 'testusernametaken', password: 'password'})
       .end(function (err, res) {
         res.should.have.status(401);
         done();
       });
     });

    });

    describe('/login', function() {

      beforeEach(function(done) {
        chai.request(server)
        .post('/api/auth/register')
        .send({username: 'testusername', password: 'password'})
        .end(function(err, res) {
          done();
        });
      });

      it('should login a user', function(done) {
        chai.request(server)
        .post('/api/auth/authenticate')
        .send({username: 'testusername', password: 'password'})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.have.property('token');
          done();
        });
      });

      it('should reject a user with incorrect credentials', function(done) {
        chai.request(server)
        .post('/api/auth/authenticate')
        .send({username: 'testusername', password: 'wrongpassword'})
        .end(function(err, res) {
          res.should.have.status(401);
          done();
        });
      });
    });

  });
  /////-------AUTH  ROUTES---------//////
  /////-------FOCUS ROUTES---------//////
  describe('focus routes', function(done) {
    var userOneToken = null;
    var authHeader = 'authorization'
    beforeEach(function(done) {
      userOneToken = JWT.sign({id:1, root_id:1},  config.secret);
      done();
    });

    describe('getRoot', function(done) {
      it('should return the given user root focus', function(done) {
        chai.request(server)
          .get('/api/focus/root')
          .set(authHeader, userOneToken)
          .send()
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.have.property('root_focus');
            res.body.root_focus.should.have.property('child_focuses');
            res.body.root_focus.should.have.property('name');
            res.body.root_focus.name.should.equal('root');
            done();
          });
      });
    });

    describe('get', function(done) {
      it('it should return the requested focus', function(done) {
        chai.request(server)
          .get('/api/focus?id=1')
          .set(authHeader, userOneToken)
          .send()
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.have.property('focus');
            res.body.focus.should.have.property('child_focuses');
            res.body.focus.child_focuses.should.be.a('array');
            res.body.focus.should.have.property('name');
            res.body.focus.child_focuses[0].should.have.property('name');
            res.body.focus.child_focuses[0].name.should.equal('root_child');
            res.body.focus.should.have.property('resources');
            res.body.focus.resources.should.be.a('array');
            res.body.focus.resources[0].name.should.equal('test');
            res.body.focus.resources[0].url.should.equal('www.testurl.com');
            done();
          });
      });
    });

    describe('create', function(done) {
      it('should successfully create the focus', function(done) {
        chai.request(server)
          .post('/api/focus')
          .set(authHeader, userOneToken)
          .send({name: 'new_focus', parent_focus_id: 1})
          .end(function(err, res) {
            res.should.have.status(200);
            done();
          });
      });

      it('should attach the newly created focus to the parent focus', function(done) {
        chai.request(server)
          .post('/api/focus')
          .set(authHeader, userOneToken)
          .send({name: 'new_focus', parent_focus_id: 2})
          .end(function(err, res) {
            res.should.have.status(200);
            chai.request(server)
              .get('/api/focus?id=2')
              .set(authHeader, userOneToken)
              .send()
              .end(function(err, res) {
                res.should.have.status(200);
                res.body.focus.should.have.property('child_focuses');
                res.body.focus.child_focuses.should.be.a('array');
                res.body.focus.child_focuses[0].should.have.property('name');
                res.body.focus.child_focuses[0].name.should.equal('new_focus');
                done();
              });
          });
      });
    });
  });
/////-------FOCUS ROUTES---------//////
////-----------RESOURCE ROOTS ------------/////
  describe('resource routes', function(done) {
    var userOneToken = null;
    var authHeader = 'authorization';

    beforeEach(function(done) {
      userOneToken = JWT.sign({id:1, root_id:1},  config.secret);
      done();
    });

    describe('create', function(done) {
      it('should successfully create the resource', function(done) {
        chai.request(server)
          .post('/api/resource')
          .set(authHeader, userOneToken)
          .send({name: 'new_resource', url:'www.resourceurl.com', focus_id: 1})
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.have.property('resource');
            res.body.resource.should.have.property('id');
            res.body.resource.should.have.property('name');
            res.body.resource.should.have.property('url');
            res.body.resource.name.should.equal('new_resource');
            res.body.resource.url.should.equal('www.resourceurl.com');
            res.body.resource.id.should.equal(2);
            chai.request(server)
              .get('/api/focus?id=1')
              .set(authHeader, userOneToken)
              .send()
              .end(function(err, res) {
                res.should.have.status(200);
               res.body.focus.resources[1].name.should.equal('new_resource');
                done();
               });
           });
       });
   });
});
///////////------RESOURCE------//////////////
});
