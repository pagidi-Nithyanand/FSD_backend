const middleware = require('./middleware')
const UserModel = require('../models/UserModel')
const express = require('express')
const app = express()
const { dbon } = require('../db')
app.get('/Profile', middleware, async (req, res) => {
  try {
    await dbon()
    const exist = await UserModel.findById(req.user.id)
    if (!exist) {
      return await res.status(400).send('User not found')
    }
    await res.json(exist)
  } catch (err) {
    return await res.status(500).send('Server Error')
  }
})
app.get('/checkuser', async (req, res) => {
  try {
    await dbon()
    const exist = await UserModel.findOne({ username: req.query.username })
    if (exist == null) {
      res.send(true)
    } else {
      res.send(false)
    }
  } catch (err) {
    res.send(false)
  }
})
module.exports = app
