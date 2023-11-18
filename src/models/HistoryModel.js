const mongoose = require('mongoose')
const HistorySchema = new mongoose.Schema({
  userid: String,
  videoid: String,
  title: String,
  thumbnail: String,
  creatorid: String
})
module.exports = mongoose.model('History', HistorySchema)
