const mongoose = require('mongoose')

const boardItemSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: false
    },
    description: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        default: "New"
    },
    priority: {
        type: String,
        default: "Low"
    },
    effort: {
        type: String,
        default: "Low"
    },
    owner: {
        type: String,
        required: true
    },
    parentID: {
        type: String,
    }
}, {
    strict: true
})

const BoardItem = mongoose.model('BoardItem', boardItemSchema)
module.exports = BoardItem
