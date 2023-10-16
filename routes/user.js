const express = require('express')
const unique = require('unique-names-generator')
const router = express.Router()
router.post('/getGeneratedName', async (req, res) => {
  const username = unique.uniqueNamesGenerator({
    dictionaries: [unique.adjectives,unique.starWars],
    style: 'capital',
    separator: ' '
  })
  try {
    res.json(username)
    console.log(username)
  } catch (error) {
    // TODO: log error to log file
  }
})
module.exports = router; 