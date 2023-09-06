const express = require('express')

const authController = require('../controller/auth-controller')
const noteController = require('../controller/note-controller')

const router = new express.Router()

// Auth
router.post('/register', authController.register)
router.post('/login', authController.login)

// Note
router.get('/note/:slug', noteController.getBySlug)

module.exports = {
	router,
}
