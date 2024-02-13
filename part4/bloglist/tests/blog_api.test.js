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

test('unique identifier is named id', async () => {
  const blogs = await Blog.find({})
  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined()
    console.log(blog.id)
  })
})

test('successfully created new blog', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb).toHaveLength(helper.blogs.length + 1)

  const titles = blogsInDb.map(blog => blog.title)
  expect(titles).toContain(
    'Go To Statement Considered Harmful'
  )
})

afterAll(async () => {
  await mongoose.connection.close()
})