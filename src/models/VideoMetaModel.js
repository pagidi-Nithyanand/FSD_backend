const mongoose = require('mongoose')
const videoMetadataSchema = new mongoose.Schema({
  userid: String,
  videoid: String,
  title: String,
  thumbnail: Buffer,
  description: String,
  timestamp: Date,
  views: Number,
  upvotes: Number,
  downvotes: Number,
  video_tags: [String]
})
videoMetadataSchema.index({ title: 'text', description: 'text' })
module.exports = mongoose.model('VideoMetadata', videoMetadataSchema)
