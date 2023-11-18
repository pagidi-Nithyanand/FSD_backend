const express = require('express')
const user = require('./routes/user')
const comment = require('./routes/comment')
const video = require('./routes/video')
const extra = require('./routes/extra')
const studio = require('./routes/studio')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use('/user/', user)
app.use('/', extra)
app.use('/studio', studio)
app.use('/comment', comment)
app.use('/video', video)
module.exports = app
