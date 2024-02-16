const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./controller/blogs')
const usersRouter = require('./controller/users')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGO_URL)
  .then(() => {
    logger.info('connected to mongodb')
  })
  .catch((error) => {
    logger.error('error connecting to mongodb', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', notesRouter)
app.use('/api/users', usersRouter)

module.exports = app