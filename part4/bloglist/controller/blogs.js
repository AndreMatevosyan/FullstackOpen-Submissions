const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

// HTTP GET
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.status(200).json(blogs)

  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
})

// HTTP POST
blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = await request.user

  const blog = new Blog(
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    }
  )

  if (blog.title && blog.url) {

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
  } else {
    response.status(400).end()
  }
  // blog.save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
})

// HTTP DELETE
blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = await request.user

  const blogTobeDeleted = await Blog.findById(request.params.id)

  if (user.id.toString() !== blogTobeDeleted.user.toString()) {
    return response.status(401).json({ error: 'user unauthorized' })
  }

  await Blog.findByIdAndDelete(request.params.id)

  user.blogs.pull({ _id: request.params.id })
  await user.save()

  response.status(204).end()
})

//HTTP PUT
blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogRouter