const express = require('express');
const router = express.Router();
const focusServices = require('../services/focusServices');

router.post('/', function (req, res) {
  focusServices.createResource(req.body.name, req.body.url, req.body.focus_id)
    .then((resource) => res.send({resource: {
      name: resource.get('name'),
      url: resource.get('url'),
      id: resource.id
    }}))
    .catch((err) => res.status(400).send({message: err.message}));
});

module.exports = router;
