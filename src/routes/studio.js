const express = require('express')
const { dbon } = require('../db')
const cors = require('cors')
const Video = require('../models/VideoMetaModel')
const History = require('../models/HistoryModel')
const WatchLater = require('../models/WatchlaterModel')
const router = express.Router()
router.use(cors())
router.get('/history', async (req, res) => {
  try {
    await dbon() // Assuming this is a function that connects to the database
    const id = req.body.userid
    const hist = await History.find({ Userid: id })
    const q = []

    for (let i = 0; i < hist.length; i++) {
      const s = {
        title: hist[i].title,
        user: hist[i].userid,
        description: hist[i].description,
        thumbnail: hist[i].thumbnail
      }
      q.push(s)
    }
    res.send(q)
  } catch (error) {
    res.status(500).json(error)
  }
})
router.post('/history', async (req, res) => {
  try {
    await dbon()
    const id = req.body.videoid
    const details = await Video.findOne({ videoid: id })
    const hist = new History({
      userid: req.body.userid,
      videoid: req.body.videoid,
      title: details.title,
      creatorid: details.userid,
      thumbnail: details.thumbnail,
      description: details.description
    })
    await hist.save()
    res.status(200).json({ status: true })
  } catch (error) {
    res.status(500).json(error)
  }
})
router.get('/watchlater', async (req, res) => {
  try {
    await dbon() // Assuming this is a function that connects to the database
    const id = req.body.userid
    const hist = await WatchLater.find({ Userid: id })
    const q = []

    for (let i = 0; i < hist.length; i++) {
      const s = {
        title: hist[i].title,
        user: hist[i].userid,
        description: hist[i].description,
        thumbnail: hist[i].thumbnail
      }
      q.push(s)
    }
    res.send(q)
  } catch (error) {
    res.status(500).json(error)
  }
})
router.post('/watchlater', async (req, res) => {
  try {
    await dbon()
    const id = req.body.videoid
    const details = await Video.findOne({ videoid: id })
    const hist = new WatchLater({
      userid: req.body.userid,
      videoid: req.body.videoid,
      title: details.title,
      creatorid: details.userid,
      thumbnail: details.thumbnail,
      description: details.description
    })
    await hist.save()
    res.status(200).json({ status: true })
  } catch (error) {
    res.status(500).json(error)
  }
})
module.exports = router
