const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (blog.title && blog.url) {
    const result = await blog.save()
    response.status(201).json(result)
  } else {
    response.status(400).end()
  }
  // blog.save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
})

module.exports = blogRouter