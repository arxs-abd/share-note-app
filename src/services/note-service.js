const { v4: uuid } = require('uuid')

const { addNoteValidation } = require('../validation/note-validation')
const { validate } = require('../validation/validation')
const { prismaClient } = require('../app/database')

const add = async (request, id) => {
	const data = validate(addNoteValidation, request)

	data.slug = uuid().toString()
	data.authorId = id

	return await prismaClient.note_ShareNote.create({
		data,
	})
}

module.exports = {
	add,
}
