const User = require('../models/users');
const express = require('express');


const router = express.Router();


function _checkId(req, res) {
  var id = +req.params.id;
  if(isNaN(id)) {
    res.status(500);
    res.send('Bad user id');
    return false;
  }
  return true;
}

router.get('/', function(req, res) {
  res.send('ok');
});

router.get('/list', function(req, res) {
  User
    .getList()
    .then(r => res.json(r));
});

router.post('/create', function(req, res) {
  User
    .create(req.body)
    .then(r => res.json(r));
});

router.delete('/:id', function(req, res) {
  if(!_checkId(req, res)) {
    return;
  }
  User
    .remove(+req.params.id)
    .then(r => res.json(r));
});

router.put('/:id', function(req, res) {
  if(!_checkId(req, res)) {
    return;
  }
  User
    .update(+req.params.id, req.body)
    .then(r => res.json(r));
});


module.exports.router = router;