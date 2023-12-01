const SocialModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const { dbon } = require('../db')
const app = express()

// Enable CORS for all routes
const corsOptions = {
  origin: 'http://yourfrontenddomain.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
app.use(cors())

app.post('/setfbtoken', async (req, res) => {
  try {
    await dbon()
    // Using await with findOneAndUpdate
    let exist = await SocialModel.findOne({ username: req.body.data.name })
    if (!exist) {
      // If the user doesn't exist, create a new one
      exist = await SocialModel.create({
        username: req.body.data.name,
        email: `${req.body.data.name}@gmail.com`,
        hash: req.body.data.access_token
      })
    }
    const payload = {
      user: {
        id: exist.id
      }
    }
    // Using await with jwt.sign
    const token = await jwt.sign(payload, 'jwtsecret', { expiresIn: 3600000 })
    res.json(token)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
app.post('/setgoogletoken', async (req, res) => {
  try {
    await dbon()
    // Using await with findOne
    let exist = await SocialModel.findOne({ username: req.body.data.name })
    if (!exist) {
      // If the user doesn't exist, create a new one
      exist = await SocialModel.create({
        username: req.body.data.name,
        email: `${req.body.data.name}@gmail.com`,
        hash: req.body.data.access_token
      })
    }
    const payload = {
      user: {
        id: exist.id
      }
    }
    // Using await with jwt.sign
    const token = await jwt.sign(payload, 'jwtsecret', { expiresIn: 3600000 })
    res.json(token)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = app
