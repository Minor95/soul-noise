const mongoose = require('mongoose')

const messagesSchema = mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
})
const Messages = mongoose.model('Message', messagesSchema)

module.exports = Messages
