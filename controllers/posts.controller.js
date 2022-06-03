const Post = require('../models/Posts.model')

module.exports.postsController = {
  addPost: async (req, res) => {
    try {
      const { text } = req.body
      await Post.create({
        name: req.user.log,
        user: req.user.id,
        text,
      })
      res.json('добавлно')
    } catch (e) {
      res.json(e)
    }
  },
  getPost: async (req, res) => {
    try {
      const data = await Post.find()
      res.json(data)
    } catch (e) {
      res.json('ошибка')
    }
  },
}
