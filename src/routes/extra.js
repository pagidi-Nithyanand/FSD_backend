const express = require('express')
const { dbon } = require('../db')
const router = express.Router()
const Videometa = require('../models/VideoMetaModel')
router.get('/thumbnail', async (req, res) => {
  try {
    await dbon()
    const videoid = req.query.videoid
    const image = await Videometa.findOne({ videoid })
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
  try {
    await dbon()
    const parse = req.query.text
    Videometa.createIndexes([{ title: 'text' }])
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
    let vote
    const id=req.body.videoid
    const voteid = Number(req.body.vote)
    if (voteid === 1) {
      vote = await Videometa.findOneAndUpdate(
        { videoid: id },
        { $inc: { upvotes: 1 } },
        { new: true }
      )
    } else {
      vote = await Videometa.findOneAndUpdate(
        { videoid: id },
        { $inc: { downvotes: 1 } },
        { new: true }
      )
    }
    if (vote.length === 0) {
      return res.status(404).json({ error: 'Video not exists' })
    }
    res.send(vote)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
module.exports = router
