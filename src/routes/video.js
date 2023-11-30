const express = require('express')
const cors = require('cors')
const router = express.Router()
const Videodata = require('../models/VideoModel')
const Videometa = require('../models/VideoMetaModel')
const { dbon, dboff } = require('../db')
const multer = require('multer')

router.use(cors())

const storages = multer.memoryStorage() // Store the file in memory as a Buffer
const upload = multer({ storage: storages })
router.post('/upload', upload.any(), async (req, res) => {
  try {
    await dbon()
    if (req.body.videoSource === 'local') {
      newvideo = await new Videodata({
        userid: req.body.data1,
        data: req.files[1].buffer
      })
    } else {
      newvideo = await new Videodata({
        userid: req.body.data1,
        url: req.body.url
      })
    }
    await newvideo.save()
    const temp = await Videodata.findOne({ data: req.files[1].buffer })
    // //console.log(temp)
    const videometa = new Videometa({
      username: req.body.data1,
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
    //console.log('video uploaded successfully')
    res.status(201).json({ message: 'Video uploaded successfully' })
  } catch (error) {
    //console.log(error)
    res.status(500).json(error)
  }
  ;``
})
router.get('/stream', async (req, res) => {
  try {
    await dbon()
    //console.log(req.query.videoId)
    const id = req.query.videoId
    const video = await Videodata.findOne({ _id: id })
    //console.log(video)
    if (!video) {
      return res.status(404).json({ error: 'Video not found' })
    }
    res.setHeader('Content-Type', 'video/mp4') // For Video
    res.send(video.data)
  } catch (error) {
    //console.log(error)
    res.status(500).json(error)
  }
})
router.get('/meta', async (req, res) => {
  console.log('meta called')
  console.log(req.query)
  try {
    await dbon()
    const videoId = req.query.videoId
    console.log(videoId)
    const videometa = await Videometa.findOne({ videoid: videoId })
    console.log(videometa.description)
    if (!videometa) {
      return res.status(404).json({ error: 'Video meta not found' })
    }
    res.status(500).json(videometa.description)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
router.get('/allmeta', async (req, res) => {
  //console.log(2)
  try {
    //console.log('MetaData')
    await dbon()

    // Increase the timeout for the MongoDB operation to 30 seconds
    const videometa = await Videometa.find({})
    //console.log(videometa[0].thumbnail)

    if (videometa.length === 0) {
      return res.status(404).json({ error: 'Video meta not found' })
    }
    res.status(200).json(videometa)
  } catch (error) {
    //console.log(error)
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
//     //console.log(error1)
//     res.status(500).json({ error: 'Internal Server Error', details: error1 })
//   } finally {
//     dboff()
//   }
// })
module.exports = router
