const express = require('express')
const passport = require('passport')
var SocialModel = require('../models/UserModel')
var axios = require('axios')
var jwt = require('jsonwebtoken')
app = express()
app.post('/setfbtoken', async (req, res) => {
  console.log(req.body.data)
  console.log(req.body.data.id, req.body.data.name)
  await SocialModel.findOrCreate(
    {
      username: req.body.data.name,
      email: req.body.data.email,
      hash: req.body.data.id
    },
    function (err, user) {
      if (err) {
        console.log(err)
      } else {
        console.log(user)
      }
    }
  )
  let exist = await SocialModel.findOne({ username: req.body.data.name })
  console.log(exist)
  let payload = {
    user: {
      id: exist.id
    }
  }
  await jwt.sign(payload, 'jwtsecret', { expiresIn: 3600000 }, (err, token) => {
    if (err) throw err
    return res.json(token)
  })
})
app.post('/setgoogletoken', async (req, res) => {
  console.log(req.body)
  console.log(req.body.data.access_token, req.body.data.name)
  await SocialModel.findOrCreate(
    {
      username: req.body.data.name,
      email: req.body.data.name + '@gmail.com',
      hash: req.body.data.access_token
    },
    function (err, user) {
      if (err) {
        console.log(err)
      } else {
        console.log(user)
      }
    }
  )
  let exist = await SocialModel.findOne({ username: req.body.data.name })
  console.log(exist)
  let payload = {
    user: {
      id: exist.id
    }
  }
  await jwt.sign(payload, 'jwtsecret', { expiresIn: 3600000 }, (err, token) => {
    if (err) throw err
    return res.json(token)
  })
})
module.exports = app
