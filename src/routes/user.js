const express = require('express')
const unique = require('unique-names-generator')
const router = express.Router()
router.post('/getGeneratedName', async (req, res) => {
  let username = unique.uniqueNamesGenerator({
    dictionaries: [unique.adjectives, unique.starWars],
    style: 'capital',
    separator: ''
  })
  username = username.concat(Math.floor(Math.random() * 100000) + 1000)
  username = username.split(' ').join('')
  try {
    res.json(username)
  } catch (error) {
    res.send(error)
  }
})
module.exports = router
