const express = require('express')
const { dbon, dboff } = require('../db')
const unique = require('unique-names-generator')
const User = require('../models/UserModel')
const multer = require('multer')
const cors = require('cors')
const storages = multer.memoryStorage() // Store the file in memory as a Buffer
const upload = multer({ storage: storages })
const router = express.Router()
router.use(cors())
router.get('/getGeneratedName', async (req, res) => {
  const names = [
    unique.adjectives,
    unique.animals,
    unique.colors,
    unique.languages,
    unique.names,
    unique.starWars
  ]
  const limit = 100
  console.log('Good')
  try {
    await dbon()
    let responseSent = false

    for (let i = 2; i < names.length; i++) {
      if (responseSent) break

      for (let count = 0; count < limit; count++) {
        let name = unique.uniqueNamesGenerator({
          dictionaries: names,
          style: 'capital',
          separator: '',
          length: i
        })

        name = name.concat(Math.floor(Math.random() * 10000) + 100)
        const existingUser = await User.findOne({ username: name })

        if (name.length < 32 && name.length > 7 && !existingUser) {
          console.log(name)
          res.json({ username: name })
          responseSent = true
          break
        }
      }
    }
  } catch (error) {
    console.log(error)
    res.json(error)
  }
})

// router.post('/Signup', upload.single('image'), async (req, res) => {
//   // TODO: signup api
//   await dbon()
//   const { name, email, hash, salt } = req.body
//   const existingUser = await User.findOne({ username: name })
//   if (!existingUser) {
//     try {
//       const userd = new User({
//         name,
//         email,
//         profilepic: req.file.buffer,
//         hash,
//         salt
//       })
//       const savedUser = await userd.save()
//       res.json(savedUser)
//       dboff()
//     } catch (error) {
//       res.send(error)
//       dboff()
//     }
//   } else {
//     res.json('Username exists')
//   }
// })
// router.get('/View', async (req, res) => {
//   // TODO: signup api
//   const name = req.query.username
//   const existingUser = await User.findOne({ username: name })
//   if (existingUser) {
//     try {
//       res.json(existingUser)
//     } catch (error) {
//       res.send(error)
//     }
//   } else {
//     res.json('Username exists')
//   }
// })
module.exports = router
