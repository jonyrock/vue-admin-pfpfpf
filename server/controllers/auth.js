const AuthService = require('../services/auth');

const express = require('express');


const router = express.Router();

router.get('/check', function(req, res) {
  // sessionMiddleware will add user if logged
  if(req.user) {
    res.json({ result:'ok', user: req.user });
  } else {
    res.json({ result:'fail' });
  }
});

router.post('/new', AuthService.requireLogin, function(req, res) {
  var user = req.body;
  AuthService
    .createNewUser(user)
    .then(r => res.json({ result: 'ok' }));
});

router.post('/login', function(req, res) {
  AuthService
    .login(req)
    .then(r => res.json(r));
});

module.exports = {
  router
}