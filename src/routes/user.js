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
    let name = unique.uniqueNamesGenerator({
      dictionaries: [unique.adjectives, unique.starWars],
      style: 'capital',
      separator: ''
    })
    name = name.concat(Math.floor(Math.random() * 10000) + 100)
    name = name.split(' ').join('')
    const existingUser = await User.findOne({ username: name })
    if (name.length < 32 && name.length > 7 && !existingUser) {
      name = name.replace('-', '')
      try {
        res.json(name)
      } catch (error) {
        res.send(error)
        db.close()
      }
      break
    }
  }
})
router.post('/Signup', upload.single('image'), async (req, res) => {
  // TODO: signup api
  db.once('open', () => {
    console.log('IN signup')
  })
  const { name, email, hash, salt } = req.body
  const existingUser = await User.findOne({ username: name })
  if (!existingUser) {
    try {
      const userd = new User({
        name,
        email,
        profilepic: req.file.buffer,
        hash,
        salt
      })
      const savedUser = await userd.save()
      res.json(savedUser)
    } catch (error) {
      res.send(error)
      db.close()
    }
  } else {
    res.json('Username exists')
  }
})
router.get('/View', async (req, res) => {
  // TODO: signup api
  db.once('open', () => {
    console.log('Connected to MongoDB')
  })
  const name = req.query.username
  const existingUser = await User.findOne({ username: name })
  if (existingUser) {
    try {
      res.json(existingUser)
    } catch (error) {
      res.send(error)
    }
  } else {
    res.json('Username exists')
  }
})
module.exports = router
