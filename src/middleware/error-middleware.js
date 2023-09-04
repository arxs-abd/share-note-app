const { ValidationError } = require('joi')
const { ResponseError } = require('../errors/response-error')

const errorMiddleware = async (err, req, res, next) => {
	if (!err) return next()

	if (err instanceof ResponseError) {
		return res.status(err.status).send({
			status: 'fail',
			message: err.message,
		})
	} else if (err instanceof ValidationError) {
		return res.status(400).send({
			status: 'fail',
			message: err.message,
		})
	} else {
		console.log('Error 500 : ' + err.message)
		return res.status(500).send({
			status: 'fail',
			message: err.message,
		})
	}
}

module.exports = { errorMiddleware }
