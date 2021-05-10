const mongoose = require('mongoose')
const url = process.env.MONGO_URL


mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
    socketTimeoutMS: 300000,
})