const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const passport = require('passport')

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const corsOptn = {
   origin: 'http://localhost:5001'
}

app.use(cors(corsOptn))

app.get('/', (req, res) => {
   return res.send('Hello!')
});

//DB config
const db = require('./config/keys').URL

//Body parser
app.use(express.urlencoded({extended: false}));
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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server starting on Port: ${port}`));
