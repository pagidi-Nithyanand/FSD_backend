const express = require('express')
const { dbon } = require('../db')
const router = express.Router()
const Videometa = require('../models/VideoMetaModel')
const cors = require('cors')
router.use(cors())
router.get('/thumbnail', async (req, res) => {
  console.log(res.videoid)
  try {
    await dbon()
    const videoid = req.query.videoid
    const image = await Videometa.findOne({ videoid: videoid })
    if (!image) {
      return res.status(404).json({ error: 'Image not found' })
    }
    res.setHeader('Content-Type', 'image/png') //  For Image
    res.send(image.thumbnail)
  } catch (error) {
    res.status(500).json(error)
  }
})
router.get('/search', async (req, res) => {
  console.log('Search')
  console.log(req.query)
  try {
    await dbon()
    const parse = req.query.text
    const video = await Videometa.find({ $text: { $search: parse } })
    if (!video) {
      return res.status(404).json({ error: 'Video not found' })
    }
    res.send(video)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
router.post('/vote', async (req, res) => {
  try {
    await dbon()
    const voteid = Number(req.body.vote)
    if (voteid === 1) {
      const vote = await Videometa.findOneAndUpdate(
        { videoid: id },
        { $inc: { upvotes: 1 } },
        { new: true }
      )
    } else {
      const vote = await Videometa.findOneAndUpdate(
        { videoid: id },
        { $inc: { downvotes: 1 } },
        { new: true }
      )
    }
    if (vote.length === 0) {
      return res.status(404).json({ error: 'Video not exists' })
    }
    res.send(video)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
module.exports = router
