const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const authenticate = (req, res, next) => {
	const bearerToken = req.headers?.authorization
	const token = bearerToken?.split(' ')[1] || req.cookies.authorization
	if (!token)
		return res.status(401).send({
			status: 'fail',
			msg: 'Token Tidak ditemukan',
		})
	jwt.verify(token, config.access_token, (err, result) => {
		if (err)
			return res.status(403).send({
				status: 'fail',
				msg: 'Token Tidak Valid',
			})
		next()
	})
}

module.exports = {
	authenticate,
}
