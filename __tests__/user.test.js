const request = require('supertest')
const baseURL = 'http://localhost:3000'

describe('POST /user/getGeneratedName', () => {
  it('should return 200', async () => {
    const response = await request(baseURL).post('/user/getGeneratedName')
    expect(response.statusCode).toBe(200)
  })
  it('should return a username of string type', async () => {
    const response = await request(baseURL).post('/user/getGeneratedName')
    username = response.body
    expect(username && typeof username == 'string').toBe(true)
  })
  it('should return a username with atleast 8 characters', async () => {
    for (let index = 0; index < 50; index++) {
      const response = await request(baseURL).post('/user/getGeneratedName')
      username = response.body.toString()
      expect(username.length >= 8).toBe(true)
    }
  })
  it.skip('should return a username with atmost 32 characters', async () => {
    for (let index = 0; index < 50; index++) {
      const response = await request(baseURL).post('/user/getGeneratedName')
      username = response.body.toString()
      expect(username.length <= 32).toBe(true)
    }
  })
  it('should return a username with alphanumeric characters', async () => {
    const response = await request(baseURL).post('/user/getGeneratedName')
    username = response.body
    expect(/^(\w|\d)*$/.test(username)).toBe(true)
  })
})
