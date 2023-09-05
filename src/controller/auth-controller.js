const authService = require('../services/auth-service')

const register = async (req, res, next) => {
	try {
		const result = await authService.register(req.body)

		return res.status(201).send({
			status: 'success',
			data: result,
		})
	} catch (error) {
		next(error)
	}
}

const login = async (req, res, next) => {
	try {
		const result = await authService.login(req.body)

		return res.send({
			status: 'success',
			data: {
				token: result.token,
			},
		})
	} catch (error) {
		next(error)
	}
}

module.exports = {
	register,
	login,
}
