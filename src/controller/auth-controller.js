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

const logout = async (req, res, next) => {
	try {
		const id = req.user.id
		await authService.logout(id)

		return res.send({
			status: 'success',
			message: 'Logout Berhasil',
		})
	} catch (error) {
		next(error)
	}
}

module.exports = {
	register,
	login,
	logout,
}
