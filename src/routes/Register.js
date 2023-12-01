const express = require('express')
const RegisterModel = require('../models/UserModel')
const { dbon } = require('../db')
const app = express()
app.post('/register', async (req, res) => {
  try {
    await dbon()
    const { username, email, password } = req.body
    const exist = await RegisterModel.findOne({ email })
    if (exist) {
      return res.status(400).send('User already exists')
    } else {
      const newUser = new RegisterModel({
        username,
        hash: password,
        email
      })
      await newUser.save()
      return res.status(200).send('Registered Successfully')
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal server error')
  }
})
module.exports = app
