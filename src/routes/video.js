const express = require('express')
const router = express.Router()
const Video = require('../models/VideoMetaModel')
const db = require('../db')
const multer = require('multer')
// const bodyParser = require('body-parser')
const storages = multer.memoryStorage() // Store the file in memory as a Buffer
const upload = multer({ storage: storages })
router.post('/upload', upload.any(), async (req, res) => {
  // TODO: need clarity(upload api complete)
  db.once('open', () => {
    console.log('In Upload')
  })
  try {
    const newVideo = new Video({
      title: req.body.title,
      data: req.files[0].buffer,
      description: req.body.description,
      creator_id: req.body.creator_id,
      upvotes: 0,
      downvotes: 0,
      thumbnail: req.files[1].buffer
    })
    await newVideo.save()
    res.status(201).json({ message: 'Video uploaded successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
    db.close()
  }
})
router.get('/view', async (req, res) => {
  // TODO: need clarity (view api complete)
  db.once('open', () => {
    console.log('In View')
  })
  try {
    const videoId = req.query.creator_id
    const video = await Video.findOne({ creator_id: videoId })
    if (!video) {
      return res.status(404).json({ error: 'Video not found' })
    }
    // res.setHeader('Content-Type', 'video/mp4') // For Video
    // res.send(video.data)
    res.setHeader('Content-Type', 'image/png') // For Image
    res.send(video.thumbnail)
  } catch (error) {
    res.status(500).json(error)
    db.close()
  }
})
module.exports = router
