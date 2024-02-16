const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.js')
const app = require('../app.js')
const api = supertest(app)

const User = require('../models/user.js')

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.users
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('HTTP POST', () => {
  test('user is successfully created', async () => {
    const newUser = {
      username: 'anonymousGuy',
      name: 'No-Name Norman',
      password: 'iDontHaveAName'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await helper.usersInDb()
    expect(users.length).toEqual(helper.users.length + 1)

    const usernames = users.map(user => user.username)
    expect(usernames).toContain('anonymousGuy')
  })

  test('user is not created if name is too short', async () => {
    const newUser = {
      username: 'no',
      name: 'Username Test',
      password: 'LongEnough'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'invalid username or password length' })

    const users = await helper.usersInDb()
    expect(users.length).toEqual(helper.users.length)
  })

  test('user is not created if password is too short', async () => {
    const newUser = {
      username: 'LongEnough',
      name: 'Username Test',
      password: 'no'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'invalid username or password length' })

    const users = await helper.usersInDb()
    expect(users.length).toEqual(helper.users.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})