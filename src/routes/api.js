const express = require('express')

const authController = require('../controller/auth-controller')
const { authenticate } = require('../middleware/auth-middleware')

const router = new express.Router()

router.use(authenticate)
router.post('/logout', authController.logout)

module.exports = {
	router,
}
