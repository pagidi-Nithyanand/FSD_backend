const middleware = require('./middleware')
const UserModel = require('../models/UserModel')
const express = require('express')
const app = express()

app.get('/Profile', middleware, async (req, res) => {
  try {
    console.log('2')
    let exist = await UserModel.findById(req.user.id)
    if (!exist) {
      return res.status(400).send('User not found')
    }
    console.log('exist')
    console.log(exist)
    res.json(exist)
  } catch (err) {
    console.log(err)
    return res.status(500).send('Server Error')
  }
})
module.exports = app
