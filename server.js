const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const passport = require('passport')
const path = require('path')

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//DB config
const db = require('./config/keys').URL

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

mongoose
   .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
   })
   .then(() => console.log('Connect date base MongoDB'))
   .catch((err) => console.log(`Error: ${err}`))

app.use(passport.initialize());
require('./config/passport')(passport)

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server starting on Port: ${port}`));
