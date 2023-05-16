const express = require('express')
const indexRouter = require('./routes/index')
const config = require('./config/config.json')
let app = express()
global.connectDatabase = require('./database/connection').connectDatabase
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

/* SERVER START */
const port = config.port
const server = app.listen(port, () => {
    console.log('Api is running on port', port)
    console.log(`try this url http://localhost:${port}/blog/ping`)
})

module.exports = app
