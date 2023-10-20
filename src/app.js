const express = require('express')
const user = require('../routes/user')
const app = express()
app.use('/user/', user)
app.use('/', user)

module.exports = app
