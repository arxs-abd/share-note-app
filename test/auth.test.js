const request = require('supertest')

const { web: app } = require('../src/app/web')
const { prismaClient } = require('../src/app/database')

const { auth } = require('./payload')

afterAll(async () => {
    await prismaClient.user_ShareNote.deleteMany()
})

// Testing Auth
describe('POST /api/register [Authentication Testing]', () => {
    it('Should Fail to Add New User Because Data Is Not Complete', async () => {
        const res = await request(app).post('/api/register').send(auth.invalidUserPayload)
        expect(res.statusCode).toBe(400)
        expect(res.body.status).toBe('fail')
    })
	it('Should Add New User', async () => {
        const res = await request(app).post('/api/register').send(auth.validUserPayload)
		expect(res.statusCode).toBe(201)
        expect(res.body.status).toBe('success')
	})
	it('Should Fail to Add New User Because Have Same Username', async () => {
        const res = await request(app).post('/api/register').send(auth.validUserPayload)
        expect(res.body.status).toBe('fail')
		expect(res.statusCode).toBe(409)
	})
})