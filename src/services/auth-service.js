const { prismaClient } = require("../app/database")
const { ResponseError } = require("../errors/response-error")
const { addUserValidation } = require("../validation/auth-validation")
const { validate } = require("../validation/validation")

const register = async (request) => {
    const data = validate(addUserValidation, request)

    // Find User with username
    const user = await prismaClient.user_ShareNote.count({
        where : {
            username : request.username
        }
    })

    // If username existed, return error response
    if (user) throw new ResponseError(409, 'Username telah digunakan')

    // Insert Data to Tabel
    return await prismaClient.user_ShareNote.create({
        data
    })
}

module.exports = {
    register
}