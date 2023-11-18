const mongoose = require('mongoose')
const WatchLater = new mongoose.Schema({
  userid: String,
  videoid: String,
  title: String,
  thumbnail: String,
  creatorid: String
})
module.exports = mongoose.model('Watchlater', WatchLater)
