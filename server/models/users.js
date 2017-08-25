var DB = require('../services/db');

const DB_NAME = 'usercollection';

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

function getList() {
  return getCollection()
    .then(({ db, c }) => {
      return new Promise(function(resolve, reject) {
        c.find().toArray(function(err, result) {
          if (err) {
            return reject(err);
          }
          db.close();
          resolve(result);
        });
      })
    })
}

module.exports = {
  getList
}