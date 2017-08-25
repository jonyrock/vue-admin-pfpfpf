const express = require('express');
const path = require('path');

const app = express();

const CLIENT_DIR = path.join(__dirname, '../client/dist');
const IS_PRODUCTION = process.env.NODE_ENV == 'production';
const PORT = IS_PRODUCTION ? 3011 : 3000;

const USERS = require('./controllers/users');

if(!IS_PRODUCTION) {
  app.use(function(req, res, next) {
    console.log('hhhe');
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
}

app.use('/static', express.static(path.join(CLIENT_DIR, 'static')));
app.use('/users', USERS.router);




app.get('/', (req, res) => {
  if (IS_PRODUCTION) {
    res.sendFile(path.join(CLIENT_DIR, 'index.html'))
  } else {
    res.redirect('localhost:8080');
  }
});

app.listen(PORT, err => {
  if(err) {
    console.log("ERROR: " + err);
    process.exit(1);
    return;
  }
  console.log(`Example app listening on port ${PORT}!`);
});