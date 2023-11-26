const SocialModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const { dbon, dboff } = require('../db')
const app = express()

// Enable CORS for all routes
app.use(cors())

app.post('/setfbtoken', async (req, res) => {
  try {
    console.log(req.body.data)
    console.log(req.body.data.id, req.body.data.name)

    // Using await with findOneAndUpdate
    const [user, created] = await SocialModel.findOneAndUpdate(
      { hash: req.body.data.id },
      {
        $setOnInsert: {
          username: req.body.data.name,
          email: req.body.data.email
        }
      },
      { upsert: true, new: true }
    )

    console.log(user)

    const exist = await SocialModel.findOne({ username: req.body.data.name })
    console.log(exist)

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
    console.log(req.body)
    console.log(req.body.data.access_token, req.body.data.name)

    // Using await with findOne
    let exist = await SocialModel.findOne({ username: req.body.data.name })
    console.log(exist)

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
