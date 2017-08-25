var MongoClient = require('mongodb').MongoClient;
var Promise = require('rsvp').Promise;
var uri = 'mongodb://localhost:27017/vue-admin-pf';

function connect() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(uri, function(err, db) {
      if (err) {
        reject(err);  
      } else {
        resolve(db);
      }
    })
  })
}

module.exports = {
  connect
}

