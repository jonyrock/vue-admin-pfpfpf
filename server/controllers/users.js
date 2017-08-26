const User = require('../models/users');
const Auth = require('../services/auth');

const express = require('express');


const router = express.Router();


router.get('/', function(req, res) {
  res.send('ok');
});

router.get('/list', Auth.requireLogin, function(req, res) {
  User
    .getList()
    .then(r => res.json(r));
});

router.post('/create', Auth.requireLogin, function(req, res) {
  User
    .create(req.body)
    .then(r => res.json(r));
});

router.delete('/:id(\\d+)', Auth.requireLogin, function(req, res) {
  User
    .remove(+req.params.id)
    .then(r => res.json(r));
});

router.put('/:id(\\d+)', Auth.requireLogin, function(req, res) {
  User
    .update(+req.params.id, req.body)
    .then(r => res.json(r));
});


module.exports.router = router;