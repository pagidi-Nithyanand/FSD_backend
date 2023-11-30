const express = require('express')
const { dbon, dboff } = require('../db')
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
  } finally {
    dboff()
  }
})
router.get('/search', async (req, res) => {
  console.log('Search')
  console.log(req.query)
  try {
    await dbon()
    const parse = req.query.text
    Videometa.createIndexes([{ title: 'text' }])
    const video = await Videometa.find({ $text: { $search: parse } })
    console.log(video)
    // console.log(video)
    if (!video) {
      return res.status(404).json({ error: 'Video not found' })
    }
    res.send(video)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
module.exports = router
