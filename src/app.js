const express = require('express')
const user = require('./routes/user')
const video = require('./routes/Video')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use('/user/', user)
app.use('/', user)
app.use('/video', video)
module.exports = app
