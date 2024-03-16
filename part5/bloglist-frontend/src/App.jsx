import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const getBlogsAndUpdate = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
  }

  useEffect(() => {
    getBlogsAndUpdate()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogsLoggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if ( message ) {
      setTimeout(() => {
        setMessage('')
        console.log('message reset')
      }, 5000)
    }
  }, [message])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem(
        'blogsLoggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setMessage('wrong username or password')
      setError(true)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('blogsLoggedUser')
  }

  const handleBlogCreation = (newBlog) => {
    
    blogService
      .createBlog(newBlog)
      .then(response => {
        console.log(response)
        getBlogsAndUpdate()
        setMessage(`a new blog ${response.title} by ${response.author} added`)
        setError(false)
      })
      .catch(error => {
        console.error(error)
        setMessage('Token expired, please sign in again')
        setError(true)
        handleLogout()
      })
  }

  if (user === null) {
    return (
      <>
        <h2>log into application</h2>
        <Notification
          message={message}
          error={error}
        />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={message}
        error={error}
      />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Toggleable buttonLabel="new note">
        <BlogForm
          handleBlogCreation={handleBlogCreation}
        />
      </Toggleable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App