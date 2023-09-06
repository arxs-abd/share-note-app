const request = require('supertest')

const { web: app } = require('../src/app/web')
const { prismaClient } = require('../src/app/database')
const { auth, note } = require('./payload')

// Variabel Testing
let validToken
let validSlug

afterAll(async () => {
	await prismaClient.note_ShareNote.deleteMany()
	await prismaClient.user_ShareNote.deleteMany()
})

// Testing Auth
describe('Required Requirements For Testing', () => {
	it('Register and Login', async () => {
		await request(app).post('/api/register').send(auth.validUserPayload)
		const res = await request(app)
			.post('/api/login')
			.send(auth.validUserPayload)
		validToken = res.body.data.token
	})
})
describe('POST /api/note [Add Note Testing]', () => {
	const url = '/api/note'
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
			.set('Authorization', validToken)

		validSlug = res.body.data.slug

		expect(res.statusCode).toBe(201)
		expect(res.body.status).toBe('success')
	})
})

describe('GET /api/note [Get Note Testing]', () => {
	const url = '/api/note/'
	it('Should Fail to Get Note Because Slug Not Found', async () => {
		const res = await request(app).get(url + note.invalidSlug)
		expect(res.statusCode).toBe(404)
		expect(res.body.status).toBe('fail')
	})
	it('Should Success to Get Note', async () => {
		const res = await request(app).get(url + validSlug)
		expect(res.statusCode).toBe(200)
		expect(res.body.status).toBe('success')
	})
})
