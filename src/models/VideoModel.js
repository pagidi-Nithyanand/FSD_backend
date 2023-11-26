const mongoose = require('mongoose')
const videodataSchema = new mongoose.Schema({
  userid: String,
  data: Buffer,
  url: String
})
module.exports = mongoose.model('Videodata', videodataSchema)
