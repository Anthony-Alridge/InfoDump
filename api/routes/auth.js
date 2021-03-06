const config = require('../../config');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userServices = require('../services/userServices');
const focusServices = require('../services/focusServices');

const errors = {
  PasswordMismatchError: {
    type: "PasswordMismatchError",
    message: "The supplied password is incorrect.",
    location: "password"
  },
  usernameTakenError: {
    type: "usernameTakenError",
    message: "The supplied username is already taken.",
    location: "username"
  }
};

function getJWT(payload) {
  return jwt.sign(
    payload, config.secret, {expiresIn: '7d'});
};

router.post('/register', function(req, res) {
  userServices.create(req.body.username, req.body.password)
        .then(function(payload) {
            res.send({token: getJWT(payload)});
        }, function(err) {
           res.status(401).send(errors[err.name]);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
});

router.post('/authenticate', function(req, res) {
  userServices.authenticate(req.body.username, req.body.password)
    .then(function(user) {
           focusServices.getRootFocusId(user.id)
            .then((rootId) => res.send({token: getJWT({id: user.id, root_id: rootId})}))
    }, function(err) {
      res.status(401).send(errors[err.name]);
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send(err);
    });
});

module.exports = router;
