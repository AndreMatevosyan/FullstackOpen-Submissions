import { useRef } from "react"
import MoreInfo from "./MoreInfo"

const Blog = ({ blog }) => {
  
  const infoRef = useRef()

  const changeView = () => {
    infoRef.current.toggleVisibility()
  }

  return (
  <div className="simpleBorder">
    {blog.title} {blog.author}
    <button onClick={changeView}>view</button>
    <MoreInfo ref={infoRef}>
      {blog.url}<br/>
      likes {blog.likes} <button>like</button><br/>
      {blog.user.name}<br/>
    </MoreInfo>
  </div>  
)}

export default Blog