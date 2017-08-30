const AuthService = require('../services/auth');
const UserModel = require('../models/users');

const express = require('express');


const router = express.Router();

router.get('/checkLogin', function(req, res) {
  // sessionMiddleware will add user if logged
  if(req.user) {
    res.json({ result: true, user: req.user });
  } else {
    res.json({ result: false });
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

router.post('/emailExists', function(req, res) {
  var email = req.body.email;
  UserModel
    .emailExists(email)
    .then(exists => {
      res.json({ result: exists })
    })
});

router.post('/usernameExists', function(req, res) {
  var username = req.body.username;
  UserModel
    .usernameExists(username)
    .then(exists => {
      res.json({ result: exists })
    })
});

module.exports = {
  router
}