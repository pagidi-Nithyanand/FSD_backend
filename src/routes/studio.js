const express = require('express')
const { dbon } = require('../db')
const router = express.Router()
const Video = require('../models/VideoModel')
const History = require('../models/HistoryModel')
const WatchLater = require('../models/WatchlaterModel')
router.get('/history', async (req, res) => {
  try {
    await dbon()
    const id = req.query.userid
    const hist = await History.find({ Userid: id }, { userid: 0 })
    console.log(hist)
    res.status(200).json({ history: hist })
  } catch (error) {
    res.status(500).json(error)
  }
})
router.post('/history', async (req, res) => {
  try {
    await dbon()
    const id = req.body.videoid
    const details = await Video.find({ _id: id })
    const hist = new History({
      userid: req.body.userid,
      videoid: req.body.videoid,
      title: details.title,
      creatorid: details.userid,
      thumbnail: details.thumbnail
    })
    await hist.save()
    res.status(200).json({ status: true })
  } catch (error) {
    res.status(500).json(error)
  }
})
router.get('/watchlater', async (req, res) => {
  try {
    await dbon()
    const id = req.query.userid
    const later = await WatchLater.find({ Userid: id }, { userid: 0 }).pretty()
    res.status(200).json({ watchlater: later })
  } catch (error) {
    res.status(500).json(error)
  }
})
router.post('/watchlater', async (req, res) => {
  try {
    await dbon()
    const id = req.body.videoid
    const details = await Video.find({ _id: id })
    console.log(details)
    const later = new WatchLater({
      userid: req.body.userid,
      videoid: req.body.videoid,
      title: details.title,
      creatorid: details.userid,
      thumbnail: req.body.videoid
    })
    await later.save()
    res.status(200).json({ status: true })
  } catch (error) {
    res.status(500).json(error)
  }
})
module.exports = router
