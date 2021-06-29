const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const profile = require('../../models/profile');
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

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {}
    const profileFields = {};
    profileFields.user = req.body.user

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githhub) profileFields.githhub = req.body.githhub;

    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    profileFields.social = {};
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.body.id })
        .then(profile => {
            if (profile) {
                Profile.findOneAndUpdate(
                    { user: req.body.id },
                    { $set: profileFields },
                    { new: true }
                )
                    .then(profile => res.json(profile));
            }
            else {
                Profile.findOne({ handle: req.body.handle })
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'Этот файл уже существует';
                            res.status(400).json(errors)
                        }
                        new Profile(profileFields)
                            .save()
                            .then(profile => res.json(profile))
                    })
            }
        })

})

module.exports = router;