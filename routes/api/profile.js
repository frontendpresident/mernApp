const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport')
const Profile = require('../../models/profile');
const User = require('../../models/user');

router.get('/test', (req, res) => res.json({ message: "Profile Working" }));

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.profile = 'Профиль не найден'
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => console.log(err))
})

module.exports = router;