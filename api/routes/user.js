const config = require('../../config');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userServices = require('../services/userServices');

router.post('/register', function(req, res) {
  userServices.create(req.body.username, req.body.password)
        .then(function(user) {
            const token = jwt.sign(
              {username: user.username}, config.secret, {expiresIn: '7d'});
            res.send({token: token});
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });
});

router.post('/authenticate', function(req, res) {
  userServices.authenticate(req.body.username, req.body.password)
    .then(function(user) {
      const token = jwt.sign(
        {username: user.username}, config.secret, {expiresIn: '7d'});
      res.send({token: token});
    }, function(err) {
      res.status(401).send(err);
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send(err);
    });
});

module.exports = router;
