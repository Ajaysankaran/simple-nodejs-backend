const express = require('express')
const router = new express.Router
const Blog = require('../models/blogs')
const auth = require('../middleware/auth')
const user = require('../models/user')
const User = require('../models/user')

router.post('/blogs', auth, (req, res) => {
    try {
        const blog = new Blog({
            ...req.body,
            createdBy: req.user._id
        })
        blog.save()
        res.status(200).send("Blog Saved Successfully")
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/blogs/me', auth, async (req,res) => {
    try {
        const blogs = await Blog.find({ createdBy: req.user._id })
        res.status(200).send(blogs)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/blogs/:userNickName', auth, async (req,res) => {
    try {
        const user = await User.findOne({ nickname: req.params.userNickName })
        const blogs = await Blog.find({ createdBy: user._id })
        res.status(200).send(blogs)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;