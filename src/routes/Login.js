const express = require('express')
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const { dbon } = require('../db')
const app = express.Router()
const cors = require('cors')
app.use(cors())
app.post('/login', async (req, res) => {
  try {
    await dbon()
    // const { username, hash } = req.body
    const exist = await UserModel.findOne({ username: req.body.username })
    if (!exist) {
      await res.send("user doesn't exist")
    } else {
      if (exist.hash === req.body.password) {
        const payload = {
          user: {
            id: exist.id
          }
        }
        await jwt.sign(
          payload,
          'jwtsecret',
          { expiresIn: 3600000 },
          async (err, token) => {
            if (err) throw err
            return await res.json(token)
          }
        )
      } else {
        await res.send('incorrect password')
      }
    }
  } catch (err) {
    await res.send('Server Error')
  }
})
module.exports = app
