const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')
const Post = require('../../models/post')
const validatePostInput = require('../../validation/post')

router.get('/test', (req, res) => res.json({ message: "Posts Working" }));

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    if (!isValid) {
        res.status(400).json(errors)
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
    })

    newPost.save()
        .then(post => {
            res.json(post)
        })
        .catch(err => res.json(err))
})


module.exports = router;