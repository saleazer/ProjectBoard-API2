const express = require('express')
const router = new express.Router()
const Project = require('../models/project')
const auth = require('../middleware/auth')

// Creates new project and assigns auth'ed person as owner
router.post('/projects', auth, async (req, res) => {
    const project = new Project({ ...req.body, owner: req.user._id})
    try {
      await project.save()
      res.status(201).send(project)  
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})

// Gets all projects assigned to the auth'ed person
router.get('/projects', auth, async (req, res) => {
  try {
    const projects = await Project.find({owner: req.user._id})
    return res.status(200).send(projects)
  } catch (e) {
    res.status(500).send(e)
  }
})

// Deletes projects assigned to the auth'ed owner
router.delete('/projects/:id', auth, async (req, res) => {
  try {
    console.log(req.user.id)
    const deleted = await Project.deleteOne({ _id: req.params.id, owner: req.user.id })
    if (deleted.deletedCount === 0) {
      return res.status(404).send()
    }
    res.send(deleted)
  } catch (e) {
    res.status(500).send(e)
  }
})






module.exports = router