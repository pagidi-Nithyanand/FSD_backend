const express = require('express')
const Comments = require('../models/CommentModel')
const { dbon, dboff } = require('../db')
const router = express.Router()
const cors = require('cors')
const profile = require('../models/UserModel')
router.use(cors())

router.post('/', async (req, res) => {
  console.log('Hi iam comments')
  console.log(req.body)
  try {
    if (req.body.title === null) {
      return
    }
    const existingComment = await Comments.findOne({
      userid: req.body.userid,
      videoid: req.body.videoid
    })
    const user = await profile.findOne({ _id: req.body.userid })
    console.log(user)
    console.log(existingComment)
    if (!existingComment) {
      const newcomment = new Comments({
        userid: req.body.userid,
        title: req.body.title,
        username: user.username,
        videoid: req.body.videoid,
        commentid: req.body.userid + req.body.videoid,
        comment_title: req.body.comment_title,
        comment: req.body.comment,
        Upvotes: 0,
        Downvotes: 0,
        Timestamp: new Date().toUTCString()
      })
      console.log(newcomment)
      await newcomment.save()
      console.log('done')
      res.status(201).json({ boolean: true })
    } else {
      res.status(201).json({ boolean: false })
    }
  } catch (error) {
    res.status(500).json(error)
  }
})
router.get('/', async (req, res) => {
  console.log('Reading Comments')
  console.log(req.query)
  try {
    await dbon()
    const existingComment = await Comments.find({ videoid: req.query.videoid })
    console.log(existingComment)
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
