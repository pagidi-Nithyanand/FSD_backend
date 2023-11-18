const mongoose = require('mongoose')
const videodataSchema = new mongoose.Schema({
  userid: String,
  data: Buffer
})
module.exports = mongoose.model('Videodata', videodataSchema)
