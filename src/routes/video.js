const express = require('express')
const router = express.Router()
const Video = require('../models/VideoMetaModel')
const db = require('../db')
const multer = require('multer')
const storage = multer.memoryStorage() // Store the file in memory as a Buffer
const upload = multer({ storage })
router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const newVideo = new Video({
      title: req.body.title,
      data: req.file.buffer,
      description: req.body.description,
      creator_id: req.body.creator_id,
      upvotes: 0,
      downvotes: 0,
      thumbnail: req.file.buffer
    })
    await newVideo.save()
    res.status(201).json({ message: 'Video uploaded successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
  db.close()
})
router.get('/view', async (req, res) => {
  // TODO: viewing video
  // try {
  //   const videoId = req.params.creator_id
  //   // Find the video by its unique ID
  //   const video = await Video.findById(videoId)
  //   if (!video) {
  //     return res.status(404).json({ error: 'Video not found' })
  //   }
  //   res.setHeader('Content-Type', 'video/mp4') // Set the appropriate content type
  //   res.send(video.data)
  // } catch (error) {
  //   res.status(500).json(error)
  // }
  // db.close()
})
module.exports = router
