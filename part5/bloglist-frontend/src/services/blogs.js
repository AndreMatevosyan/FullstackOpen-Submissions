import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = newBlog => {
  const request = axios.post(baseUrl, newBlog, {
    headers: {
      'Authorization': token
    }
  })
  return request.then(response => response.data)
}

export default { getAll, setToken, createBlog }