const mongoose = require('mongoose')
const videodataSchema = new mongoose.Schema({
  Userid: Number,
  title: String,
  thumbnail: Buffer,
  Timestamp: Date,
  Views: Number,
  data: Buffer,
  upvotes: Number,
  downvotes: Number
})
module.exports = mongoose.model('Videodata', videodataSchema)
