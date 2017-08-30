const DB = require('../services/db');
const _ = require('lodash');


const DB_NAME = 'usercollection';
const PUBLIC_FIELDS = ['id', 'name', 'email', 'username'];
const UPDATE_FIELDS = ['name', 'email', 'username'];


function getCollection() {
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

function np(fun) {
  return getCollection()
    .then(({ db, c }) => new Promise(fun.bind(null, db, c)));
}

function _normalizeUser(user) {
  user.username = user.username.toLowerCase();
  user.email = user.email.toLowerCase();
}

function clearFields(fields, user) {
  for(var key in user) {
    if(!~fields.indexOf(key)) {
      delete user[key];
    }
  }
}

function getList() {
  return np(function(db, c, resolve, reject) {
    c.find().toArray(function(err, result) {
      _.each(result, clearFields.bind(null, PUBLIC_FIELDS));
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
  .then(() => np(function(db, c, resolve, reject) {
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
  return np(function(db, c, resolve, reject) {
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

function create(user) {
  // TODO: validate fields
  _normalizeUser(user);
  return getList()
    .then(list => _.maxBy(list, 'id').id + 1)
    .then(newId => np(function(db, c, resolve, reject) {
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
  return np(function(db, c, resolve, reject) {
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
  clearFields(UPDATE_FIELDS, user);
  _normalizeUser(user);
  
  // TODO: check fields to update
  return np(function(db, c, resolve, reject) {
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
  });
}

function emailExists(email) {
  email = email.toLowerCase();
  return np(function(db, c, resolve, reject) {
    c.findOne({ email: email }, (err, res) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(res !== null);
    });
  })
}

function usernameExists(username) {
  username = username.toLowerCase();
  return np(function(db, c, resolve, reject) {
    c.findOne({ username: username }, (err, res) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(res !== null);
    });
  })
}


module.exports = {
  getList,
  create,
  update,
  remove,
  emailExists,
  usernameExists
}