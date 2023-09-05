const noteService = require('../services/note-service')

const add = async (req, res, next) => {
	try {
		const id = req.user.id
		const result = await noteService.add(req.body, id)

		return res.status(201).send({
			status: 'success',
			data: result,
		})
	} catch (error) {
		next(error)
	}
}

module.exports = {
	add,
}
