const express = require('express')
const db = require('../db')
const unique = require('unique-names-generator')
const User = require('../models/UserModel')
const multer = require('multer')
const storages = multer.memoryStorage() // Store the file in memory as a Buffer
const upload = multer({ storage: storages })
const router = express.Router()
router.post('/getGeneratedName', async (req, res) => {
  db.once('open', () => {
    console.log('IN signup')
  })
  while (true) {
    let username = unique.uniqueNamesGenerator({
      dictionaries: [unique.adjectives, unique.starWars],
      style: 'capital',
      separator: ''
    })
    username = username.concat(Math.floor(Math.random() * 10000) + 100)
    username = username.split(' ').join('')
    const existingUser = await User.findOne({ username })
    if (username.length < 32 && username.length > 7 && !existingUser) {
      username = username.replace('-', '')
      try {
        res.json(username)
      } catch (error) {
        res.send(error)
      }
      break
    }
  }
  db.close()
})
router.post('/Signup', upload.single('image'), async (req, res) => {
  // TODO: signup api
  db.once('open', () => {
    console.log('IN signup')
  })
  const { username, email, hash, salt } = req.body
  const existingUser = await User.findOne({ username })
  if (!existingUser) {
    try {
      const userd = new User({
        username,
        email,
        profilepic: req.file.buffer,
        hash,
        salt
      })
      const savedUser = await userd.save()
      res.json(savedUser)
    } catch (error) {
      res.send(error)
    }
  } else {
    res.json('Username exists')
  }
})
router.post('/View', async (req, res) => {
  // TODO: signup api
  db.once('open', () => {
    console.log('Connected to MongoDB')
  })
  const { username, email, hash, salt } = req.body
  const existingUser = await User.findOne({ username })
  if (!existingUser) {
    try {
      const userd = new User({
        username,
        email,
        profilepic: req.file.buffer,
        hash,
        salt
      })
      const savedUser = await userd.save()
      res.json(savedUser)
    } catch (error) {
      res.send(error)
    }
  } else {
    res.json('Username exists')
  }
})
module.exports = router
