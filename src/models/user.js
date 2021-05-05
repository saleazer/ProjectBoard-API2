const mongoose = require('mongoose')
const Credential = require('./credential')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.getAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, 'q2w6e9r8t2y5u5')
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username })
    if(!user) {
        throw new Error("No user found")
    }
    const pWord = await Credential.findOne({id: user._id})
    if (!pWord) {
        throw new Error("No match found")
    }
    const isMatch = await bcrypt.compare(password, pWord.password)
    if(!isMatch) {
        throw new Error("Password doesn't match")
    }
    return user
}


const User = mongoose.model('User', userSchema)
module.exports = User