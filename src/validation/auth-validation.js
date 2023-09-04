const Joi = require('joi')

const addUserValidation = Joi.object({
	username: Joi.string().max(100).required(),
	password: Joi.string().max(100).required(),
})

module.exports = {
	addUserValidation,
}
