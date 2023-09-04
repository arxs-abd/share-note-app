const validate = (schema, req) => {
	const result = schema.validate(req)

	if (result.error) throw result.error

	return result.value
}

module.exports = {
	validate,
}
