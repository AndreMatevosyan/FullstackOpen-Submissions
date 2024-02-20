const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  request.token = authorization && authorization.startsWith('Bearer ')
    ? request.token = authorization.replace('Bearer ', '')
    : request.token = null

  next()
}
module.exports = { tokenExtractor }