const express = require('express')
const router = express.Router()
const Video = require('../models/VideoModel')
const { dbon, dboff } = require('../db')
const multer = require('multer')
// const bodyParser = require('body-parser')
const storages = multer.memoryStorage() // Store the file in memory as a Buffer
const upload = multer({ storage: storages })
router.post('/upload', upload.any(), async (req, res) => {
  try {
    await dbon()
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
    dboff()
  } catch (error) {
    res.status(500).json(error)
    dboff()
  }
})
router.get('/view', async (req, res) => {
  try {
    await dbon()
    const videoId = req.query.creator_id
    const video = await Video.findOne({ creator_id: videoId })
    if (!video) {
      return res.status(404).json({ error: 'Video not found' })
    }
    res.setHeader('Content-Type', 'video/mp4') // For Video
    res.send(video.data)
    // res.setHeader('Content-Type', 'image/png')//  For Image
    // res.send(video.thumbnail)
  } catch (error) {
    res.status(500).json(error)
  } finally {
    dboff()
  }
})
module.exports = router
