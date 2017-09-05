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


function _undefinedOrNum(param) {
  if(param === undefined) {
    return undefined;
  }
  return +param;
}

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

router.post('/validateUsername/:id(\\d+)?', function(req, res) {
  var username = req.body.username;
  UserModel
    .validateUsername(username, _undefinedOrNum(req.params.id))
    .then(() => {
      res.json({ ok: true });
    })
    .catch(error => {
      res.json({ error })
    })
});

router.post('/validateEmail/:id(\\d+)?', function(req, res) {
  var email = req.body.email;
  UserModel
    .validateEmail(email, _undefinedOrNum(req.params.id))
    .then(() => {
      res.json({ ok: true });
    })
    .catch(error => {
      res.json({ error })
    })
});

router.get('/logout', AuthService.requireLogin, function(req, res) {
  AuthService.logout(req);
  res.json({ ok: 'true' });
});

module.exports = {
  router
}