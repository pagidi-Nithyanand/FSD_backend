const express = require('express')
const RegisterModel = require('../models/UserModel')
const { Password } = require('@mui/icons-material')
const { dbon, dboff } = require('../db')
const app = express()

app.post('/register', async (req, res) => {
  //console.log(req.body)
  try {
    await dbon()
    const { username, email, password } = req.body
    let exist = await RegisterModel.findOne({ email: email })
    //console.log(password, req.body)
    if (exist) {
      return res.status(400).send('User already exists')
    } else {
      let newUser = new RegisterModel({
        username: username,
        hash: password,
        email: email
      })

      await newUser.save()
      return res.status(200).send('Registered Successfully')
    }
  } catch (err) {
    //console.log(err)
    return res.status(500).send('Internal server error')
  } finally {
    dboff()
  }
})

module.exports = app
