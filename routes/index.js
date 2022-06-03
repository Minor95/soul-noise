const { Router } = require('express')
const router = Router()

router.use('/users', require('./user.route'))
router.use('/message', require('./message.route'))
router.use("/posts", require("./posts.route"))
module.exports = router
