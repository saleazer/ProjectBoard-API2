const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const credentialSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    strict: true
})

credentialSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 6)
    }
    next()
})

const Credential = mongoose.model('Credential', credentialSchema)
module.exports = Credential
