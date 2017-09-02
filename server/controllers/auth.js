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

router.post('/login', function(req, res) {
  AuthService
    .login(req)
    .then(r => res.json(r));
});

router.post('/createNewUser', function(req, res) {
  console.log('createNewUser');
  console.log(req.body);
  var user = req.body;
  AuthService
    .createNewUser(user)
    .then(user => {
      console.log('created user')
      res.json({ result: true });
    })
});

router.post('/emailExists', function(req, res) {
  var email = req.body.email;
  UserModel
    .emailExists(email)
    .then(exists => {
      res.json({ result: exists });
    })
});

router.post('/usernameExists', function(req, res) {
  var username = req.body.username;
  UserModel
    .usernameExists(username)
    .then(exists => {
      res.json({ result: exists });
    })
});

module.exports = {
  router
}