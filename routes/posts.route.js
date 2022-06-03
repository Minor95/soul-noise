const { Router } = require("express")
const { postsController } = require("../controllers/posts.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const router = Router()

router.post("", authMiddleware, postsController.addPost)
router.get("",  postsController.getPost)
module.exports = router