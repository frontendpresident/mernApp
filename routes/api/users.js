const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

router.get('/test', (req, res) => res.json({ message: "Users Working" }));

router.post('/registr', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email allready exists' })
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar,
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                })
            })
         }
     })
})

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(isMatch){
                res.json({msg: 'Success'})
            }
            else {
                return res.status(400).json({password: 'Password incorrected'})
            }
        })
    })
})

module.exports = router;