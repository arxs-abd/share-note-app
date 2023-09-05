const { v4: uuid } = require('uuid')

const { prismaClient } = require('../app/database')
const { ResponseError } = require('../errors/response-error')
const { addUserValidation } = require('../validation/auth-validation')
const { validate } = require('../validation/validation')

const register = async (request) => {
	const data = validate(addUserValidation, request)

	// Find User with username
	const user = await prismaClient.user_ShareNote.count({
		where: {
			username: data.username,
		},
	})

	// If username existed, return error response
	if (user) throw new ResponseError(409, 'Username telah digunakan')

	// Insert Data to Tabel
	return await prismaClient.user_ShareNote.create({
		data,
	})
}

const login = async (request) => {
	const data = validate(addUserValidation, request)

	const user = await prismaClient.user_ShareNote.findFirst({
		where: {
			username: data.username,
		},
	})

	// If username not found, return error response
	if (!user) throw new ResponseError(404, 'Username tidak ditemukan')

	// If password is wrong, return error response
	if (user.password !== data.password)
		throw new ResponseError(401, 'Password yang dimasukkan salah')

	// Generate Token
	const token = uuid().toString()

	return await prismaClient.user_ShareNote.update({
		where: {
			id: user.id,
		},
		data: {
			token,
		},
		select: {
			token: true,
		},
	})
}

module.exports = {
	register,
	login,
}
