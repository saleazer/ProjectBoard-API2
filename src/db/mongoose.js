const mongoose = require('mongoose')
const url = 'mongodb+srv://nodejsuser:N0d3JSUs3r%21@sal-db-01.5va2s.mongodb.net/projectBoardDB?retryWrites=true&w=majority'

mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
    socketTimeoutMS: 300000,
})