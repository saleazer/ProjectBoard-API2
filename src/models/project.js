const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    owner: {
        type: String,
        required: true
    },
    completeDate: {
        type: Date
    }
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project