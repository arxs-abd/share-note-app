const request = require('supertest')

const { web: app } = require('../src/app/web')
const { prismaClient } = require('../src/app/database')
const { auth } = require('./payload')

let token

afterAll(async () => {
	await prismaClient.user_ShareNote.deleteMany()
})

// Testing Auth
describe('POST /api/register [Registration Testing]', () => {
	const url = '/api/register'
	it('Should Fail to Add New User Because Data Is Not Complete', async () => {
		const res = await request(app).post(url).send(auth.invalidUserPayload)
		expect(res.statusCode).toBe(400)
		expect(res.body.status).toBe('fail')
	})
	it('Should Add New User', async () => {
		const res = await request(app).post(url).send(auth.validUserPayload)
		expect(res.statusCode).toBe(201)
		expect(res.body.status).toBe('success')
	})
	it('Should Fail to Add New User Because Have Same Username', async () => {
		const res = await request(app).post(url).send(auth.validUserPayload)
		expect(res.body.status).toBe('fail')
		expect(res.statusCode).toBe(409)
	})
})

describe('POST /api/login [Login Testing]', () => {
	const url = '/api/login'
	it('Should Fail to Login Because Data Is Not Complete', async () => {
		const res = await request(app).post(url).send(auth.invalidUserPayload)
		expect(res.statusCode).toBe(400)
		expect(res.body.status).toBe('fail')
	})
	it('Should Fail to Login Because Username Not Found', async () => {
		const res = await request(app)
			.post(url)
			.send(auth.invalidUsernameUserPayload)
		expect(res.body.status).toBe('fail')
		expect(res.statusCode).toBe(404)
	})
	it('Should Fail to Login Because Password is Wrong', async () => {
		const res = await request(app)
			.post(url)
			.send(auth.invalidPasswordUserPayload)
		expect(res.body.status).toBe('fail')
		expect(res.statusCode).toBe(401)
	})
	it('Should Success to Login', async () => {
		const res = await request(app).post(url).send(auth.validUserPayload)
		expect(res.statusCode).toBe(200)
		expect(res.body.status).toBe('success')
		expect(res.body.data.token).toBeDefined()
		token = res.body.data.token
	})
})

describe('POST /api/logout [Logout Testing]', () => {
	const url = '/api/logout'
	it('Should Fail to Logout Token Is Wrong', async () => {
		const res = await request(app)
			.post(url)
			.set('Authorization', auth.invalidToken)
		expect(res.statusCode).toBe(401)
		expect(res.body.status).toBe('fail')
	})
	it('Should Success to Logout', async () => {
		const res = await request(app).post(url).set('Authorization', token)
		expect(res.statusCode).toBe(200)
		expect(res.body.status).toBe('success')
		expect(res.body.message).toBeDefined()
	})
})
