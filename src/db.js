const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_URL = process.env.MONGO_URL
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
module.exports = db
