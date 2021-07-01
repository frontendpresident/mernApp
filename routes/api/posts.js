const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')
const Post = require('../../models/post')
const Profile = require('../../models/profile');
const validatePostInput = require('../../validation/post');

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

router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json(err))
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                res.status(404).json({ posts: 'Пост не найден' })
            }
            res.json(post)
        })
        .catch(err => res.status(404).json(err))
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.user.toString() !== req.user.id) {
                        res.status(401).json({ notauthorized: 'Пользователь не авторизован' })
                    }
                    post.remove().then(() => res.json({ success: true }))
                })
                .catch(err => res.status(404).json({ post: 'Пост не найден' }))
        })

})

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ allreadylike: 'Пользователь уже лайкнул этот пост' })
                    }

                    post.likes.unshift({ user: req.user.id })
                    post.save().then(post => res.json(post))
                })
                .catch(err => res.status(404).json({ post: 'Пост не найден' }))
        })

})

router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notlike: 'Пользователь еще не лайкнул этот пост' })
                    }

                    const removeIndex = post.likes.map(item => item.user.toString())
                        .indexOf(req.user.id)
                    post.likes.splice(removeIndex, 1)
                    post.save().then(post => res.json(post))
                        .catch(err => res.status(404).json({ post: 'Пост не найден' }))
                })
                .catch(err => res.status(404).json({ post: 'Пост не найден' }))
        })

})

router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    if (!isValid) {
        res.status(400).json(errors)
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }
            post.comments.unshift(newComment)
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ post: 'Пост не найден' }))
})

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({ commentNotFound: 'Коментарий не существует' })
            }
            const removeIndex = post.comments.map(comment => comment._id.toString())
                .indexOf(req.params.comment_id)
            post.comments.splice(removeIndex, 1)
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ comment: 'Не найден' }))
})


module.exports = router;