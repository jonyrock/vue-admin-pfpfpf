const UserModel = require('../models/users');

const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');


const TOKEN_SESSION_KEY = 'TOKEN_SESSION_KEY';
const SALT_ROUNDS = 10;

const ERROR_BAD_REQUEST = 1;
const ERROR_BAD_USERNAME = 2;
const ERROR_BAD_PASSWORD = 3;
const ERROR_NO_USERSERNAME = 4;
const ERROR_WRONG_PASSWORD = 5;


const tokens = {};


function login(req, res) {
  return new Promise((resolve, reject) => {
    if(!req.body) {
      reject(ERROR_BAD_REQUEST);
    }
    if(!req.body.username) {
      reject(ERROR_BAD_USERNAME);
    }
    if(!req.body.password) {
      reject(ERROR_BAD_PASSWORD);
    }
    resolve();
  })
  .then(() => UserModel.userByUsername(req.body.username))
  .then(user => {
    if(user === null) {
      return Promise.reject(ERROR_NO_USERSERNAME);
    }
    if(!bcrypt.compareSync(req.body.password, user.password)) {
      return Promise.reject(ERROR_WRONG_PASSWORD);
    }
    var sid = randomstring.generate();
    req.session[TOKEN_SESSION_KEY] = sid;
    tokens[sid] = { user: user };
  })
}

function logout(req) {
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
        resolve(res);
      });
    } catch(err) {
      reject(err);
    }
  })
  .then(password => {
    user.password = password;
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
  requireLogin,
  ERROR_BAD_REQUEST,
  ERROR_BAD_USERNAME,
  ERROR_BAD_PASSWORD,
  ERROR_NO_USERSERNAME,
  ERROR_WRONG_PASSWORD
}