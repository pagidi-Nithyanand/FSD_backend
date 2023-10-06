const express = require('express')
const unique = require('unique-username-generator')
const router = express.Router()
router.post('/getGeneratedName', async (res) => {
  const username = unique.generateUsername()
  try {
    res.json(username)
    console.log(username)
  } catch (error) {
    // TODO: log error to log file
  }
})
module.exports = router
