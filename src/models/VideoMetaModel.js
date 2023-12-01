const mongoose = require('mongoose')
const videoMetadataSchema = new mongoose.Schema({
  username: String,
  videoid: String,
  title: String,
  thumbnail: Buffer,
  description: String,
  timestamp: Date,
  views: Number,
  upvotes: Number,
  downvotes: Number,
  video_tags: [String],
  url: String,
  type: String
})
videoMetadataSchema.index({ title: 'text', description: 'text' })
module.exports = mongoose.model('VideoMetadata', videoMetadataSchema)
