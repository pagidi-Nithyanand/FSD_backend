const middleware = require('./middleware')
const UserModel = require('../models/UserModel')
const express = require('express')
const app = express()
const cors = require('cors')
const { dbon, dboff } = require('../db')
app.get('/Profile', middleware, async (req, res) => {
  try {
    //console.log('2')
    await dbon()
    //console.log('profile')
    let exist = await UserModel.findById(req.user.id)
    if (!exist) {
      return await res.status(400).send('User not found')
    }
    //console.log('exist')
    //console.log(exist)
    await res.json(exist)
  } catch (err) {
    //console.log(err)
    return await res.status(500).send('Server Error')
  }
})
app.get('/checkuser', async (req, res) => {
  console.log('Iam called 2')
  console.log(req.body.query)
  try {
    await dbon()
    console.log(req.query)
    let exist = await UserModel.findOne({ username: req.query.username })
    console.log(exist)
    if (exist == null) {
      res.send(true)
    } else {
      res.send(false)
    }
  } catch (err) {
    console.log(err)
    res.send(false)
  }
})
module.exports = app
