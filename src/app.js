const express = require('express')
const userRoutes = require('./routers/user')
const blogRoutes = require('./routers/blog')

const app = express();
const port = 9001
require('./db/mongoose')

app.use(express.json())
app.use(userRoutes)
app.use(blogRoutes)

app.listen(port, () => {
    console.log('server is up on port : ' + port)
})

