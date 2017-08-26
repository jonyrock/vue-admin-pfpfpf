const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const session = require('express-session');

const UsersCtrl = require('./controllers/users');
const Auth = require('./services/auth');


const CLIENT_DIR = path.join(__dirname, '../client/dist');
const IS_PRODUCTION = process.env.NODE_ENV == 'production';
const PORT = IS_PRODUCTION ? 3011 : 3000;


const app = express();

app.use(bodyParser.json());

app.use(session({
  secret: 'WQXgYCsWUX',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 365 * 24 * 60 * 60 * 1000 }
}));

app.use(Auth.sessionMiddleware);

if(!IS_PRODUCTION) {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
}

app.use('/static', express.static(path.join(CLIENT_DIR, 'static')));
app.use('/users', UsersCtrl.router);

app.get('/', (req, res) => {
  if (IS_PRODUCTION) {
    res.sendFile(path.join(CLIENT_DIR, 'index.html'))
  } else {
    res.redirect('http://localhost:8080');
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