const express = require('express')
const db = require('../db')
const bodyParser = require('body-parser')
const unique = require('unique-names-generator')
// const User = require('../models/UserModel')
const router = express.Router()
router.post('/getGeneratedName', async (req, res) => {
  while (true) {
    let username = unique.uniqueNamesGenerator({
      dictionaries: [unique.adjectives, unique.starWars],
      style: 'capital',
      separator: ''
    })
    username = username.concat(Math.floor(Math.random() * 10000) + 100)
    username = username.split(' ').join('')
    if (username.length < 32 && username.length > 7) {
      username = username.replace('-', '')
      try {
        res.json(username)
      } catch (error) {
        res.send(error)
      }
      break
    }
  }
})
router.post('/Signup', bodyParser.json(), async (req, res) => {
  // TODO: signup api
  // const { username, email, profile_pic, hash, salt } = req.body
  // const existingUser = await User.findOne({ username })
  // if (!existingUser) {
  //   try {
  //     const userd = new User({ username, email, profile_pic, hash, salt })
  //     const savedUser = await userd.save()
  //     res.json(savedUser)
  //   } catch (error) {
  //     res.send(error)
  //   }
  // } else {
  //   res.json('Username exists')
  // }
  db.close()
})
module.exports = router
