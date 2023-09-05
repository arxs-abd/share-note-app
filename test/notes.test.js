const request = require('supertest')

const { web: app } = require('../src/app/web')
const { prismaClient } = require('../src/app/database')
const { auth, note } = require('./payload')

let token

afterAll(async () => {
	await prismaClient.note_ShareNote.deleteMany()
	await prismaClient.user_ShareNote.deleteMany()
})

// Testing Auth
describe('POST /api/note [Registration Testing]', () => {
	const url = '/api/note'
	it('Required Requirements For Testing', async () => {
		await request(app).post('/api/register').send(auth.validUserPayload)
		const res = await request(app)
			.post('/api/login')
			.send(auth.validUserPayload)
		token = res.body.data.token
	})
	it('Should Fail to Add Note Because Not Login', async () => {
		const res = await request(app).post(url).send(note.invalidNotePayload)
		expect(res.statusCode).toBe(401)
		expect(res.body.status).toBe('fail')
	})
	it('Should Fail to Add Note Because Token is Invalid', async () => {
		const res = await request(app)
			.post(url)
			.send(note.invalidNotePayload)
			.set('Authorization', auth.invalidToken)
		expect(res.statusCode).toBe(401)
		expect(res.body.status).toBe('fail')
	})
	it('Should Fail to Add Note Because Data is Not Complete', async () => {
		const res = await request(app)
			.post(url)
			.send(note.invalidNotePayload)
			.set('Authorization', auth.invalidToken)
		expect(res.statusCode).toBe(401)
		expect(res.body.status).toBe('fail')
	})
	it('Should Success to Add Note', async () => {
		const res = await request(app)
			.post(url)
			.send(note.validNotePayload)
			.set('Authorization', token)

		expect(res.statusCode).toBe(201)
		expect(res.body.status).toBe('success')
	})
})
