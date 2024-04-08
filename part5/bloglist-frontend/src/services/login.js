import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const login = async credentials => {
  const responseToken = await axios.post(baseUrl, credentials)
  return responseToken.data
}

export default { login }