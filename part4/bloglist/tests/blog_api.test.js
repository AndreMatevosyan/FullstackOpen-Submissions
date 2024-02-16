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

describe('HTTP GET', () => {
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
})

describe('HTTP POST', () => {
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

  test('likes defaulted to zero if no data is available of them', async () => {
    const newBlog = new Blog({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    })

    console.log(newBlog)

    expect(newBlog.likes).toBe(0)
  })

  test('blogs without url are not entered into database', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('blogs without title are not entered into database', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('HTTP DELETE', () => {
  test('blog can be deleted given the id', async () => {
    const id = '5a422a851b54a676234d17f7'

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    const blogs = await helper.blogsInDb()
    const blogIds = blogs.map(blog => blog.id)

    console.log(blogs)

    expect(blogs).toHaveLength(helper.blogs.length - 1)
    expect(blogIds).not.toContain(id)
  })
})

describe('HTTP PUT', () => {
  test('information can be updated using id', async () => {
    const id = '5a422a851b54a676234d17f7'

    const updatedBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7 + 10, // 10 likes are being added to the original 7
    }

    await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .expect(200)

    const blogs = await helper.blogsInDb()
    expect(blogs[0].likes).toEqual(updatedBlog.likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})