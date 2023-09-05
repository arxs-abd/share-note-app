const express = require('express')

const authController = require('../controller/auth-controller')

const router = new express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = {
	router,
}
