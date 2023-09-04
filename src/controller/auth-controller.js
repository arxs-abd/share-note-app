const authService = require('../services/auth-service')

const register = async (req, res, next) => {
    try {
        const result = await authService.register(req.body)

        return res.status(201).send({
            status : 'success',
            data : result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register
}