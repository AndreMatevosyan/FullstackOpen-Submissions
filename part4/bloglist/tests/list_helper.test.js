const testHelper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = testHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total Likes:', () => {

  test('of empty list is zero', () => {
    expect(testHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = testHelper.totalLikes(testHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, equals the likes of all combined', () => {
    const result = testHelper.totalLikes(testHelper.blogs)
    expect(result).toBe(36)
  })
})

test('most liked is returned as the favorite', () => {
  const result = testHelper.favoriteBlog(testHelper.blogs)

  console.log(result)

  expect(result).toEqual({
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  })
})

test('author with the most work is returned', () => {
  const result = testHelper.mostWorks(testHelper.blogs)

  console.log(result)

  expect(result).toEqual({
    author: 'Robert C. Martin',
    blogs: 3
  })
})

test('most liked author is returned', () => {
  const result = testHelper.mostLikes(testHelper.blogs)

  console.log(result)

  expect(result).toEqual({
    author: 'Edsger W. Dijkstra',
    likes: 17
  })
})