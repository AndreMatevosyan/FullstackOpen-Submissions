const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.js')
const app = require('../app.js')
const api = supertest(app)

const Blog = require('../models/blog.js')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.blogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('returns correct number of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.blogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})