const express = require('express')

const authController = require('../controller/auth-controller')

const router = new express.Router()

router.post('/register', authController.register)

module.exports = {
    router
}