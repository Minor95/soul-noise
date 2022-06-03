const { Router } = require('express')
const { messageController } = require('../controllers/message.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.get('', messageController.getTodo)
router.delete('/:id', messageController.deleteTodo)
router.post('', authMiddleware, messageController.addTodo)

module.exports = router
