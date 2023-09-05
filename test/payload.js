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
		invalidToken: '6d1caa70-595b-46bc-9818-ef152857cc88',
	},
	note: {
		validNotePayload: {
			title: 'Catatan ku',
			content: 'Siapkah bahan bahan terlebih dahulu sebelum memulai',
		},
		invalidNotePayload: {
			title: '',
			content: 'Siapkah bahan bahan terlebih dahulu sebelum memulai',
		},
	},
}
