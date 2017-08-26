
const Users = require('../models/users');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');

var loginSessions = {};


function login(req, res) {
  return new Promise((resolve, reject) => {
    if(!req.body) {
      reject('No user object in request');
    }
    if(!req.body.username) {
      reject('No username in request');
    }
    if(!req.body.password) {
      reject('No password in request');
    }
    return Users.userByUsername(req.body.username);
  })
  .then(user => {
    if(!bcrypt.compareSync(req.body.password, user.password)) {
      return Promise.reject('Wrong password');
    }
    var sid = randomstring.generate();
    req.session['loginId'] = sid;
    loginSessions[sid] = {
      user: user
    };
  });
}

function logout(req, res) {
  var loginId = req.session['loginId'];
  delete req.session['loginId'];
  req.user = undefined;
  if(loginSessions[loginId]) {
    delete loginSessions[loginId];
  }
}

function sessionMiddleware(req, res, next) {
  var loginId = req.session['loginId'];
  if(!loginSessions[loginId]) {
    req.user = undefined;
    next();
    return;
  } else {
    req.user = loginSessions[loginId].user;
  }
}

function requireLogin(req, res, next) {
  if(!req.user) {
    res.status(401);
    res.send('Unauthorized');
  } else {
    next();
  }
}



module.exports = {
  login,
  logout,
  sessionMiddleware,
  requireLogin
}