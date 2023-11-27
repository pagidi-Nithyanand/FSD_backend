const express = require('express')
const Comments = require('../models/CommentModel')
const { dbon, dboff } = require('../db')
const router = express.Router()
router.post('/post', async (req, res) => {
  try {
    await dbon()
    const existingComment = await Comments.findOne({
      userid: req.body.userid,
      videoid: req.body.videoid
    })
    if (!existingComment) {
      const newcomment = new Comments({
        userid: req.body.userid,
        videoid: req.body.videoid,
        commentid: req.body.userid + req.body.videoid,
        comment_title: req.body.comment_title,
        comment: req.body.comment,
        Upvotes: 0,
        Downvotes: 0,
        Timestamp: new Date().toUTCString()
      })
      await newcomment.save()
      res.status(201).json({ boolean: true })
    } else {
      res.status(201).json({ boolean: false })
    }
  } catch (error) {
    res.status(500).json(error)
  }
})
router.get('/view', async (req, res) => {
  try {
    await dbon()
    const existingComment = await Comments.find({ videoid: req.query.videoid })
    if (existingComment.length === 0) {
      res.status(201).json({ comments: 'No Comments' })
    } else {
      res.status(201).json({ comments: existingComment })
    }
  } catch (error) {
    res.status(500).json(error)
  }
})
module.exports = router
