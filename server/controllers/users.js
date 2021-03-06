const UserModel = require('../models/users');
const AuthService = require('../services/auth');

const express = require('express');


const router = express.Router();


router.get('/', function(req, res) {
  res.send('ok');
});

router.get('/list', AuthService.requireLogin, function(req, res) {
  UserModel
    .getList()
    .then(r => res.json(r))
    .catch(error => res.json({ error }));
});

router.delete('/:id(\\d+)', AuthService.requireLogin, function(req, res) {
  UserModel
    .remove(+req.params.id)
    .then(r => res.json(r))
    .catch(error => res.json({ error }));
});

router.put('/:id(\\d+)', AuthService.requireLogin, function(req, res) {
  UserModel
    .update(+req.params.id, req.body)
    .then(r => res.json({ ok: true }))
    .catch(error => {
      res.json({ error });
    });
});


module.exports.router = router;