const express = require ("express")
const authController = require("../controllers/auth.controller")
const router = express.Router()
const prod =[]

router.post("/register" ,authController.registerUser)
router.post("/login",authController.loginUser)


module.exports = router