const User = require('./../models/users');
const express = require('express');


const router = express.Router();

router.get('/', function(req, res){
  res.send('ok');
});

router.get('/list', function(req, res) {  
  res.send(JSON.stringify(User.getList()));
});

module.exports.router = router;