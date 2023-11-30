const mongoose = require('mongoose')
const HistorySchema = new mongoose.Schema({
  userid: String,
  videoid: String,
  title: String,
  thumbnail: Buffer,
  creatorid: String,
  description: String
})
module.exports = mongoose.model('History', HistorySchema)
