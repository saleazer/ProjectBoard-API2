const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const itemRoutes = require('./routers/item-routes')
const projectRoutes = require('./routers/project-routes')
const userRoutes = require('./routers/user-routes')
const Project = require('./models/project')
const BoardItem = require('./models/board-item')
const User = require('./models/user')

// Express Setup & port assignment
const app = express()
const port = process.env.PORT || 8089

// CORS Policy Setup
const corsOptions = {
    allowedHeaders: ['Authorization', 'Content-Type']
}
app.use(cors(corsOptions))
app.options('*', cors())

// Express converts the response to JSON
app.use(express.json())

// Express uses the routers provided
app.use(itemRoutes, projectRoutes, userRoutes)

// Express running the server
app.listen(port, ()=> {
    console.log('Server launched on port ' + port)
})