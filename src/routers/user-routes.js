const express = require('express')
const mongoose = require('mongoose')
const router = new express.Router()
const User = require('../models/user')
const Credential = require('../models/credential')
const auth = require('../middleware/auth')

// Create new user
router.post('/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        })
    const cred = new Credential({ id: user._id, password: req.body.password })
    try {
        await user.save()
        await cred.save()
        const token = await user.getAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})

// Login existing user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.getAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})

// Logout user
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter( (token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)

    } catch (e) {
        res.status(404).send(e)
        console.log(e)
    }
})


module.exports = router