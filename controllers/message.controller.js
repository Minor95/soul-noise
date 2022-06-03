const Messages = require('../models/Message.model')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports.messageController = {
  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params
      const { authorization } = req.headers
      const [type, token] = authorization.split(' ')
      if (type !== 'Bearer') {
        return res.status(400).json({ message: 'не верный тип токена' })
      }

      try {
        const payload = await jwt.verify(token, config.get('SecretKay'))
        const messages = await Messages.findById(id)

        if (messages.user.toString() === payload.id) {
          await messages.remove()
          return res.json('удалено')
        }
        return res.status(401).json({ message: 'нет доступа' })
      } catch {
        return res.status(401).json({ message: 'неверный токен' })
      }
    } catch {
      res.status(404).json({ message: 'неизвестная ошибка' })
    }
  },
  getTodo: async (req, res) => {
    try {
      const data = await Messages.find()
      res.json(data)
    } catch {
      res.status(404).json({ message: 'неизвестная ошибка' })
    }
  },
  addTodo: async (req, res) => {
    try {
      const { text } = req.body

      const messages = await Messages.create({
        user: req.user.id,
        name: req.user.log,
        text,
      })
      return res.json('туду сохранена')
    } catch {
      return res.status(401).json({ message: 'неверный токен' })
    }
  },
}
