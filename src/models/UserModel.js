const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  profilepic: { type: Buffer },
  hash: { type: String, required: true },
  salt: { type: String, required: true }
})
const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel
