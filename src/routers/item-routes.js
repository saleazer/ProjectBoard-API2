const { response } = require('express')
const express = require('express')
const router = new express.Router()
const BoardItem = require('../models/board-item')
const auth = require('../middleware/auth')

//POST route to create a new item
router.post('/board-item', auth, async (req, res) => {
    const item = new BoardItem({ ...req.body, owner: req.user._id})
    try {
        await item.save()
        res.status(201).send(item)
    } catch (e) {
        res.status(400).send(e)
    }
})

//GET route to return all items in the database
router.get('/board-item', auth, async (req, res) => {
    try {
        const allItems = await BoardItem.find({})
        res.status(200).send(allItems)
    } catch (e) {
        res.status(400).send(e)
    }
})

//GET route to return all items for a single project
router.get('/board-item/byParent/:id', auth, async (req, res) => {
    try {
        const parentID = req.params.id
        const allItems = await BoardItem.find({ parentID })
            res.status(200).send(allItems)
    } catch (e) {
        console.log(e)
    }
})

// PATCH to update single task information
router.patch('/board-item/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'state', 'priority', 'effort']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid updates!"})
    }
    try {
        const updatedItem = await BoardItem.findById(req.params.id)
        updates.forEach((update) => updatedItem[update] = req.body[update])
        await updatedItem.save()

        if (!updatedItem) {
            return res.status(404).send()
        } else {
            res.send(updatedItem)
        }        
    } catch (e) {
        res.status(400).send(e)
    }
})

// DELETE items by id
router.delete('/board-item/:id', async (req, res) => {
    try {
        const item = await BoardItem.findByIdAndDelete(req.params.id)

        if (!item) {
            return res.status(404).send()
        } else {
            res.send(item)
        }
    } catch (e) {
        res.status(500).send(e) 
    }
})

module.exports = router
