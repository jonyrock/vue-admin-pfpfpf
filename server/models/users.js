const DB = require('../services/db');
const _ = require('lodash');
const validator = require('validator');


const DB_NAME = 'usercollection';
const PUBLIC_FIELDS = ['fullname', 'email', 'username', 'id'];
const UPDATE_FIELDS = ['fullname', 'email', 'username'];


function _getCollection() {
  return DB
    .connect()
    .then(db => {
      var c = db.collection(DB_NAME);
      return Promise.resolve({ db, c });
    })
    .catch(e => {
      console.log("catch in getCollection " + DB_NAME);
      console.log(e);
    })
}

function _np(fun) {
  return _getCollection()
    .then(({ db, c }) => new Promise(fun.bind(null, db, c)));
}

function _normalizeUser(user) {
  user.username = user.username.toLowerCase();
  user.email = user.email.toLowerCase();
}

function _clearFields(fields, user) {
  for(var key in user) {
    if(!~fields.indexOf(key)) {
      delete user[key];
    }
  }
}

function getList() {
  return _np(function(db, c, resolve, reject) {
    c.find().toArray(function(err, result) {
      _.each(result, _clearFields.bind(null, PUBLIC_FIELDS));
      db.close();
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

function userById(id) {
  return new Promise(function(resolve, reject) {
    if(isNaN(+id)) {
      reject('Bad id');
      return;
    }
    resolve();
  })
  .then(() => _np(function(db, c, resolve, reject) {
    c.findOne({ id: id }, (err, res) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  }))
}

function userByUsername(username) {
  username = username.toLowerCase();
  return _np(function(db, c, resolve, reject) {
    c.findOne({ username: username }, (err, res) => {
      db.close();
      if(err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

function userByEmail(email) {
  email = email.toLowerCase();
  return _np(function(db, c, resolve, reject) {
    c.findOne({ email: email }, (err, res) => {
      db.close();
      if(err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

function validateFullname(value) {
  return new Promise(function(resolve, reject) {
      if(value === undefined) {
        reject('ERROR_EMPTY_FULLNAME');
        return;
      }
      while(value.indexOf(' ') !== -1) {
        value = value.replace(' ', '');
      }
      if(value.length === 0) {
        reject('ERROR_EMPTY_FULLNAME');
        return;
      }
      if(!validator.isAlpha(value)) {
        reject('ERROR_BAD_FULLNAME');
        return;
      }
      resolve();
    });
}

function validateUsername(username, id) {
  return new Promise(function(resolve, reject) {
      if(!validator.isAlphanumeric(username)) {
        reject('ERROR_BAD_USERNAME');
      }
      resolve();
    })
    .then(() => userByUsername(username))
    .then(res => {
      if(res !== null && res.id !== id) {
        return Promise.reject('ERROR_USERNAME_EXISTS');
      }
      return true;
    })
}

function validateEmail(email, id) {
  return new Promise(function(resolve, reject) {
      if(!validator.isEmail(email)) {
        reject('ERROR_BAD_EMAIL');
      }
      resolve();
    })
    .then(() => userByEmail(email))
    .then(res => {
      if(res !== null && res.id !== id) {
        return Promise.reject('ERROR_EMAIL_EXISTS');
      }
    })
}

function _getNextId() {
  return getList()
    .then(list => _.maxBy(list, 'id').id + 1);
}

function create(user) {
  _normalizeUser(user);
  return Promise.resolve()
    .then(() => validateFullname(user.fullname))
    .then(() => validateUsername(user.username))
    .then(() => validateEmail(user.email))
    .then(() => _getNextId())
    .then(newId => _np(function(db, c, resolve, reject) {
      user.id = newId;
      c.insertOne(user, function(err, result) {
        db.close();
        if(err) {
          return reject(err);
        }
        result.result.id = newId;
        resolve(result);
      });
    }));
}

function remove(id) {
  return _np(function(db, c, resolve, reject) {
    c.deleteOne({ id: id }, function(err, result) {
      db.close();
      if(err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

function update(id, user) {
  _clearFields(UPDATE_FIELDS, user);
  _normalizeUser(user);

  return Promise.resolve()
    .then(() => user.fullname !== undefined ? validateEmail(user.fullname) : true)
    .then(() => user.username !== undefined ? validateUsername(user.username, id) : true)
    .then(() => user.email !== undefined ?validateEmail(user.email, id) : true)
    .then(() => _np(function(db, c, resolve, reject) {
      c.updateOne(
        { id: id }, 
        { $set: user, $currentDate: { "lastModified": true } }, 
        function(err, result) {
          
          db.close();
          if(err) {
            return reject(err);
          }
          resolve(result);
        });
    }))
}


module.exports = {
  getList,
  create,
  update,
  remove,
  userByUsername,
  userByEmail,
  validateUsername,
  validateEmail
}