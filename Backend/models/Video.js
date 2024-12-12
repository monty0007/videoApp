// models/Video.js
const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to user
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Video', VideoSchema)
