const config = require('../../config');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const focusServices = require('../services/focusServices');

/*
* Gets the root focus associated with the user's account.
*/
router.get('/root', function(req, res) {
  focusServices.getFocus(req.user.root_id)
    .then(function(focusSummary) {
      var root_focus = focusSummary;
      res.send({root_focus});
    })
    .catch(function (err) {
      res.status(400).send(err.message);
    })
});

/*
* Gets a focus given it's id
*/
router.get('/', function(req, res) {
  var id = req.query.id;
  focusServices.getFocus(id)
    .then(function(focusSummary) {
      res.send({focus: focusSummary});
    })
    .catch(function (err) {
      res.status(400).send(err.message);
    })
});

/*
* Get's all the sub-focuses associated with the given focus id.
*/
router.get('/all', function(req, res) {
  var id = req.query.id;
});

/*
* Update a property on the given focus (the name of the focus).
*/
router.put('/:id', function(req, res) {

});

/*
* Create a new focus and associate it with the supplied parent id.
*/
router.post('/', function(req, res) {
  focusServices.createFocus(req.body.parent_focus_id, req.body.name)
  .then(function (focus) {
   res.status(200).send({name: focus.get('name'), id:focus.id});
  })
  .catch(function(err) {
   res.status(400).send(err.message);
  })
});
module.exports = router;
