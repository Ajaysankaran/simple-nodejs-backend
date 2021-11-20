const express = require('express')
const router = new express.Router
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/users', auth,async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/list', auth, async (req,res) => {
    const user = await User.find()
    res.status(200).send(user)

})

router.post('/users/login', async(req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async(req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })  

        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router;