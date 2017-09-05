const AuthService = require('../services/auth');
const UserModel = require('../models/users');

const express = require('express');


const router = express.Router();



const ERROR_MESSAGES = {};
ERROR_MESSAGES[AuthService.ERROR_BAD_PASSWORD] = 'ERROR_BAD_PASSWORD';
ERROR_MESSAGES[AuthService.ERROR_BAD_REQUEST] = 'ERROR_BAD_REQUEST';
ERROR_MESSAGES[AuthService.ERROR_BAD_USERNAME] = 'ERROR_BAD_USERNAME';
ERROR_MESSAGES[AuthService.ERROR_NO_USERSERNAME] = 'ERROR_NO_USERSERNAME';
ERROR_MESSAGES[AuthService.ERROR_WRONG_PASSWORD] = 'ERROR_WRONG_PASSWORD';


router.post('/login', function(req, res) {
  AuthService
    .login(req)
    .then(r => {
      res.json({ ok: true });
    })
    .catch(err => {
      res.json({ error: ERROR_MESSAGES[err] });
    })
});


router.get('/checkLogin', function(req, res) {
  // sessionMiddleware will add user if logged
  if(req.user) {
    res.json({ result: true, user: req.user });
  } else {
    res.json({ result: false });
  }
});

router.post('/createNewUser', function(req, res) {
  var user = req.body;
  AuthService
    .createNewUser(user)
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.json({ error: error });
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

router.get('/logout', AuthService.requireLogin, function(req, res) {
  AuthService.logout(req);
  res.json({ ok: 'true' });
});

module.exports = {
  router
}