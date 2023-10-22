const mongoose = require('mongoose')
const videoMetadataSchema = new mongoose.Schema({
  // TODO: Need to change schema later
  title: String,
  data: Buffer,
  description: String,
  creator_id: Number,
  upvotes: Number,
  downvotes: Number,
  thumbnail: Buffer
})
module.exports = mongoose.model('VideoMetadata', videoMetadataSchema)
