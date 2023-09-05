const express = require('express')

const authController = require('../controller/auth-controller')
const noteController = require('../controller/note-controller')
const { authenticate } = require('../middleware/auth-middleware')

const router = new express.Router()

router.use(authenticate)
// Auth
router.post('/logout', authController.logout)

// Note
router.post('/note', noteController.add)

module.exports = {
	router,
}
