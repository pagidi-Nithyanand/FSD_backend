const express = require('express')
const cors = require('cors')
const router = express.Router()
const Videodata = require('../models/VideoModel')
const Videometa = require('../models/VideoMetaModel')
const { dbon } = require('../db')
const multer = require('multer')
// const { GridFSBucket } = require('mongodb')
// const { default: mongoose } = require('mongoose')
router.use(cors())
// const bodyParser = require('body-parser')
const storages = multer.memoryStorage() // Store the file in memory as a Buffer
const upload = multer({ storage: storages })
router.post('/upload', upload.any(), async (req, res) => {
  try {
    await dbon()
    let newvideo;
    if (req.body.videoSource === 'local') {
      newvideo = await new Videodata({
        userid: req.body.data1,
        data: req.files[1].buffer
      })
    } else {
      newvideo = await new Videodata({
        userid: req.body.data._id,
        url: req.body.url
      })
    }
    await newvideo.save()
    const temp = await Videodata.findOne({ data: req.files[0].buffer })
    const videometa = new Videometa({
      userid: req.body.data1,
      videoid: temp._id,
      title: req.body.title,
      description: req.body.description,
      thumbnail: req.files[0].buffer,
      video_tags: req.body.video_tags,
      timestamp: new Date(),
      views: 0,
      upvotes: 0,
      downvotes: 0,
      type: req.body.videoSource
    })
    await videometa.save()
    res.status(201).json({ message: 'Video uploaded successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
router.get('/stream', async (req, res) => {
  try {
    await dbon()
    const id = req.query.id
    const video = await Videodata.findOne({ _id: id })
    const videodata = video.data | video.url
    if (!video) {
      return res.status(404).json({ error: 'Video not found' })
    }
    res.setHeader('Content-Type', 'video/mp4') // For Video
    res.send(videodata)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
router.get('/meta', async (req, res) => {
  try {
    await dbon()
    const videoId = req.query.videoid
    const videometa = await Videometa.findOne({ _id: videoId })
    if (!videometa) {
      return res.status(404).json({ error: 'Video meta not found' })
    }
    res.status(500).json(videometa)
  } catch (error) {
    res.status(500).json(error)
  }
})
router.get('/allmeta', async (req, res) => {
  // console.log(2)
  try {
    await dbon()
    // Increase the timeout for the MongoDB operation to 30 seconds
    const videometa = await Videometa.find({}).maxTimeMS(30000)
    if (videometa.length === 0) {
      return res.status(404).json({ error: 'Video meta not found' })
    }
    res.status(200).json(videometa)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
// router.get('/gfs', async (req, res) => {
//   try {
//     const db = await dbon()
//     const bucket = new GridFSBucket(db)
//     const title1 = req.query.title
//     // Find the file using GridFS
//     const videoStream = bucket.openDownloadStream({ title: title1 })
//     videoStream.on('data', (chunk) => {
//       res.write(chunk)
//     })
//     videoStream.on('end', () => {
//       res.end()
//     })
//     videoStream.on('error', (error) => {
//       res.status(500).json({ error: 'Error streaming video', details: error })
//     })
//   } catch (error1) {
//     console.log(error1)
//     res.status(500).json({ error: 'Internal Server Error', details: error1 })
//   } finally {
//     dboff()
//   }
// })
module.exports = router
