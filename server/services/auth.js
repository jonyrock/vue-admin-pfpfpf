const UserModel = require('../models/users');

const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');


const TOKEN_SESSION_KEY = 'TOKEN_SESSION_KEY';
const SALT_ROUNDS = 10;


const tokens = {};


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
    return UserModel.userByUsername(req.body.username);
  })
  .then(user => {
    if(!bcrypt.compareSync(req.body.password, user.password)) {
      return Promise.reject('Wrong password');
    }
    var sid = randomstring.generate();
    req.session[TOKEN_SESSION_KEY] = sid;
    tokens[sid] = { user: user };
  });
}

function logout(req, res) {
  var loginId = req.session[TOKEN_SESSION_KEY];
  delete req.session[TOKEN_SESSION_KEY];
  req.user = undefined;
  if(tokens[loginId]) {
    delete tokens[loginId];
  }
}

function createNewUser(user) {
  return new Promise(function(resolve, reject) {
    if(!user.password) {
      reject('No password');
    }
    try {
      bcrypt.hash(user.password, SALT_ROUNDS, (err, res) => {
        if(err) {
          reject('Can`t process user password');
        }
        console.log('bcrypt res: ');
        console.log(res);
        resolve(res);
      });
    } catch(err) {
      reject(err);
    }
  })
  .then(password => {
    console.log('update password');
    user.password = password;
    console.log(user);
    return UserModel.create(user);
  });
}

function sessionMiddleware(req, res, next) {
  var loginId = req.session[TOKEN_SESSION_KEY];
  if(loginId === undefined || !tokens[loginId]) {
    req.user = undefined;
  } else {
    req.user = tokens[loginId].user;
  }
  next();
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
  createNewUser,
  sessionMiddleware,
  requireLogin
}