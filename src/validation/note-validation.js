const Joi = require('joi')

const addNoteValidation = Joi.object({
	title: Joi.string().max(100).required(),
	content: Joi.string().required(),
})

module.exports = {
	addNoteValidation,
}
