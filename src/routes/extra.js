const express = require('express')
const { dbon, dboff } = require('../db')
const router = express.Router()
const Video = require('../models/VideoModel')
router.get('/thumbnail', async (req, res) => {
  try {
    await dbon()
    const videoid = req.query.videoid
    const image = await Video.findOne({ _id: videoid }, { thumbnail: 1 })
    if (!image) {
      return res.status(404).json({ error: 'Image not found' })
    }
    res.setHeader('Content-Type', 'image/png') //  For Image
    res.send(image)
  } catch (error) {
    res.status(500).json(error)
  } finally {
    dboff()
  }
})
module.exports = router
