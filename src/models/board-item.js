const mongoose = require('mongoose')

const boardItemSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        required: false,        
    },
    state: {
        type: String,
        required: true,
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
    },
    dueDate: {
        type: String
    }
}, {
    strict: true
})

const BoardItem = mongoose.model('BoardItem', boardItemSchema)
module.exports = BoardItem
