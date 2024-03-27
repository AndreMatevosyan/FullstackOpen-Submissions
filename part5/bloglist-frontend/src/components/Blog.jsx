import { useRef, useState } from "react"
import MoreInfo from "./MoreInfo"
import blogService from "../services/blogs"

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [view, setView] = useState(false)
  
  const infoRef = useRef()

  const changeView = () => {
    infoRef.current.toggleVisibility()
    setView(!view)
  }

  const addLike = () => {
    console.log(blog.id)
    blogService
      .updateBlog(blog.id, {...blog, likes: likes + 1})
      .then(response => {
        console.log(response)
        setLikes(likes + 1)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="simpleBorder">
      {blog.title} {blog.author}
      <button onClick={changeView}>
        {view ? 'close' : 'view'}
      </button>
      <MoreInfo ref={infoRef}>
        <a href={blog.url}>{blog.url}</a><br/>
        likes {likes} <button onClick={addLike}>like</button><br/>
        {blog.user.name}<br/>
      </MoreInfo>
    </div>  
)}

export default Blog