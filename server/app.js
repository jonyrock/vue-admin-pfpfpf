const express = require('express');
const path = require('path');

const app = express();

const CLIENT_DIR = path.join(__dirname, '../client/dist');
const PORT = process.env.NODE_ENV === 'production' ? 3011 : 3000;


app.use('/static', express.static(path.join(CLIENT_DIR, 'static')));

app.get('/', (req, res) => {
  if (process.env.NODE_ENV == 'production') {
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