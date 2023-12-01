const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
  userid: String,
  videoid: String,
  title: String,
  comment_title: String,
  comment: String,
  Upvotes: Number,
  Downvotes: Number,
  Timestamp: Date,
  username: String
})
module.exports = mongoose.model('Comments', commentSchema)
