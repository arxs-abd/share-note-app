const { prismaClient } = require('../app/database')

const authenticate = async (req, res, next) => {
	const token = req.get('Authorization')
	if (!token)
		return res.status(401).send({
			status: 'fail',
			msg: 'Token tidak ditemukan',
		})

	// Find User by Token
	const user = await prismaClient.user_ShareNote.findFirst({
		where: {
			token,
		},
	})

	if (!user)
		return res.status(401).send({
			status: 'fail',
			msg: 'Token tidak valid',
		})

	req.user = user
	next()
}

module.exports = {
	authenticate,
}
