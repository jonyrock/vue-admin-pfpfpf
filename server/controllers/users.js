const User = require('../models/users');
const express = require('express');


const router = express.Router();

router.get('/', function(req, res){
  res.send('ok');
});

router.get('/list', function(req, res) {  
  User
    .getList()
    .then(r => res.json(r));
});

router.delete('/:id', function(req, res) {
  console.log('i will delete ' + req.param.id);
  res.send('ok');
});

router.put('/:id', function(req, res) {
  console.log('i will update ' + req.param.id);
  res.send('ok');
});

module.exports.router = router;