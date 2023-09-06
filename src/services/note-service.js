const { v4: uuid } = require('uuid')

const { addNoteValidation } = require('../validation/note-validation')
const { validate } = require('../validation/validation')
const { prismaClient } = require('../app/database')
const { ResponseError } = require('../errors/response-error')

const add = async (request, id) => {
	const data = validate(addNoteValidation, request)

	data.slug = uuid().toString()
	data.authorId = id

	return await prismaClient.note_ShareNote.create({
		data,
	})
}

const getBySlug = async (slug) => {
	const data = await prismaClient.note_ShareNote.findFirst({
		where: {
			slug,
		},
		select: {
			id: false,
			title: true,
			content: true,
			authorId: true,
		},
	})

	if (!data) throw new ResponseError(404, 'Note Tidak di temukan')

	return data
}

module.exports = {
	add,
	getBySlug,
}
