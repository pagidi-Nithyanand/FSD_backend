const mongoose = require('mongoose')
const videoMetadataSchema = new mongoose.Schema({
  userid: String,
  videoid: String,
  title: String,
  thumbnail: Buffer,
  timestamp: Date,
  views: Number,
  upvotes: Number,
  downvotes: Number
})
module.exports = mongoose.model('VideoMetadata', videoMetadataSchema)
