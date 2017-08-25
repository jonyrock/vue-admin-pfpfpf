const DB = require('../services/db');
const _ = require('lodash');

const DB_NAME = 'usercollection';
const PUBLIC_FIELDS = ['name', 'email'];

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

function clearPublicFields(user) {
  for(var key in user) {
    if(!~PUBLIC_FIELDS.indexOf(key)) {
      delete user[key];
    }
  }
}

function getList() {
  return np(function(db, c, resolve, reject) {
    c.find().toArray(function(err, result) {
      db.close();
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

function create(user) {
  clearPublicFields(user);
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
    }))
  // TODO: check fields to create
  
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
  clearPublicFields(user);
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


module.exports = {
  getList,
  create,
  update,
  remove
}