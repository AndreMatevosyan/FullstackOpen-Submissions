const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (...params) => {
  return 1
}

const totalLikes = (blogs) => {

  const reducer = (sum, currentValue) => {
    return sum + currentValue
  }

  return blogs.map((blog) => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = _.maxBy(blogs, 'likes')

  return ({
    title: maxLikes.title,
    author: maxLikes.author,
    likes: maxLikes.likes
  })
}

const mostWorks = (blogs) => {
  const nameCounts = _.countBy(blogs, 'author')
  const mostFrequentName = _.maxBy(_.keys(nameCounts), key => nameCounts[key])

  return ({
    author: mostFrequentName,
    blogs: nameCounts[mostFrequentName]
  })
}

const mostLikes = (blogs) => {
  const groupedAuthors = _.groupBy(blogs, 'author')
  const totalLikesPerAuthor = _.mapValues(groupedAuthors, likes => _.sumBy(likes, 'likes'))
  const maxLikedAuthor = _.maxBy(_.keys(totalLikesPerAuthor), key => totalLikesPerAuthor[key])

  return ({
    author: maxLikedAuthor,
    likes: totalLikesPerAuthor[maxLikedAuthor]
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostWorks,
  mostLikes
}