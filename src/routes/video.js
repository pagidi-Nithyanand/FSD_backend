const express = require('express')
const router = express.Router()
const Video = require('../models/VideoModel')
const { dbon, dboff } = require('../db')
const multer = require('multer')
const { GridFSBucket } = require('mongodb')
// const bodyParser = require('body-parser')
const storages = multer.memoryStorage() // Store the file in memory as a Buffer
const upload = multer({ storage: storages })
router.post('/upload', upload.any(), async (req, res) => {
  try {
    await dbon()
    const newVideo = new Video({
      userid: req.body.userid,
      title: req.body.title,
      data: req.files[0].buffer,
      description: req.body.description,
      thumbnail: req.files[1].buffer,
      video_tags: req.body.video_tags,
      timestamp: new Date(),
      views: 0,
      upvotes: 0,
      downvotes: 0
    })
    await newVideo.save()
    res.status(201).json({ message: 'Video uploaded successfully' })
  } catch (error) {
    res.status(500).json(error)
  } finally {
    dboff()
  }
})
router.get('/stream', async (req, res) => {
  try {
    await dbon()
    const title1 = req.query.title
    const video = await Video.findOne({ title: title1 })
    console.log(video)
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
router.get('/meta', async (req, res) => {
  try {
    await dbon()
    const videoId = req.query.videoid
    const videometa = await Video.findOne(
      { _id: videoId },
      { data: 0 }
    ).pretty()
    if (!videometa) {
      return res.status(404).json({ error: 'Video meta not found' })
    }
    res.status(500).json(videometa)
  } catch (error) {
    res.status(500).json(error)
  } finally {
    dboff()
  }
})
router.get('/gfs', async (req, res) => {
  try {
    const db = await dbon()
    const bucket = new GridFSBucket(db)
    const title1 = req.query.title
    // Find the file using GridFS
    const videoStream = bucket.openDownloadStream({ title: title1 })
    videoStream.on('data', (chunk) => {
      res.write(chunk)
    })
    videoStream.on('end', () => {
      res.end()
    })
    videoStream.on('error', (error) => {
      res.status(500).json({ error: 'Error streaming video', details: error })
    })
  } catch (error1) {
    console.log(error1)
    res.status(500).json({ error: 'Internal Server Error', details: error1 })
  } finally {
    dboff()
  }
})
module.exports = router
