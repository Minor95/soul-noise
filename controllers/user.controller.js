const User = require('../models/Users.model')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')

module.exports.userController = {
  registerUser: async (req, res) => {
    try {
      const { login, password } = req.body
      const candidate = await User.findOne({ login })
      if (candidate) {
        return res
          .status(400)
          .json({ error: 'Такой пользователь уже существует' })
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: 'пароль не может быть меньше 6 символов' })
      }

      const hash = await bcrypt.hash(password, config.get('bcrypt'))
      await User.create({ login: login, password: hash })

      res.status(201).json({ message: 'Регестрация прошла успешно' })
    } catch (e) {
      res.status(404).json({ error: 'неизвестная ошибка', e })
    }
  },

  loginUser: async (req, res) => {
    try {
      const { login, password } = req.body
      const candidate = await User.findOne({ login })
      if (!candidate) {
        return res.status(401).json({ error: 'пользователь ненайден' })
      }

      const valid = await bcrypt.compare(password, candidate.password)

      if (!valid) {
        return res.status(401).json({ error: 'неверный пароль' })
      }

      const payload = {
        id: candidate._id,
        log: candidate.login,
      }
      const token = await jwt.sign(payload, config.get('SecretKay'), {
        expiresIn: '24h',
      })
      return res.json({ token })
      // return res.json('вы авторизовались')
    } catch {
      res.status(404).json({ error: 'неизвестная ошибка' })
    }
  }
}