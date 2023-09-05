module.exports = {
	auth: {
		validUserPayload: {
			username: 'admin',
			password: '12435678',
		},
		invalidUserPayload: {
			username: '',
			password: '12435678',
		},
		invalidUsernameUserPayload: {
			username: 'root',
			password: '12435678',
		},
		invalidPasswordUserPayload: {
			username: 'admin',
			password: '124',
		},
	},
}
