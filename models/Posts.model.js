const mongoose = require('mongoose')

const postsSchema = mongoose.Schema({
  name: {type: String, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  text: { type: String },
  img: { type: String },
  video: { type: String },
})

const Post = mongoose.model("Post", postsSchema)
module.exports = Post
