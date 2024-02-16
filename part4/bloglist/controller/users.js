const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password.length < 3 || username.length < 3) {
    response.status(400).json({
      error: 'invalid username or password length'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const newUser = await user.save()

  response.status(201).json(newUser)
})

module.exports = usersRouter